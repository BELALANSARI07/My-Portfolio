import React from 'react';
import { motion } from 'framer-motion';
import './Experience.css';

const Experience = () => {
  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section id="experience" className="section bg-alt">
      <div className="container">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          Experience & Achievements
        </motion.h2>

        <div className="timeline">
          {/* Item 1 */}
          <motion.div 
            className="timeline-item"
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="timeline-dot"></div>
            <div className="timeline-content">
              <h3>NIAT Masterclass Certification</h3>
              <p className="timeline-date">Recent</p>
              <p>Completed intensive training in advanced AI methodologies and practical applications.</p>
            </div>
          </motion.div>

          {/* Item 2 */}
          <motion.div 
            className="timeline-item"
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.2 }}
          >
            <div className="timeline-dot"></div>
            <div className="timeline-content">
              <h3>Hands-on GenAI Projects</h3>
              <p className="timeline-date">Ongoing</p>
              <p>Actively building and experimenting with generative AI models to solve novel problems.</p>
            </div>
          </motion.div>

          {/* Item 3 */}
          <motion.div 
            className="timeline-item"
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.4 }}
          >
            <div className="timeline-dot"></div>
            <div className="timeline-content">
              <h3>Hackathons & Technical Events</h3>
              <p className="timeline-date">Various</p>
              <p>Participated in numerous coding competitions, honing rapid prototyping and teamwork skills.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
