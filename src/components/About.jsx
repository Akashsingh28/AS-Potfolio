import { useEffect, useRef, useState } from "react";
import resume from "../PDF/Resume_Akash.pdf";

import brandLogo from "../assests/AS-removebg-preview.png";

const SKILLS = [
  "HTML",
  "CSS",
  "JavaScript",
  "React",
  "Tailwind CSS",
  "Bootstrap",
  "Node.js",
  "MongoDB",
  "SQL",
  "GitHub",
];

function AboutSocialIcon({ type }) {
  if (type === "email") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m4 7 8 6 8-6" />
      </svg>
    );
  }

  if (type === "linkedin") {
    return <span aria-hidden="true">in</span>;
  }

  if (type === "whatsapp") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20.2 11.8a8.2 8.2 0 0 1-12.1 7.1L3.5 20l1.2-4.4a8.2 8.2 0 1 1 15.5-3.8Z" />
        <path d="M8.2 7.7c.2-.5.5-.5.8-.5h.5c.2 0 .4.1.5.4l.8 1.8c.1.2.1.4-.1.6l-.6.7c-.2.2-.2.4 0 .6.4.7 1.1 1.4 1.8 1.8.2.1.4.1.6-.1l.7-.8c.2-.2.4-.2.6-.1l1.7.8c.3.1.4.3.4.5 0 .3-.2 1.1-.7 1.5-.5.5-1.2.7-2 .5-1-.2-2.2-.8-3.5-1.9-1.6-1.4-2.6-3.1-2.9-4.1-.3-.9 0-1.5.4-1.9Z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 .9a11.1 11.1 0 0 0-3.5 21.6c.6.1.8-.2.8-.5v-2c-3.2.7-3.9-1.4-3.9-1.4-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.1.1 1.7 1.1 1.7 1.1 1 .1.7 2.1 3.9 1.5.1-.7.4-1.2.7-1.5-2.6-.3-5.3-1.3-5.3-5.8 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.2 1.2a11 11 0 0 1 5.8 0c2.2-1.5 3.2-1.2 3.2-1.2.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.5-2.7 5.5-5.3 5.8.4.3.8 1 .8 2v3c0 .3.2.6.8.5A11.1 11.1 0 0 0 12 .9Z" />
    </svg>
  );
}

function About() {
  const sectionRef = useRef(null);
  const [hasEntered, setHasEntered] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    if (!("IntersectionObserver" in window)) {
      setHasEntered(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setHasEntered(entry.isIntersecting);
      },
      { threshold: 0.18 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      className={`about-section${hasEntered ? " about-section--visible" : ""}`}
      id="about-me"
      aria-labelledby="about-title"
      ref={sectionRef}
    >
      <div className="about-layout">
        <article className="about-profile-card">
          <div className="about-portrait" aria-hidden="true">
            <span className="about-monogram">A</span>
          </div>
          <div className="about-profile-details">
            <span className="about-card-label">FULL STACK DEVELOPER</span>
            <h2>Akash</h2>
            <span className="about-card-rule" aria-hidden="true" />
            <div
              className="about-social-links"
              aria-label="Contact and social links"
            >
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=aswebdeveloper28%40gmail.com"
                aria-label="Email Akash"
                title="Email Akash"
                target="_blank"
                rel="noreferrer"
              >
                <AboutSocialIcon type="email" />
              </a>
              <a
                href="https://www.linkedin.com/in/akash-singh-a32712367?utm_source=share_via&utm_content=profile&utm_medium=member_android"
                aria-label="LinkedIn"
                title="LinkedIn"
                target="_blank"
                rel="noreferrer"
              >
                <AboutSocialIcon type="linkedin" />
              </a>
              <a
                href="https://github.com/Akashsingh28"
                aria-label="GitHub"
                title="GitHub"
                target="_blank"
                rel="noreferrer"
              >
                <AboutSocialIcon type="github" />
              </a>
              <a
                href="https://wa.me/917620138266?text=Hello%20Akash%2C%20I%20found%20your%20portfolio."
                aria-label="WhatsApp"
                title="WhatsApp"
                target="_blank"
                rel="noreferrer"
              >
                <AboutSocialIcon type="whatsapp" />
              </a>
            </div>
          </div>
          <img className="about-card-logo" src={brandLogo} alt="" />
        </article>

        <div className="about-copy">
          <p className="about-eyebrow">GET TO KNOW ME</p>
          <h2 id="about-title">
            Hello, I&apos;m <span>Akash.</span>
          </h2>
          <p className="about-role">Full Stack Developer</p>
          <p className="about-description">
            I&apos;m a dedicated Full Stack Developer passionate about creating
            modern, responsive, high-performance web applications. I work
            across frontend and backend technologies, including MongoDB, and
            enjoy turning ideas into useful digital experiences. I&apos;m
            always learning and finding ways to grow my technical skills.
          </p>

          <div className="about-skills" id="about-technologies">
            <h3>Technologies I work with</h3>
            <ul aria-label="Technology skills">
              {SKILLS.map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          </div>

          <div className="about-actions">
            <a
              className="about-button about-button--primary"
              href={resume}
              target="_blank"
              rel="noreferrer"
            >
              Resume
            </a>
            <a className="about-button about-button--secondary" href="#skills">
              Explore Skills <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
