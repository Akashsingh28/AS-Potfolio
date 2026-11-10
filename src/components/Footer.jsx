function Footer() {
  return (
    <footer className="site-footer" aria-label="Footer">
      <div className="footer-content">
        <div className="footer-brand">
          <a className="footer-brand-name" href="#home">
            Akash Singh
          </a>
          <p>
            I design and build responsive websites and web applications with a
            focus on thoughtful user experiences.
          </p>
        </div>

        <nav className="footer-column" aria-label="Services">
          <h2>Services</h2>
          <a href="#projects">Web Development</a>
          <a href="#skills">Frontend Development</a>
          <a href="#skills">Responsive Design</a>
          <a href="#contact">Project Collaboration</a>
        </nav>

        <nav className="footer-column" aria-label="Explore">
          <h2>Explore</h2>
          <a href="#about-me">About Me</a>
          <a href="#projects">Projects</a>
          <a href="#education-experience">Education</a>
          <a href="#faq">FAQs</a>
        </nav>

        <div className="footer-column">
          <h2>Contact</h2>
          <a href="#contact">Let&apos;s talk about your project</a>
          <a href="#contact">Send me a message</a>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Akash Singh. All rights reserved.</p>
        <a href="#home">Back to top ↑</a>
      </div>
    </footer>
  );
}

export default Footer;
