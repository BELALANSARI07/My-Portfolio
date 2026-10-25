import React from 'react';
import { motion } from 'framer-motion';
import { GitHubCalendar } from 'react-github-calendar';
import './GithubIntegration.css';

const GithubIntegration = () => {
    // Custom theme colors for the contribution graph to match the neon aesthetic
    const explicitTheme = {
        light: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
        dark: ['#1c1c22', '#00f0ff33', '#00f0ff66', '#bd00ff99', '#bd00ff'],
    };

    return (
        <section id="github" className="section bg-alt" style={{ paddingBottom: '3rem' }}>
            <div className="container">
                <motion.h2 
                    className="section-title"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6 }}
                >
                    GitHub Live Contributions
                </motion.h2>

                <motion.div 
                    className="github-card glassmorphism-card"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <div className="calendar-container">
                        <GitHubCalendar 
                            username="BELALANSARI07" 
                            blockSize={15}
                            blockMargin={5}
                            colorScheme="dark"
                            theme={explicitTheme}
                            fontSize={14}
                        />
                    </div>
                    
                    <div className="github-stats">
                        <a 
                            href="https://github.com/BELALANSARI07" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="btn btn-secondary github-btn"
                        >
                            View Full GitHub Profile
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default GithubIntegration;
