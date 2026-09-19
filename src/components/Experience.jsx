import React from 'react';
import resume from '../resume.json';

const Experience = () => {
  const { selfLearning } = resume;

  return (
    <section className="experience">
      <h2>Experience</h2>

      {resume.work.map((job) => (
        <div className="job" key={`${job.name}-${job.position}`}>
          <h3>
            {job.name} — {job.position}
          </h3>
          <p className="date">
            {job.startDate} – {job.endDate}
          </p>
          <ul>
            {job.highlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
        </div>
      ))}

      <div className="job">
        <h3>{selfLearning.label}</h3>
        <p className="date">
          {selfLearning.startDate} – {selfLearning.endDate}
        </p>
        <ul>
          {selfLearning.topics.map((topic) => (
            <li key={topic}>{topic}</li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Experience;
