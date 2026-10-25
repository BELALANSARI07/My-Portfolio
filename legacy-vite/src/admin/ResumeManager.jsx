import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { FaFilePdf, FaUpload } from 'react-icons/fa';
import './AboutManager.css'; // Reuse form card styles

const ResumeManager = () => {
  const [resumeFile, setResumeFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [currentResumeUrl, setCurrentResumeUrl] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    fetchCurrentResume();
  }, []);

  const fetchCurrentResume = async () => {
    try {
      // In a real scenario, you might store the filename in a table
      // Here we assume the latest uploaded file in `resume` folder
      const { data, error } = await supabase.storage.from('portfolio-assets').list('resume', {
        limit: 1,
        sortBy: { column: 'created_at', order: 'desc' }
      });
      
      if (error) throw error;
      
      if (data && data.length > 0) {
        const { data: urlData } = supabase.storage
          .from('portfolio-assets')
          .getPublicUrl(`resume/${data[0].name}`);
        
        setCurrentResumeUrl(urlData.publicUrl);
      }
    } catch (error) {
      console.error('Error fetching resume:', error.message);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setResumeFile(e.target.files[0]);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!resumeFile) return;

    try {
      setUploading(true);
      setSuccessMsg('');
      
      const fileExt = resumeFile.name.split('.').pop();
      // Ensure we use a unique name or overwrite a specific one. Using timestamp.
      const fileName = `resume_${Date.now()}.${fileExt}`;
      const filePath = `resume/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('portfolio-assets')
        .upload(filePath, resumeFile);

      if (uploadError) throw uploadError;

      setSuccessMsg('Resume uploaded successfully!');
      fetchCurrentResume();
      setResumeFile(null);
      // Reset input
      document.getElementById('resume-upload').value = '';
      
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (error) {
      console.error('Upload Error:', error.message);
      alert('Error uploading resume');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="admin-about-container">
      <div className="admin-header">
        <h2 className="admin-page-title">Resume Manager</h2>
        <p className="admin-page-subtitle">Upload your latest PDF resume for recruiters to download.</p>
      </div>

      <div className="admin-form-card glassmorphism-card">
        {successMsg && <div className="success-banner">{successMsg}</div>}
        
        <form onSubmit={handleUpload} className="about-form">
          {currentResumeUrl && (
            <div className="current-data" style={{ marginBottom: '1.5rem', padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Currently Active Resume:</p>
              <a href={currentResumeUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-color)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <FaFilePdf /> View current resume
              </a>
            </div>
          )}

          <div className="form-group">
            <label>Upload New Resume (PDF)</label>
            <div className="file-input-wrapper">
              <input 
                type="file" 
                id="resume-upload" 
                accept=".pdf" 
                onChange={handleFileChange} 
                className="file-input" 
                required
              />
              <div className="file-input-custom" style={{ padding: '2rem', border: '2px dashed rgba(255,255,255,0.2)' }}>
                <FaUpload size={24} style={{ marginBottom: '0.5rem', color: 'var(--accent-color)' }} />
                <br/>
                {resumeFile ? resumeFile.name : 'Drag & drop or click to choose a PDF'}
              </div>
            </div>
          </div>

          <div className="form-actions" style={{ marginTop: '1rem' }}>
            <button type="submit" className="btn btn-primary" disabled={uploading || !resumeFile}>
              {uploading ? 'Uploading to Supabase...' : 'Publish New Resume'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResumeManager;
