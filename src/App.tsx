import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./assets/App.css";

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const sections = ["home", "about", "skills", "projects", "contact"];
  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = sectionRefs.current[section];
        if (element) {
          const { offsetTop, offsetHeight } = element;

          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  const scrollToSection = (sectionId: string) => {
    setIsMenuOpen(false);
    const element = sectionRefs.current[sectionId];
    if (element) {
      window.scrollTo({
        top: element.offsetTop,
        behavior: "smooth",
      });
    }
  };

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1 } },
  };

  const slideUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const skillVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  };

  // Mock data - replace with your information
  const skills = [
    { name: "React", level: 90 },
    { name: "JavaScript", level: 85 },
    { name: "TypeScript", level: 80 },
    { name: "CSS/SCSS", level: 75 },
    { name: "Node.js", level: 70 },
    { name: "UI/UX Design", level: 65 },
  ];

  const projects = [
    {
      title: "Project 1",
      description: "A brief description of your project 1.",
      image: "https://via.placeholder.com/300x200",
      tags: ["React", "TypeScript", "Redux"],
      link: "#",
    },
    {
      title: "Project 2",
      description: "A brief description of your project 2.",
      image: "https://via.placeholder.com/300x200",
      tags: ["Node.js", "Express", "MongoDB"],
      link: "#",
    },
    {
      title: "Project 3",
      description: "A brief description of your project 3.",
      image: "https://via.placeholder.com/300x200",
      tags: ["React Native", "Firebase", "Redux"],
      link: "#",
    },
  ];

  return (
    <div className="app">
      {/* Navigation */}
      <header className="header">
        <motion.div
          className="logo"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span>Your Name</span>
        </motion.div>

        <div className="nav-toggle" onClick={toggleMenu}>
          <div className={`hamburger ${isMenuOpen ? "active" : ""}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

        <motion.nav
          className={`navbar ${isMenuOpen ? "active" : ""}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <ul>
            {sections.map((section) => (
              <motion.li
                key={section}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <a
                  href={`#${section}`}
                  className={activeSection === section ? "active" : ""}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(section);
                  }}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </a>
              </motion.li>
            ))}
          </ul>
        </motion.nav>
      </header>

      {/* Hero Section */}
      <motion.section
        id="home"
        className="hero"
        ref={(el) => (sectionRefs.current["home"] = el)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeIn}
      >
        <div className="hero-content">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Hello, I'm <span className="highlight">Your Name</span>
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <TypewriterEffect
              texts={["Web Developer", "UI/UX Designer", "Problem Solver"]}
            />
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            I create beautiful, interactive, and responsive web experiences.
          </motion.p>

          <motion.div
            className="hero-buttons"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <motion.button
              className="btn primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection("contact")}
            >
              Contact Me
            </motion.button>

            <motion.button
              className="btn secondary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection("projects")}
            >
              View Projects
            </motion.button>
          </motion.div>
        </div>

        <motion.div
          className="hero-image"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {/* Replace with your image */}
          <div className="image-placeholder">Your Image</div>
        </motion.div>

        <motion.div
          className="scroll-indicator"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          whileHover={{ scale: 1.2 }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            onClick={() => scrollToSection("about")}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7 10L12 15L17 10"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* About Section */}
      <motion.section
        id="about"
        className="about"
        ref={(el) => (sectionRefs.current["about"] = el)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeIn}
      >
        <motion.h2 variants={slideUp}>About Me</motion.h2>

        <div className="about-content container mx-auto">
          <motion.div className="about-image" variants={slideUp}>
            {/* Replace with your image */}
            <div className="image-placeholder">Your Image</div>
          </motion.div>

          <motion.div className="about-text" variants={slideUp}>
            <p>
              I'm a passionate web developer with X years of experience in
              creating modern, responsive web applications. My journey began
              with [Your Background Story]...
            </p>

            <p>
              My approach to design and development focuses on [Your
              Philosophy]... I believe in creating user-friendly experiences
              that are both beautiful and functional.
            </p>

            <p>
              When I'm not coding, you can find me [Your Hobbies/Interests]...
              These activities help me stay creative and bring fresh
              perspectives to my work.
            </p>

            <motion.div
              className="about-stats"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.div className="stat" variants={skillVariants}>
                <h3>10+</h3>
                <p>Projects Completed</p>
              </motion.div>

              <motion.div className="stat" variants={skillVariants}>
                <h3>5+</h3>
                <p>Years Experience</p>
              </motion.div>

              <motion.div className="stat" variants={skillVariants}>
                <h3>100%</h3>
                <p>Client Satisfaction</p>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Skills Section */}
      <motion.section
        id="skills"
        className="skills"
        ref={(el) => (sectionRefs.current["skills"] = el)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeIn}
      >
        <motion.h2 variants={slideUp}>My Skills</motion.h2>

        <motion.div className="skills-content" variants={staggerContainer}>
          {skills.map((skill, index) => (
            <motion.div
              className="skill-item"
              key={index}
              variants={skillVariants}
            >
              <div className="skill-info">
                <h3>{skill.name}</h3>
                <span>{skill.level}%</span>
              </div>

              <div className="skill-bar">
                <motion.div
                  className="skill-progress"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.3 }}
                ></motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div className="technologies" variants={slideUp}>
          <h3>Technologies I work with</h3>
          <div className="tech-icons">
            {/* Replace with actual icons */}
            <motion.div
              className="tech-icon"
              whileHover={{ scale: 1.2, rotate: 5 }}
            >
              React
            </motion.div>
            <motion.div
              className="tech-icon"
              whileHover={{ scale: 1.2, rotate: 5 }}
            >
              TypeScript
            </motion.div>
            <motion.div
              className="tech-icon"
              whileHover={{ scale: 1.2, rotate: 5 }}
            >
              Node.js
            </motion.div>
            {/* Add more tech icons as needed */}
          </div>
        </motion.div>
      </motion.section>

      {/* Projects Section */}
      <motion.section
        id="projects"
        className="projects"
        ref={(el) => (sectionRefs.current["projects"] = el)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeIn}
      >
        <motion.h2 variants={slideUp}>My Projects</motion.h2>
        <motion.div className="projects-grid px-10" variants={staggerContainer}>
          {projects.map((project, index) => (
            <motion.div
              className="project-card "
              key={index}
              variants={slideUp}
              whileHover={{
                y: -10,
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
              }}
            >
              <div className="project-image">
                <img src={project.image} alt={project.title} />
              </div>

              <div className="project-details">
                <h3>{project.title}</h3>
                <p>{project.description}</p>

                <div className="project-tags">
                  {project.tags.map((tag, i) => (
                    <span className="tag" key={i}>
                      {tag}
                    </span>
                  ))}
                </div>

                <motion.a
                  href={project.link}
                  className="btn secondary"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Project
                </motion.a>
              </div>
            </motion.div>
          ))}
        </motion.div>
        <motion.div className="more-projects" variants={slideUp}>
          <motion.a
            href="#"
            className="btn primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            See More Projects
          </motion.a>
        </motion.div>
      </motion.section>

      {/* Contact Section */}
      <motion.section
        id="contact"
        className="contact"
        ref={(el) => (sectionRefs.current["contact"] = el)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeIn}
      >
        <motion.h2 variants={slideUp}>Get In Touch</motion.h2>

        <div className="contact-content container mx-auto text">
          <motion.div className="contact-info" variants={slideUp}>
            <h3>Contact Information</h3>

            <div className="contact-items">
              <div className="contact-item">
                <div className="icon">
                  <i className="fas fa-envelope"></i>
                </div>
                <div className="details">
                  <h4>Email</h4>
                  <a href="mailto:youremail@example.com">
                    youremail@example.com
                  </a>
                </div>
              </div>

              <div className="contact-item">
                <div className="icon">
                  <i className="fas fa-phone"></i>
                </div>
                <div className="details">
                  <h4>Phone</h4>
                  <a href="tel:+1234567890">+1 (234) 567-890</a>
                </div>
              </div>

              <div className="contact-item">
                <div className="icon">
                  <i className="fas fa-map-marker-alt"></i>
                </div>
                <div className="details">
                  <h4>Location</h4>
                  <p>City, Country</p>
                </div>
              </div>
            </div>

            <div className="social-links">
              <motion.a
                href="#"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-linkedin"></i>
              </motion.a>

              <motion.a
                href="#"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-github"></i>
              </motion.a>

              <motion.a
                href="#"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-twitter"></i>
              </motion.a>
            </div>
          </motion.div>

          <motion.form className="contact-form" variants={slideUp}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" name="name" required />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" required />
            </div>

            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input type="text" id="subject" name="subject" required />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
              ></textarea>
            </div>

            <motion.button
              type="submit"
              className="btn primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Send Message
            </motion.button>
          </motion.form>
        </div>
      </motion.section>

      {/* Footer */}
      <motion.footer
        className="footer"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <div className="footer-content">
          <div className="footer-logo">
            <span>Your Name</span>
          </div>

          <div className="footer-links">
            <ul>
              {sections.map((section) => (
                <li key={section}>
                  <a
                    href={`#${section}`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(section);
                    }}
                  >
                    {section.charAt(0).toUpperCase() + section.slice(1)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-social">
            <a href="#" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-linkedin"></i>
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-github"></i>
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-twitter"></i>
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            &copy; {new Date().getFullYear()} Your Name. All rights reserved.
          </p>
        </div>
      </motion.footer>
    </div>
  );
};

// Typewriter Effect Component
const TypewriterEffect: React.FC<{ texts: string[] }> = ({ texts }) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const text = texts[currentTextIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (isDeleting) {
      if (currentText === "") {
        setIsDeleting(false);
        setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
        timeout = setTimeout(() => {}, 500); // Pause before typing next word
      } else {
        timeout = setTimeout(() => {
          setCurrentText(text.substring(0, currentText.length - 1));
        }, 50);
      }
    } else {
      if (currentText === text) {
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, 2000); // Wait before starting to delete
      } else {
        timeout = setTimeout(() => {
          setCurrentText(text.substring(0, currentText.length + 1));
        }, 100);
      }
    }

    return () => clearTimeout(timeout);
  }, [currentText, currentTextIndex, isDeleting, texts]);

  return (
    <span>
      {currentText}
      <span className="cursor">|</span>
    </span>
  );
};

export default App;
