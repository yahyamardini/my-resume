import React from 'react';
import { FaDownload } from 'react-icons/fa';
import Header from './components/Header';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Programming from './components/Programming';
import Languages from './components/Languages';
import './styles/App.css';

function App() {
  // Imported on demand: html2pdf.js touches window/document at module scope,
  // which breaks the prerender step in scripts/prerender.js.
  const handleDownloadPDF = async () => {
    const { default: html2pdf } = await import('html2pdf.js');
    const element = document.querySelector('.resume-container');
    const opt = {
      margin: 10,
      filename: 'Yahya_Mardini_Resume.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    };

    html2pdf().set(opt).from(element).save();
  };

  return (
    <div className="app-container">
      <div className="resume-container">
        <Header />
        <Experience />
        <Skills />
        <Programming />
        <Languages />
      </div>
      <button onClick={handleDownloadPDF} className="download-btn">
        <FaDownload style={{ marginRight: '8px' }} /> Download PDF Resume
      </button>
    </div>
  );
}

export default App;
