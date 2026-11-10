import { useEffect, useRef, useState } from "react";

const PROJECTS = [
  {
    name: "Task Management Website",
    description:
      "A full-stack task management app for organizing projects, assigning tasks, and tracking progress with role-based access.",
    technologies: ["HTML", "CSS", "JavaScript", "Node.js", "MongoDB"],
    repository: "https://github.com/Akashsingh28/Task-Manager",
  },
  {
    name: "ArenaPro Esports Tournament Website",
    description:
      "An esports platform where users can discover tournaments, register, and keep up with match details.",
    technologies: ["HTML", "CSS", "JavaScript"],
    repository: "https://github.com/Akashsingh28/ArenaPro",
  },
  {
    name: "Doctor Search Website",
    description:
      "A simple doctor-finder experience to search by location and medical specialization.",
    technologies: ["HTML", "CSS", "JavaScript"],
    repository: "https://github.com/Akashsingh28/Doctor-Search-Websites",
  },
];

const EXPERIENCES = [
  {
    role: "Full Stack Developer Intern",
    organization: "Hackveda",
    period: "OCT — DEC 2025",
    description:
      "Worked on web development, CSV data handling, and application tasks using HTML, CSS, JavaScript, and MongoDB. Delivered technical presentations and collaborated on real-world projects.",
  },
  {
    role: "College-Level Winner",
    organization: "Smart India Hackathon 2024",
    period: "AUG 2024",
    description:
      "Won the MIT ACS College internal challenge organized by its Institution's Innovation Council as a member of Team SIH-MIT-020.",
  },
];

function ProjectCard({ project }) {
  return (
    <article className="work-project-card">
      <div className="work-project-card-content">
        <p className="work-project-eyebrow">Featured project</p>
        <h3>{project.name}</h3>
        <p className="work-project-description">{project.description}</p>
        <div className="work-project-stack">
          <p>TECH STACK</p>
          <ul className="work-project-tech" aria-label="Technologies used">
            {project.technologies.map((technology) => (
              <li key={technology}>{technology}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="work-project-actions">
        <a
          className="work-button work-button--primary"
          href={`${project.repository}#readme`}
          target="_blank"
          rel="noreferrer"
        >
          Preview <span aria-hidden="true">↗</span>
        </a>
        <a
          className="work-button work-button--secondary"
          href={project.repository}
          target="_blank"
          rel="noreferrer"
        >
          Code <span aria-hidden="true">&lt;/&gt;</span>
        </a>
      </div>
    </article>
  );
}

function ProjectsExperience() {
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
      className={`work-section${isVisible ? " work-section--visible" : ""}`}
      id="projects"
      aria-labelledby="work-title"
      ref={sectionRef}
    >
      <div className="work-content">
        <header className="work-heading">
          <p>SELECTED WORK</p>
          <h2 id="work-title">Projects &amp; Experience</h2>
        </header>

        <div className="work-projects">
          {PROJECTS.map((project) => (
            <ProjectCard key={project.name} project={project} />
          ))}
        </div>

        <section className="work-experience" aria-labelledby="experience-title">
          <div className="work-subheading">
            <p>MY JOURNEY</p>
            <h3 id="experience-title">Experience</h3>
          </div>
          <div className="work-experience-list">
            {EXPERIENCES.map((experience) => (
              <article
                className="work-experience-card"
                key={`${experience.organization}-${experience.role}`}
              >
                <span className="work-experience-marker" aria-hidden="true" />
                <div className="work-experience-heading">
                  <div>
                    <h4>{experience.role}</h4>
                    <p>{experience.organization}</p>
                  </div>
                  <span>{experience.period}</span>
                </div>
                <p className="work-experience-description">
                  {experience.description}
                </p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}

export default ProjectsExperience;
