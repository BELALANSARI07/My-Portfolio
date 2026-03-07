import React, { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import { FaBars, FaTimes } from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <nav id="navbar" className={scrolled ? 'scrolled' : ''}>
      <div className="nav-container">
        <Link to="home" smooth={true} duration={500} className="logo" onClick={closeMenu}>
          <img src="/profile.jpg" alt="BELAL ANSARI" className="nav-profile-pic" />
          BELAL <span>ANSARI</span>
        </Link>
        <ul className={`nav-links ${menuOpen ? 'nav-active' : ''}`}>
          <li>
            <Link to="about" spy={true} smooth={true} offset={-70} duration={500} onClick={closeMenu}>About</Link>
          </li>
          <li>
            <Link to="skills" spy={true} smooth={true} offset={-70} duration={500} onClick={closeMenu}>Skills</Link>
          </li>
          <li>
            <Link to="projects" spy={true} smooth={true} offset={-70} duration={500} onClick={closeMenu}>Projects</Link>
          </li>
          <li>
            <Link to="experience" spy={true} smooth={true} offset={-70} duration={500} onClick={closeMenu}>Experience</Link>
          </li>
          <li>
            <Link to="contact" spy={true} smooth={true} offset={-70} duration={500} onClick={closeMenu}>Contact</Link>
          </li>
        </ul>
        <div className="hamburger" onClick={toggleMenu}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
