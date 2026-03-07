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
      <div className="container nav-container">
        <Link to="home" smooth={true} duration={500} className="logo-area" onClick={() => setMenuOpen(false)}>
          <div className="nav-profile-pic">
            <img src="https://image2url.com/r2/default/images/1772869607337-ec4c22ca-1173-40a8-b9bf-cce0e395f654.jpg" alt="Profile" />
          </div>BELAL <span>ANSARI</span>
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
