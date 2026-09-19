import React, { useEffect, useState } from 'react';
import { FaSun, FaMoon, FaDesktop } from 'react-icons/fa';

const STORAGE_KEY = 'theme';

const OPTIONS = [
  { value: 'light', label: 'Light', Icon: FaSun },
  { value: 'dark', label: 'Dark', Icon: FaMoon },
  { value: 'system', label: 'System', Icon: FaDesktop },
];

const isTheme = (value) => OPTIONS.some((option) => option.value === value);

const ThemeToggle = () => {
  // The first render is always 'system': this component is prerendered by
  // scripts/prerender.js, where localStorage does not exist, and the client's
  // first render has to produce the same markup to hydrate. The stored choice
  // is read in the effect below. The inline script in index.html has already
  // applied it to <html> by then, so nothing flashes in between.
  const [theme, setTheme] = useState('system');

  useEffect(() => {
    let stored = null;
    try {
      stored = localStorage.getItem(STORAGE_KEY);
    } catch {
      // Private window or blocked site data: keep following the OS.
    }
    if (isTheme(stored)) {
      setTheme(stored);
    }
  }, []);

  const choose = (next) => {
    setTheme(next);
    if (next === 'system') {
      delete document.documentElement.dataset.theme;
    } else {
      document.documentElement.dataset.theme = next;
    }
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Not persisting is fine; the choice still holds for this visit.
    }
  };

  return (
    <div className="theme-toggle" role="group" aria-label="Color theme">
      {OPTIONS.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => choose(option.value)}
          className={option.value === theme ? 'is-active' : undefined}
          aria-pressed={option.value === theme}
          title={`${option.label} theme`}
        >
          <option.Icon aria-hidden="true" />
          <span className="sr-only">{option.label} theme</span>
        </button>
      ))}
    </div>
  );
};

export default ThemeToggle;
