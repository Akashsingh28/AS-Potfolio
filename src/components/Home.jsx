import { useEffect, useRef, useState } from "react";
import bootstrapLogo from "../assests/bootstrap.png";
import cssLogo from "../assests/css.png";
import githubLogo from "../assests/github.png";
import htmlLogo from "../assests/html.png";
import javascriptLogo from "../assests/js.png";
import heroPortrait from "../assests/akash-img.png";
import mongoDbLogo from "../assests/mongo-db.png";
import nodeLogo from "../assests/node.png";
import reactLogo from "../assests/react.png";
import sqlLogo from "../assests/sql.png";
import tailwindLogo from "../assests/tailwind.png";

const HERO_ROLES = ["Web Developer", "Full Stack Developer"];
const TYPING_SPEED_MS = 120;
const DELETING_SPEED_MS = 60;
const ROLE_PAUSE_MS = 2000;

const TECHNOLOGIES = [
  { name: "HTML", image: htmlLogo },
  { name: "CSS", image: cssLogo },
  { name: "JavaScript", image: javascriptLogo },
  { name: "Node.js", image: nodeLogo },
  { name: "MongoDB", image: mongoDbLogo },
  { name: "React", image: reactLogo },
  { name: "Tailwind CSS", image: tailwindLogo },
  { name: "Bootstrap", image: bootstrapLogo },
  { name: "GitHub", image: githubLogo },
  { name: "SQL", image: sqlLogo },
];

function HeroScene() {
  const sceneRef = useRef(null);
  const orbitRef = useRef(null);
  const rotationRef = useRef(0);
  const draggingRef = useRef(null);
  const [bubbles] = useState(TECHNOLOGIES);

  useEffect(() => {
    const scene = sceneRef.current;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let animationFrame;

    if (!scene || reduceMotion) {
      return undefined;
    }

    const handlePointerMove = (event) => {
      if (event.pointerType !== "mouse") return;
      window.cancelAnimationFrame(animationFrame);
      animationFrame = window.requestAnimationFrame(() => {
        const x = (event.clientX / window.innerWidth - 0.5) * 2;
        const y = (event.clientY / window.innerHeight - 0.5) * 2;
        scene.style.setProperty("--field-x", `${x * 9}px`);
        scene.style.setProperty("--field-y", `${y * 7}px`);
        scene.style.setProperty("--portrait-x", `${x * -12}px`);
        scene.style.setProperty("--portrait-y", `${y * -9}px`);
      });
    };

    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  useEffect(() => {
    const orbit = orbitRef.current;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (!orbit) return undefined;

    const icons = Array.from(orbit.querySelectorAll(".tech-bubble"));
    let animationFrame;
    let previousTime;

    const animateOrbit = (time) => {
      if (previousTime !== undefined && !reduceMotion && !draggingRef.current) {
        rotationRef.current += (time - previousTime) * 0.00006;
      }
      previousTime = time;

      const { width, height } = orbit.getBoundingClientRect();
      const centerX = width / 2;
      const centerY = height / 2;
      const radius = Math.min(width, height) * 0.47;

      icons.forEach((icon, index) => {
        const angle =
          (index / icons.length) * Math.PI * 2 + rotationRef.current;
        icon.style.left = `${centerX + Math.cos(angle) * radius}px`;
        icon.style.top = `${centerY + Math.sin(angle) * radius}px`;
      });

      animationFrame = window.requestAnimationFrame(animateOrbit);
    };

    animationFrame = window.requestAnimationFrame(animateOrbit);
    return () => window.cancelAnimationFrame(animationFrame);
  }, []);

  const getPointerAngle = (event) => {
    const bounds = orbitRef.current.getBoundingClientRect();
    return Math.atan2(
      event.clientY - (bounds.top + bounds.height / 2),
      event.clientX - (bounds.left + bounds.width / 2),
    );
  };

  const handleOrbitPointerDown = (event) => {
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    draggingRef.current = {
      pointerId: event.pointerId,
      angle: getPointerAngle(event),
    };
  };

  const handleOrbitPointerMove = (event) => {
    if (draggingRef.current?.pointerId !== event.pointerId) return;

    const angle = getPointerAngle(event);
    let delta = angle - draggingRef.current.angle;
    if (delta > Math.PI) delta -= Math.PI * 2;
    if (delta < -Math.PI) delta += Math.PI * 2;
    rotationRef.current += delta;
    draggingRef.current.angle = angle;
  };

  const handleOrbitPointerUp = (event) => {
    if (draggingRef.current?.pointerId !== event.pointerId) return;
    draggingRef.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  return (
    <div className="hero-visuals" ref={sceneRef}>
      <div className="ambient-glow" aria-hidden="true" />
      <div className="particle-field" aria-hidden="true">
        {Array.from({ length: 22 }, (_, index) => (
          <span className={`particle particle-${index + 1}`} key={index} />
        ))}
      </div>
      <div className="portrait-parallax">
        <div
          className="tech-field"
          ref={orbitRef}
          role="group"
          aria-label="Drag to spin the technology icons"
          onPointerDown={handleOrbitPointerDown}
          onPointerMove={handleOrbitPointerMove}
          onPointerUp={handleOrbitPointerUp}
          onPointerCancel={handleOrbitPointerUp}
        >
          {bubbles.map((bubble) => (
            <div className="tech-bubble" key={bubble.name}>
              <img src={bubble.image} alt={bubble.name} draggable="false" />
            </div>
          ))}
        </div>
        <div className="portrait-scene">
          <div className="portrait-orbit portrait-orbit--outer" />
          <div className="portrait-orbit portrait-orbit--inner" />
          <div className="portrait-halo" />
          <div className="portrait-frame">
            <div className="portrait-frame-mask">
              <img
                className="hero-portrait"
                src={heroPortrait}
                alt="Akash Singh"
              />
            </div>
            <img
              className="hero-portrait-overhang"
              src={heroPortrait}
              alt=""
              aria-hidden="true"
            />
          </div>
          <span className="orbit-light orbit-light--red" />
          <span className="orbit-light orbit-light--gold" />
        </div>
      </div>
    </div>
  );
}

function Home() {
  const [typedRole, setTypedRole] = useState("");

  useEffect(() => {
    let roleIndex = 0;
    let characterIndex = 0;
    let animationTimeout;

    const eraseNextCharacter = () => {
      characterIndex -= 1;
      setTypedRole(HERO_ROLES[roleIndex].slice(0, characterIndex));

      if (characterIndex === 0) {
        roleIndex = (roleIndex + 1) % HERO_ROLES.length;
        animationTimeout = window.setTimeout(
          typeNextCharacter,
          TYPING_SPEED_MS,
        );
      } else {
        animationTimeout = window.setTimeout(
          eraseNextCharacter,
          DELETING_SPEED_MS,
        );
      }
    };

    const typeNextCharacter = () => {
      characterIndex += 1;
      setTypedRole(HERO_ROLES[roleIndex].slice(0, characterIndex));

      if (characterIndex === HERO_ROLES[roleIndex].length) {
        animationTimeout = window.setTimeout(eraseNextCharacter, ROLE_PAUSE_MS);
      } else {
        animationTimeout = window.setTimeout(
          typeNextCharacter,
          TYPING_SPEED_MS,
        );
      }
    };

    animationTimeout = window.setTimeout(typeNextCharacter, TYPING_SPEED_MS);
    return () => window.clearTimeout(animationTimeout);
  }, []);

  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <HeroScene />
        <div className="hero-copy">
          <h1
            id="hero-title"
            aria-label={`Hii I'm Akash, ${typedRole || HERO_ROLES[0]}`}
          >
            Hii I&apos;m Akash
            <br />
            <span className="hero-role">{typedRole}</span>
          </h1>
          <p className="intro">
            Welcome to my portfolio! I am a dedicated Full Stack Developer
            passionate about designing and developing modern, responsive, and
            high-performance web applications. I specialize in frontend and
            backend technologies and MongoDB. I strive to build innovative
            digital solutions, deliver seamless user experiences, and
            continuously enhance my technical skills.
          </p>
          <a className="text-link" href="#skills">
            Explore More{" "}
            <span className="arrow-circle" aria-hidden="true">
              →
            </span>
          </a>
        </div>
      </section>
    </>
  );
}

export default Home;
