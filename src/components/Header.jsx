import React from 'react';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaGithub, FaLinkedin } from 'react-icons/fa';

const Header = () => {
  return (
    <header className="header">
      <h1>Yahya Mardini</h1>
      <h2>DevOps Engineer</h2>
      <p>
        DevOps Engineer with 2+ years of professional experience and 4+ years of continuous self-learning in computers.
      </p>
      <div className="contact-info">
        <p>
          <a
            href="https://www.google.com/maps/place/Damascus,+Syria"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <FaMapMarkerAlt style={{ marginRight: '8px' }} /> Damascus, Syria
          </a>{' '}
          |{' '}
          <a
            href="tel:+963968736154"
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <FaPhone style={{ marginRight: '8px' }} /> +963 968 736 154
          </a>{' '}
          |{' '}
          <a
            href="mailto:yahya199mar@gmail.com"
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <FaEnvelope style={{ marginRight: '8px' }} /> yahya199mar@gmail.com
          </a>{' '}
          |{' '}
          <a
            href="https://github.com/yahyamardini"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <FaGithub style={{ marginRight: '8px' }} /> GitHub
          </a>{' '}
          |{' '}
          <a
            href="https://linkedin.com/in/yahyamardini"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <FaLinkedin style={{ marginRight: '8px' }} /> LinkedIn
          </a>
        </p>
      </div>
    </header>
  );
};

export default Header;