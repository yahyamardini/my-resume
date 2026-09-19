import React from 'react';

const Experience = () => {
  return (
    <section className="experience">
      <h2>Experience</h2>

      {/* Professional Experience */}
      <div className="job">
        <h3>Cellusys — DevOps Engineer</h3>
        <p className="date">March 2024 – Present</p>
        <ul>
          <li>
            Migrated legacy telecom systems to cloud-native solutions in multi-region
            Kubernetes clusters.
          </li>

          <li>
            Designed and implemented a staging environment to test rollouts, making production
            deployments safer.
          </li>

          <li>Built a benchmarking environment to continuously test system performance.</li>

          <li>
            Architected CI/CD pipelines (GitLab CI/CD, Argo CD) that shortened the time from
            commit to production.
          </li>

          <li>
            Introduced a development environment to unify dev workflows and reduce the time it
            takes to onboard new engineers.
          </li>

          <li>
            Integrated modern observability solutions (ELK stack, Prometheus, Grafana,
            kube-state-metrics) to improve visibility into the system.
          </li>

          <li>
            Evaluated production Kubernetes cluster robustness by simulating failure scenarios
            to verify compliance with customer SLAs.
          </li>

          <li>
            Adopted agentgateway to centralize interaction between AI agents and MCP servers.
          </li>
        </ul>
      </div>

      {/* Self-Learning Period */}
      <div className="job">
        <h3>Self-Learning</h3>
        <p className="date">August 2022 – Present</p>
        <ul>
          <li>Linux internals</li>

          <li>Computer architecture</li>

          <li>Global network infrastructure</li>
        </ul>
      </div>
    </section>
  );
};

export default Experience;
