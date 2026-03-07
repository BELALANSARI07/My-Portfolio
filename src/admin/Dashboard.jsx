import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { Link } from 'react-router-dom';
import { FaProjectDiagram, FaCode, FaEnvelope } from 'react-icons/fa';
import './Dashboard.css';

const Dashboard = () => {
  const [stats, setStats] = useState({
    projects: 0,
    skills: 0,
    messages: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      // We will perform three simple count queries
      const { count: projCount } = await supabase.from('projects').select('*', { count: 'exact', head: true });
      const { count: skillCount } = await supabase.from('skills').select('*', { count: 'exact', head: true });
      const { count: msgCount } = await supabase.from('messages').select('*', { count: 'exact', head: true });

      setStats({
        projects: projCount || 0,
        skills: skillCount || 0,
        messages: msgCount || 0
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="admin-loading">Loading Statistics...</div>;
  }

  return (
    <div className="dashboard-container">
      <h2 className="admin-page-title">Operations Center</h2>
      <p className="admin-page-subtitle">Overview of your dynamic portfolio data.</p>
      
      <div className="stats-grid">
        <Link to="/admin/projects" className="stat-card glassmorphism-card">
          <div className="stat-icon-wrapper projects-bg">
            <FaProjectDiagram />
          </div>
          <div className="stat-details">
            <h3>{stats.projects}</h3>
            <p>Active Projects</p>
          </div>
        </Link>
        
        <Link to="/admin/skills" className="stat-card glassmorphism-card">
          <div className="stat-icon-wrapper skills-bg">
            <FaCode />
          </div>
          <div className="stat-details">
            <h3>{stats.skills}</h3>
            <p>Tracked Skills</p>
          </div>
        </Link>

        <Link to="/admin/messages" className="stat-card glassmorphism-card">
          <div className="stat-icon-wrapper messages-bg">
            <FaEnvelope />
          </div>
          <div className="stat-details">
            <h3>{stats.messages}</h3>
            <p>Unread Messages</p>
          </div>
        </Link>
      </div>

      <div className="dashboard-hero glassmorphism-card mt-4">
        <h3>Welcome to the Supabase Admin Portal</h3>
        <p>You can manage all aspects of your FAANG-level portfolio directly from this dashboard. Changes made here will instantly reflect on the live website.</p>
        <div className="quick-actions">
           <Link to="/admin/projects" className="btn btn-primary">Add New Project</Link>
           <Link to="/admin/about" className="btn btn-secondary">Update Bio</Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
