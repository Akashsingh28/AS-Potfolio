import { useState } from "react";
import brandLogo from "../assests/AS-removebg-preview.png";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="site-header">
      <a className="wordmark" href="#home" aria-label="Home">
        <img src={brandLogo} alt="" />
      </a>
      <button
        className="nav-menu-toggle"
        type="button"
        aria-label={
          isMenuOpen ? "Close navigation menu" : "Open navigation menu"
        }
        aria-expanded={isMenuOpen}
        aria-controls="primary-navigation"
        onClick={() => setIsMenuOpen((open) => !open)}
      >
        <span className="nav-menu-dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
      </button>
      <div className={`nav-menu${isMenuOpen ? " nav-menu--open" : ""}`}>
        <nav
          className="main-nav"
          id="primary-navigation"
          aria-label="Main navigation"
        >
          <a href="#home" onClick={closeMenu}>
            Home
          </a>
          <a href="#about-me" onClick={closeMenu}>
            About Me
          </a>
          <a href="#education-experience" onClick={closeMenu}>
            Education
          </a>
          <a href="#skills" onClick={closeMenu}>
            Skills
          </a>
          <a href="#projects" onClick={closeMenu}>
            Projects &amp; Experience
          </a>
        </nav>
        <div className="header-actions">
          <a className="outline-button" href="#contact" onClick={closeMenu}>
            Let&apos;s Talk
          </a>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
