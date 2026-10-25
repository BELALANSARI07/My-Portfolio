import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { FaGithub } from 'react-icons/fa';
import { supabase } from '../supabaseClient';
import './Projects.css';

// 3D Tilt Card Component
const TiltCard = ({ project, index, projectVariants }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7.5deg", "-7.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7.5deg", "7.5deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div 
      className="project-card-wrapper"
      variants={projectVariants}
      style={{ perspective: 1000 }}
    >
      <motion.div
        className="project-card"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          backgroundImage: project.image_url ? `linear-gradient(to bottom, rgba(5,5,8,0.7), var(--bg-secondary)), url(${project.image_url})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}
        whileHover={{ scale: 1.02, zIndex: 10 }}
      >
        <div className="project-content" style={{ transform: "translateZ(50px)", zIndex: 2, position: 'relative' }}>
          <h3>{project.title}</h3>
          <p>{project.description}</p>
          <div className="project-tech">
            {project.tech_stack && project.tech_stack.map((t, i) => (
              <span key={i}>{t}</span>
            ))}
          </div>
          <div className="project-links">
             {project.github_link && (
               <a href={project.github_link} target="_blank" rel="noopener noreferrer" className="btn-outline">
                 <FaGithub style={{ marginRight: '8px' }}/> GitHub
               </a>
             )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      
      const parsedData = (data || []).map(p => {
        let techArray = [];
        try {
          techArray = typeof p.tech_stack === 'string' ? JSON.parse(p.tech_stack) : p.tech_stack;
        } catch(e) {
          techArray = typeof p.tech_stack === 'string' ? [p.tech_stack] : [];
        }
        return { ...p, tech_stack: Array.isArray(techArray) ? techArray : [] };
      });
      
      setProjects(parsedData);
    } catch (error) {
      console.error('Error fetching projects:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const projectVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section id="projects" className="section">
      <div className="container">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          Featured Projects
        </motion.h2>

        <motion.div 
          className="projects-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {loading ? (
            <p style={{ textAlign: 'center', width: '100%', color: 'var(--accent-color)' }}>Loading portfolio projects...</p>
          ) : projects.length === 0 ? (
            <p style={{ textAlign: 'center', width: '100%', color: 'var(--text-secondary)' }}>No projects found.</p>
          ) : (
            projects.map((project) => (
              <TiltCard 
                key={project.id}
                project={project}
                projectVariants={projectVariants}
              />
            ))
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
