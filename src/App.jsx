import React from 'react';
import { FaFilePdf } from 'react-icons/fa';
import Header from './components/Header';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Programming from './components/Programming';
import Languages from './components/Languages';
import ThemeToggle from './components/ThemeToggle';
import './styles/App.css';

// Built by scripts/pdf.sh during deployment and served next to the page, so the
// link is a plain file the browser opens in its PDF viewer — no print dialog,
// and none of the date, URL and page-number furniture a browser stamps on.
const PDF_URL = `${import.meta.env.BASE_URL}resume.pdf`;

function App() {
  return (
    <div className="app-container">
      <div className="resume-container">
        <Header />
        <Experience />
        <Skills />
        <Programming />
        <Languages />
      </div>
      <div className="toolbar">
        <ThemeToggle />
        <a className="pdf-link" href={PDF_URL} target="_blank" rel="noopener noreferrer">
          <FaFilePdf style={{ marginRight: '8px' }} /> View PDF
        </a>
      </div>
    </div>
  );
}

export default App;
