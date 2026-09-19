import React from 'react';
import resume from '../resume.json';

const Skills = () => {
  return (
    <section className="skills">
      <h2>Skills</h2>
      <ul>
        {resume.skills.map((skill) => (
          <li key={skill}>{skill}</li>
        ))}
      </ul>
    </section>
  );
};

export default Skills;
