import React from 'react';
import html2pdf from 'html2pdf.js';
import { FaDownload } from 'react-icons/fa';
import Header from './components/Header';
import Experience from './components/Experience';
import Education from './components/Education';
import Skills from './components/Skills';
import Hobbies from './components/Hobbies';
import Languages from './components/Languages';
import Footer from './components/Footer';
import './styles/App.css';

function App() {
  const handleDownloadPDF = () => {
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
        <Education />
        <Skills />
        <Hobbies />
        <Languages />
        <Footer />
      </div>
      <button onClick={handleDownloadPDF} className="download-btn">
        <FaDownload style={{ marginRight: '8px' }} /> Download PDF Resume
      </button>
    </div>
  );
}

export default App;