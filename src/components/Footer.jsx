import React, { useState, useEffect } from 'react';
import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';
import { supabase } from '../supabaseClient';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [links, setLinks] = useState({
    linkedin: 'https://linkedin.com/in/yourprofile',
    github: 'https://github.com/yourusername',
    email: 'your.email@example.com'
  });

  useEffect(() => {
    fetchLinks();
  }, []);

  const fetchLinks = async () => {
    try {
      const { data, error } = await supabase.from('social_links').select('*').single();
      if (!error && data) {
        setLinks({ 
          linkedin: data.linkedin || links.linkedin,
          github: data.github || links.github,
          email: data.email || links.email
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <footer>
      <div className="container">
        <div className="footer-content">
          <div className="social-links">
            <a href={links.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <FaLinkedin />
            </a>
            <a href={links.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <FaGithub />
            </a>
            <a href={`mailto:${links.email}`} aria-label="Email">
              <FaEnvelope />
            </a>
          </div>
          <p>&copy; {currentYear} YOUR NAME. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
