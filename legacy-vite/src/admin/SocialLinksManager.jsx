import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import './AboutManager.css'; // Will share styles with exact same form layout

const SocialLinksManager = () => {
  const [formData, setFormData] = useState({
    github: '',
    linkedin: '',
    email: '' // Fallback email link
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    fetchLinks();
  }, []);

  const fetchLinks = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.from('social_links').select('*').single();
      if (error && error.code !== 'PGRST116') throw error;
      
      if (data) {
        setFormData({
          github: data.github || '',
          linkedin: data.linkedin || '',
          email: data.email || ''
        });
      }
    } catch (error) {
      console.error('Error fetching social links:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      setSuccessMsg('');
      
      // Upsert to handle initial row or updates, assuming id 1
      const { error } = await supabase.from('social_links').upsert({ id: 1, ...formData });
      
      if (error) throw error;
      setSuccessMsg('Social Links updated successfully!');
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (error) {
      console.error('Submit Error:', error.message);
      alert('Error updating social links');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="admin-about-container">
      <div className="admin-header">
        <h2 className="admin-page-title">Social Links Metadata</h2>
        <p className="admin-page-subtitle">Update the links for the hero buttons, footer, and contact interfaces.</p>
      </div>

      {loading ? (
        <p>Loading links...</p>
      ) : (
        <div className="admin-form-card glassmorphism-card">
          {successMsg && <div className="success-banner">{successMsg}</div>}
          
          <form onSubmit={handleSubmit} className="about-form">
            <div className="form-group">
              <label>GitHub Profile URL</label>
              <input 
                type="url" 
                name="github" 
                value={formData.github} 
                onChange={handleInputChange} 
                className="glow-input" 
                placeholder="https://github.com/YourUsername" 
              />
            </div>

            <div className="form-group">
              <label>LinkedIn Profile URL</label>
              <input 
                type="url" 
                name="linkedin" 
                value={formData.linkedin} 
                onChange={handleInputChange} 
                className="glow-input" 
                placeholder="https://linkedin.com/in/YourUsername" 
              />
            </div>

            <div className="form-actions">
              <button type="submit" className="btn btn-primary" disabled={saving}>
                {saving ? 'Synching...' : 'Update Links'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default SocialLinksManager;
