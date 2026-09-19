import React from 'react';
import resume from '../resume.json';

const Languages = () => {
  return (
    <section className="languages">
      <h2>Languages</h2>
      <ul>
        {resume.languages.map(({ language, fluency }) => (
          <li key={language}>
            {language} ({fluency})
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Languages;
