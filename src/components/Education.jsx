import { useEffect, useRef, useState } from "react";
import brandLogo from "../assests/AS-removebg-preview.png";

const EDUCATION = [
  {
    period: "AUG 2023 — JUL 2026",
    qualification: "BSc Information Technology",
    institution: "MIT Arts, Commerce and Science College",
    details: "CGPA: 8.26",
  },
  {
    period: "2021 — 2023",
    qualification: "HSC Science",
    institution: "Gayatri English Medium School and Jr. College",
    details: "74.50% · Maharashtra Board",
  },
  {
    period: "2021",
    qualification: "Secondary (10th)",
    institution: "Shree Sawami Samarth English Medium School",
    details: "A grade · Maharashtra Board",
  },
];

const SKILL_GROUPS = [
  { name: "UI/UX", level: 70 },
  { name: "Frontend", level: 80 },
  { name: "Backend", level: 65 },
  { name: "Database", level: 79 },
];

function ContactIcon({ type }) {
  if (type === "email") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m4 7 8 6 8-6" />
      </svg>
    );
  }

  if (type === "phone") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M7 3h3l2 5-2.2 1.8a15 15 0 0 0 4.4 4.4L16 12l5 2v3c0 1.1-.9 2-2 2C10.7 19 5 13.3 5 5c0-1.1.9-2 2-2Z" />
      </svg>
    );
  }

  if (type === "website") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

function EducationSection() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    if (!("IntersectionObserver" in window)) {
      setIsVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.12 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      className={`journey-section${
        isVisible ? " journey-section--visible" : ""
      }`}
      id="education-experience"
      aria-labelledby="education-page-title"
      ref={sectionRef}
    >
      <div className="journey-layout">
        <header className="education-page-heading">
          <h1 id="education-page-title">Education</h1>
          <p>Learning today, shaping tomorrow</p>
        </header>

        <aside
          className="journey-sidebar"
          aria-label="Profile, skills, and contact"
        >
          <div className="journey-sidebar-profile">
            <img
              className="journey-portrait"
              src={brandLogo}
              alt="Akash Singh logo"
            />
          </div>

          <div className="journey-sidebar-block">
            <h3>Skills</h3>
            <ul className="journey-skill-list">
              {SKILL_GROUPS.map((skill) => (
                <li key={skill.name}>
                  <span>{skill.name}</span>
                  <span className="journey-skill-meter" aria-hidden="true">
                    <span style={{ width: `${skill.level}%` }} />
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="journey-sidebar-block journey-contact">
            <h3>Contact</h3>
            <a href="mailto:aswebdeveloper28@gmail.com">
              <ContactIcon type="email" />
              aswebdeveloper28@gmail.com
            </a>
            <a href="tel:+917620138266">
              <ContactIcon type="phone" />
              +91 76201 38266
            </a>
            <span>
              <ContactIcon type="location" />
              Pune, India
            </span>
            <a href="/">
              <ContactIcon type="website" />
              Portfolio website
            </a>
          </div>
        </aside>

        <div className="journey-main">
          <section className="education-panel" aria-labelledby="education-title">
            <h2 id="education-title">Education</h2>
            <div className="education-timeline">
              {EDUCATION.map((item) => (
                <article
                  className="education-timeline-entry"
                  key={item.qualification}
                >
                  <span
                    className="education-timeline-marker"
                    aria-hidden="true"
                  />
                  <h3>{item.qualification}</h3>
                  <p className="education-timeline-meta">
                    {item.institution} · {item.period}
                  </p>
                  <p className="education-timeline-details">{item.details}</p>
                </article>
              ))}
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}

export default EducationSection;
