import "./App.css";
import About from "./components/About.jsx";
import Contact from "./components/Contact.jsx";
import EducationSection from "./components/Education.jsx";
import Faq from "./components/Faq.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./components/Home.jsx";
import Navbar from "./components/Navbar.jsx";
import ProjectsExperience from "./components/ProjectsExperience.jsx";
import Skills from "./components/Skills.jsx";

function App() {
  return (
    <main className="portfolio-page">
      <section className="home-screen" id="home">
        <Navbar />
        <Home />
      </section>
      <About />
      <EducationSection />
      <Skills />
      <ProjectsExperience />
      <Contact />
      <Faq />
      <Footer />
    </main>
  );
}

export default App;
