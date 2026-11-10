import { useEffect, useRef, useState } from "react";
import cssLogo from "../assests/css.png";
import htmlLogo from "../assests/html.png";
import javascriptLogo from "../assests/js.png";
import mongoDbLogo from "../assests/mongo-db.png";
import nodeLogo from "../assests/node.png";
import reactLogo from "../assests/react.png";
import tailwindLogo from "../assests/tailwind.png";

const SKILLS = [
  {
    name: "HTML",
    level: 95,
    image: htmlLogo,
    color: "#e76f00",
    use: "Builds semantic page structure",
  },
  {
    name: "CSS",
    level: 95,
    image: cssLogo,
    color: "#2878c7",
    use: "Styles responsive web interfaces",
  },
  {
    name: "JavaScript",
    level: 85,
    image: javascriptLogo,
    color: "#e8c522",
    use: "Adds interaction and dynamic behavior",
  },
  {
    name: "Node.js",
    level: 55,
    image: nodeLogo,
    color: "#65a84f",
    use: "Runs server-side JavaScript",
  },
  {
    name: "React.js",
    level: 60,
    image: reactLogo,
    color: "#61c5e8",
    use: "Builds reusable interface components",
  },
  {
    name: "MongoDB",
    level: 85,
    image: mongoDbLogo,
    color: "#58a846",
    use: "Stores flexible application data",
  },
  {
    name: "Tailwind CSS",
    level: 50,
    image: tailwindLogo,
    color: "#39a9c7",
    use: "Speeds up utility-first styling",
  },
];

function SkillCard({ skill }) {
  return (
    <article className="skill-card">
      <div
        className="skill-progress"
        style={{
          "--skill-target": `${skill.level}%`,
          "--skill-color": skill.color,
        }}
        role="img"
        aria-label={`${skill.name}: ${skill.level}%`}
      >
        <div className="skill-progress-inner">
          <img src={skill.image} alt="" />
        </div>
      </div>
      <h3>{skill.name}</h3>
      <p>{skill.use}</p>
    </article>
  );
}

function Skills() {
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
      { threshold: 0.15 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      className={`skills-section${isVisible ? " skills-section--visible" : ""}`}
      id="skills"
      aria-labelledby="skills-title"
      ref={sectionRef}
    >
      <div className="skills-content">
        <header className="skills-heading">
          <p>MY TOOLKIT</p>
          <h2 id="skills-title">Skills</h2>
        </header>
        <div className="skills-row skills-row--four">
          {SKILLS.slice(0, 4).map((skill) => (
            <SkillCard key={skill.name} skill={skill} />
          ))}
        </div>
        <div className="skills-row skills-row--three">
          {SKILLS.slice(4).map((skill) => (
            <SkillCard key={skill.name} skill={skill} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;
