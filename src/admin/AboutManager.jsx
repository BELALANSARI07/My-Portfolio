import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import './AboutManager.css';

const AboutManager = () => {
  const [formData, setFormData] = useState({
    bio: '',
    location: '',
    email: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    fetchAboutInfo();
  }, []);

  const fetchAboutInfo = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.from('about').select('*').single();
      if (error && error.code !== 'PGRST116') throw error; // Ignore "no rows returned" initially
      
      if (data) {
        setFormData({
          bio: data.bio || '',
          location: data.location || '',
          email: data.email || ''
        });
      }
    } catch (error) {
      console.error('Error fetching about info:', error.message);
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
      
      // Upsert to handle both initial insert and subsequent updates
      const { error } = await supabase.from('about').upsert({ id: 1, ...formData });
      
      if (error) throw error;
      setSuccessMsg('About information updated successfully!');
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (error) {
      console.error('Submit Error:', error.message);
      alert('Error updating about information');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="admin-about-container">
      <div className="admin-header">
        <h2 className="admin-page-title">About Me Manager</h2>
        <p className="admin-page-subtitle">Update your personal biography, location, and primary contact email.</p>
      </div>

      {loading ? (
        <p>Loading your profile data...</p>
      ) : (
        <div className="admin-form-card glassmorphism-card">
          {successMsg && <div className="success-banner">{successMsg}</div>}
          
          <form onSubmit={handleSubmit} className="about-form">
            <div className="form-row">
              <div className="form-group">
                <label>Location / Origin</label>
                <input 
                  type="text" 
                  name="location" 
                  value={formData.location} 
                  onChange={handleInputChange} 
                  required 
                  className="glow-input" 
                  placeholder="e.g., San Francisco, CA" 
                />
              </div>
              <div className="form-group">
                <label>Primary Email</label>
                <input 
                  type="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleInputChange} 
                  required 
                  className="glow-input" 
                  placeholder="hello@example.com"
                />
              </div>
            </div>
            
            <div className="form-group">
              <label>Biography (Markdown/Text)</label>
              <textarea 
                name="bio" 
                value={formData.bio} 
                onChange={handleInputChange} 
                required 
                className="glow-input" 
                rows="8" 
                placeholder="Write your professional bio here..."
              ></textarea>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn btn-primary" disabled={saving}>
                {saving ? 'Saving changes...' : 'Publish Update'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AboutManager;
