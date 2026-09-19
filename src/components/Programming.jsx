import React from 'react';
import resume from '../resume.json';

const Programming = () => {
  return (
    <section className="programming">
      <h2>Programming Languages</h2>
      <ul>
        {resume.programmingLanguages.map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
    </section>
  );
};

export default Programming;
