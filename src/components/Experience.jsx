import React from 'react';

const Experience = () => {
  return (
    <section className="experience">
      <h2>Experience</h2>

      {/* Professional Experience */}
      <div className="job">
        <h3>Cellusys — DevOps Engineer</h3>
        <p className="date">March 2024 - PRESENT</p>
        <ul>
          <li>Migrated infrastructure from an ad-hoc to a Docker Swarm deployment.</li>

          <li>Co-operated production infrastructure.</li>

          <li>Designed a staging environment making deployment rollouts much safer.</li>

          <li>Designed a benchmarking environment to continuously test system resilience.</li>

          <li>Maintained CI/CD pipelines.</li>

          <li>Maintained the development environment.</li>

          <li>Standardized configuration management for the core product.</li>

          <li>Documented system architecture.</li>

          <li>Integrated secret management via HashiCorp Vault.</li>
        </ul>
      </div>

      {/* Self-Learning Period */}
      <div className="job">
        <h3>Self-Learning</h3>
        <p className="date">August 2022 - PRESENT</p>
        <ul>
          <li>Linux internals.</li>

          <li>Network programming.</li>

          <li>Scalable infrastructure architecture &amp; design.</li>
          <div class="html2pdf__page-break"></div>
        </ul>
      </div>
    </section>
  );
};

export default Experience;