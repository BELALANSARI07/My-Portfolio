import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate, Link, useLocation } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { 
  FaTachometerAlt as DashIcon, 
  FaProjectDiagram as ProjIcon,
  FaCode as SkillIcon,
  FaUser as UserIcon,
  FaEnvelope as MsgIcon,
  FaFileAlt as ResumeIcon,
  FaLink as LinkIcon,
  FaSignOutAlt as SignOutIcon
} from 'react-icons/fa';
import './AdminLayout.css';

const AdminLayout = () => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
      if (!session) {
        navigate('/admin/login');
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (!session) {
        navigate('/admin/login');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login');
  };

  if (loading) {
    return <div className="admin-loading">Loading secure portal...</div>;
  }

  if (!session) {
    return null; // Redirect handled in useEffect
  }

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-logo">
          <h2>BELAL <span className="highlight">ADMIN</span></h2>
        </div>
        <nav className="admin-nav">
          <Link to="/admin" className={location.pathname === '/admin' ? 'active' : ''}>
            <DashIcon /> Dashboard
          </Link>
          <Link to="/admin/projects" className={location.pathname === '/admin/projects' ? 'active' : ''}>
            <ProjIcon /> Projects
          </Link>
          <Link to="/admin/skills" className={location.pathname === '/admin/skills' ? 'active' : ''}>
            <SkillIcon /> Skills
          </Link>
          <Link to="/admin/about" className={location.pathname === '/admin/about' ? 'active' : ''}>
            <UserIcon /> About Me
          </Link>
          <Link to="/admin/resume" className={location.pathname === '/admin/resume' ? 'active' : ''}>
            <ResumeIcon /> Resume
          </Link>
          <Link to="/admin/socials" className={location.pathname === '/admin/socials' ? 'active' : ''}>
            <LinkIcon /> Social Links
          </Link>
          <Link to="/admin/messages" className={location.pathname === '/admin/messages' ? 'active' : ''}>
            <MsgIcon /> Messages
          </Link>
        </nav>
        <div className="admin-footer">
          <button onClick={handleSignOut} className="btn-outline signout-btn">
            <SignOutIcon /> Sign Out
          </button>
        </div>
      </aside>
      
      <main className="admin-main-content">
        <header className="admin-topbar">
          <h3>Admin Gateway Active</h3>
          <Link to="/" target="_blank" className="btn btn-secondary btn-sm">View Live Site</Link>
        </header>
        <div className="admin-page-content">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
