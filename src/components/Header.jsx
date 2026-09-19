import React from 'react';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaGithub, FaLinkedin } from 'react-icons/fa';
import resume from '../resume.json';

// resume.json carries a network name, not a component, so the icons live here.
const NETWORK_ICONS = {
  GitHub: FaGithub,
  LinkedIn: FaLinkedin,
};

const LINK_STYLE = { textDecoration: 'none', color: 'inherit' };
const ICON_STYLE = { marginRight: '8px' };

const Header = () => {
  const { name, label, summary, email, phone, location, profiles } = resume.basics;
  const place = `${location.city}, ${location.region}`;

  return (
    <header className="header">
      <h1>{name}</h1>
      <h2>{label}</h2>
      <p>{summary}</p>
      <div className="contact-info">
        <p>
          <a
            href={`https://www.google.com/maps/place/${encodeURIComponent(place)}`}
            target="_blank"
            rel="noopener noreferrer"
            style={LINK_STYLE}
          >
            <FaMapMarkerAlt style={ICON_STYLE} /> {place}
          </a>{' '}
          |{' '}
          {/* tel: wants the digits without the spaces the JSON keeps for reading. */}
          <a href={`tel:${phone.replace(/\s/g, '')}`} style={LINK_STYLE}>
            <FaPhone style={ICON_STYLE} /> {phone}
          </a>{' '}
          |{' '}
          <a href={`mailto:${email}`} style={LINK_STYLE}>
            <FaEnvelope style={ICON_STYLE} /> {email}
          </a>
          {profiles.map((profile) => {
            const Icon = NETWORK_ICONS[profile.network];
            return (
              <React.Fragment key={profile.network}>
                {' '}
                |{' '}
                <a href={profile.url} target="_blank" rel="noopener noreferrer" style={LINK_STYLE}>
                  {Icon ? <Icon style={ICON_STYLE} /> : null} {profile.network}
                </a>
              </React.Fragment>
            );
          })}
        </p>
      </div>
    </header>
  );
};

export default Header;
