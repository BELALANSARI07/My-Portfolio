import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../supabaseClient';
import './About.css';

const About = () => {
  const [aboutData, setAboutData] = useState(null);
  const [resumeUrl, setResumeUrl] = useState('');

  useEffect(() => {
    fetchAboutInfo();
    fetchResume();
  }, []);

  const fetchAboutInfo = async () => {
    try {
      // Fetch the first row instead of strictly single() to avoid PGRST116 errors if multiple exist
      const { data, error } = await supabase.from('about').select('*').limit(1);
      if (error) throw error;
      if (data && data.length > 0) setAboutData(data[0]);
    } catch (error) {
      console.error('Error fetching about data:', error);
    }
  };

  const fetchResume = async () => {
    try {
      const { data, error } = await supabase.storage.from('portfolio-assets').list('resume', {
        limit: 1,
        sortBy: { column: 'created_at', order: 'desc' }
      });
      if (data && data.length > 0) {
        const { data: urlData } = supabase.storage.from('portfolio-assets').getPublicUrl(`resume/${data[0].name}`);
        setResumeUrl(urlData.publicUrl);
      }
    } catch (error) {
      console.error('Error fetching resume:', error);
    }
  };

  return (
    <section id="about" className="section">
      <div className="container">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          About Me
        </motion.h2>

        <div className="about-content">
          <motion.div 
            className="about-text"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div style={{ whiteSpace: 'pre-wrap', marginBottom: '1.5rem', color: 'var(--text-secondary)' }}>
              {aboutData?.bio || 'I am a dedicated Computer Science student specializing in Artificial Intelligence and Machine Learning. My journey in tech is driven by an insatiable curiosity about how intelligent systems can solve complex, real-world problems.'}
            </div>
            
            {(aboutData?.location || aboutData?.email) && (
              <div className="about-contact-info" style={{ marginBottom: '2rem' }}>
                {aboutData?.location && <p><strong>Location:</strong> {aboutData.location}</p>}
                {aboutData?.email && <p><strong>Email:</strong> <a href={`mailto:${aboutData.email}`} style={{ color: 'var(--accent-color)' }}>{aboutData.email}</a></p>}
              </div>
            )}

            <a href={resumeUrl || "/resume.pdf"} className="btn btn-primary mt-4" target="_blank" rel="noopener noreferrer">
              <i className="fas fa-download" style={{marginRight: '8px'}}></i> Download Resume
            </a>
          </motion.div>

          <motion.div 
            className="about-stats"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <motion.div className="stat-box" whileHover={{ y: -5, borderColor: 'rgba(99, 102, 241, 0.3)' }}>
              <h3>AI/ML</h3>
              <p>Specialization</p>
            </motion.div>
            <motion.div className="stat-box" whileHover={{ y: -5, borderColor: 'rgba(99, 102, 241, 0.3)' }}>
              <h3>BTech CSE</h3>
              <p>Education</p>
            </motion.div>
            <motion.div className="stat-box" whileHover={{ y: -5, borderColor: 'rgba(99, 102, 241, 0.3)' }}>
              <h3>GenAI</h3>
              <p>Focus Area</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
