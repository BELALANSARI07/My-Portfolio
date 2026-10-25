import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaCode, FaBrain, FaTools, FaDatabase, FaLayerGroup } from 'react-icons/fa';
import { supabase } from '../supabaseClient';
import './Skills.css';

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const { data, error } = await supabase.from('skills').select('*');
      if (error) throw error;
      setSkills(data || []);
    } catch (error) {
      console.error('Error fetching skills:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryIcon = (category) => {
    switch(category.toLowerCase()) {
      case 'frontend': return <FaCode className="skill-icon" />;
      case 'backend': return <FaLayerGroup className="skill-icon" />;
      case 'ai/ml': return <FaBrain className="skill-icon" />;
      case 'database': return <FaDatabase className="skill-icon" />;
      case 'tools': return <FaTools className="skill-icon" />;
      default: return <FaCode className="skill-icon" />;
    }
  };

  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {});
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1, y: 0,
      transition: { duration: 0.6 }
    }
  };

  const CircularSkill = ({ name, level }) => {
    const radius = 35;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (level / 100) * circumference;

    return (
      <div className="circular-skill">
        <div className="svg-container">
          <svg width="100" height="100" viewBox="0 0 100 100">
            {/* Background Circle */}
            <circle
              className="circle-bg"
              cx="50"
              cy="50"
              r={radius}
              fill="none"
              strokeWidth="8"
            />
            {/* Progress Circle with Animation */}
            <motion.circle
              className="circle-progress"
              cx="50"
              cy="50"
              r={radius}
              fill="none"
              strokeWidth="8"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              whileInView={{ strokeDashoffset }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
            />
          </svg>
          <div className="circular-value">{level}%</div>
        </div>
        <span className="circular-name">{name}</span>
      </div>
    );
  };

  return (
    <section id="skills" className="section bg-alt">
      <div className="container">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          Technical Skills
        </motion.h2>

        <motion.div 
          className="skills-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {loading ? (
            <p style={{ textAlign: 'center', width: '100%', color: 'var(--accent-color)' }}>Loading technical stack...</p>
          ) : Object.keys(groupedSkills).length === 0 ? (
            <p style={{ textAlign: 'center', width: '100%', color: 'var(--text-secondary)' }}>No skills found.</p>
          ) : (
            Object.keys(groupedSkills).map((category) => (
              <motion.div key={category} className="skill-card glassmorphism-card" variants={cardVariants} whileHover={{ y: -5 }}>
                <div className="skill-header">
                  {getCategoryIcon(category)}
                  <h3>{category}</h3>
                </div>
                <div className="circular-skills-grid">
                  {groupedSkills[category].map((skill) => (
                    <CircularSkill key={skill.id} name={skill.name} level={skill.level} />
                  ))}
                </div>
              </motion.div>
            ))
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
