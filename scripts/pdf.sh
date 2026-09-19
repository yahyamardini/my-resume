#!/usr/bin/env bash
# Renders the built site to dist/resume.pdf with WeasyPrint.
#
# WeasyPrint renders print media, so the PDF comes out of the same @media print
# rules as Ctrl+P in a browser — but unlike a browser's print dialog it draws no
# header or footer, so nothing stamps the date, the page number or the URL onto
# the page. It also needs no browser and no JavaScript: the prerender step has
# already put the content into dist/index.html.
#
# dist/index.html references its assets absolutely (/my-resume/...), which no
# file:// base URL can resolve, so the site is staged under that prefix and
# served over HTTP for as long as the render takes.
#
# Installed only in CI (see .github/workflows/deploy.yml); `npm run build` does
# not depend on it.
set -euo pipefail

BASE_PATH="${BASE_PATH:-my-resume}"
PORT="${PORT:-8123}"
OUT="${OUT:-dist/resume.pdf}"

if ! command -v weasyprint >/dev/null 2>&1; then
  echo "pdf: weasyprint not found. Install it with:" >&2
  echo "       pipx install weasyprint && pipx inject weasyprint brotli" >&2
  exit 1
fi

if [ ! -f dist/index.html ]; then
  echo "pdf: dist/index.html is missing — run 'npm run build' first" >&2
  exit 1
fi

stage="$(mktemp -d)"
server_pid=""
cleanup() {
  [ -n "$server_pid" ] && kill "$server_pid" 2>/dev/null || true
  rm -rf "$stage"
}
trap cleanup EXIT

mkdir -p "$stage/$BASE_PATH"
cp -r dist/. "$stage/$BASE_PATH/"

python3 -m http.server "$PORT" --directory "$stage" --bind 127.0.0.1 >/dev/null 2>&1 &
server_pid=$!

ready=""
for _ in $(seq 1 50); do
  if curl -sf -o /dev/null "http://127.0.0.1:$PORT/$BASE_PATH/"; then
    ready=1
    break
  fi
  sleep 0.2
done
if [ -z "$ready" ]; then
  echo "pdf: the staging server never came up on port $PORT" >&2
  exit 1
fi

weasyprint "http://127.0.0.1:$PORT/$BASE_PATH/" "$OUT"

# Report what came out, and say so loudly if the web fonts did not make it in:
# a silent fallback to a system face is the one failure that still produces a
# plausible-looking PDF.
python3 - "$OUT" <<'PY'
import pathlib, re, sys

path = pathlib.Path(sys.argv[1])
raw = path.read_bytes()
pages = len(re.findall(rb'/Type\s*/Page[^s]', raw))
fonts = sorted({m.group(1).decode('latin1') for m in re.finditer(rb'/BaseFont\s*/([A-Za-z0-9+_\-]+)', raw)})

print(f"pdf: wrote {path} ({len(raw) // 1024} kB, {pages} page(s))")
print(f"pdf: embedded fonts: {', '.join(fonts) or 'none'}")

if not any('Inter' in f for f in fonts):
    print("pdf: WARNING Inter is not embedded; WeasyPrint fell back to a system font", file=sys.stderr)
PY
