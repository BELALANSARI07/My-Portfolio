import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-scroll';
import { Typewriter } from 'react-simple-typewriter';
import './Hero.css';

const Hero = () => {
  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <section id="home" className="hero">
      <div className="container hero-container">
        <motion.div 
          className="hero-content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 variants={itemVariants}>
            Hi, I'm <span className="highlight">YOUR NAME</span>
          </motion.h1>
          <motion.h2 variants={itemVariants} className="hero-subtitle">
            <Typewriter 
              words={['AI/ML Engineer', 'GenAI Developer', 'Software Engineer']}
              loop={true}
              cursor
              cursorStyle='_'
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1500}
            />
          </motion.h2>
          <motion.p variants={itemVariants}>
            I build intelligent systems and explore the frontiers of machine learning. Passionate about turning complex data into actionable insights and creating real-world AI applications.
          </motion.p>
          <motion.div className="hero-buttons" variants={itemVariants}>
            <Link to="projects" smooth={true} duration={500} className="btn btn-primary">
              View Projects
            </Link>
            <Link to="contact" smooth={true} duration={500} className="btn btn-secondary">
              Contact Me
            </Link>
          </motion.div>
        </motion.div>

        <motion.div 
          className="hero-image-wrapper"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <div className="hero-image-container">
            <img src="/profile.jpg" alt="Belal Ansari Photo" className="hero-photo" />
          </div>
        </motion.div>
      </div>
      <div className="hero-bg-glow"></div>
    </section>
  );
};

export default Hero;
