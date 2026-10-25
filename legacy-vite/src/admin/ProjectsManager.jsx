import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { FaPlus, FaEdit, FaTrash, FaImage } from 'react-icons/fa';
import './ProjectsManager.css';

const ProjectsManager = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Form State
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tech_stack: '',
    github_link: '',
    image_url: ''
  });
  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
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

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setImageFile(e.target.files[0]);
    }
  };

  const uploadImage = async () => {
    if (!imageFile) return formData.image_url;
    
    try {
      setUploading(true);
      const fileExt = imageFile.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `projects/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('portfolio-assets')
        .upload(filePath, imageFile);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('portfolio-assets')
        .getPublicUrl(filePath);

      return data.publicUrl;
    } catch (error) {
      console.error('Upload Error:', error.message);
      alert('Error uploading image');
      return formData.image_url;
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const imageUrl = await uploadImage();
    const projectData = {
      title: formData.title,
      description: formData.description,
      tech_stack: formData.tech_stack.split(',').map(s => s.trim()), // Convert comma separated to array
      github_link: formData.github_link,
      image_url: imageUrl
    };

    try {
      if (isEditing) {
        const { error } = await supabase.from('projects').update(projectData).eq('id', currentId);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('projects').insert([projectData]);
        if (error) throw error;
      }
      
      resetForm();
      fetchProjects();
    } catch (error) {
      console.error('Submit Error:', error.message);
      alert('Error saving project');
    }
  };

  const handleEdit = (project) => {
    setIsEditing(true);
    setCurrentId(project.id);
    setFormData({
      title: project.title,
      description: project.description,
      tech_stack: project.tech_stack.join(', '), // Convert array back to comma separated for input
      github_link: project.github_link || '',
      image_url: project.image_url || ''
    });
    setImageFile(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this project? This cannot be undone.')) {
      try {
        const { error } = await supabase.from('projects').delete().eq('id', id);
        if (error) throw error;
        fetchProjects();
      } catch (error) {
        console.error('Delete Error:', error.message);
      }
    }
  };

  const resetForm = () => {
    setIsEditing(false);
    setCurrentId(null);
    setFormData({ title: '', description: '', tech_stack: '', github_link: '', image_url: '' });
    setImageFile(null);
    document.getElementById('image-upload').value = '';
  };

  return (
    <div className="admin-projects-container">
      <div className="admin-header">
        <h2 className="admin-page-title">Project Manager</h2>
        <p className="admin-page-subtitle">Add, edit, or delete projects from your portfolio.</p>
      </div>

      <div className="admin-form-card glassmorphism-card">
        <h3>{isEditing ? 'Update Project' : 'Create New Project'}</h3>
        <form onSubmit={handleSubmit} className="project-form">
          <div className="form-row">
            <div className="form-group">
              <label>Project Title</label>
              <input type="text" name="title" value={formData.title} onChange={handleInputChange} required className="glow-input" />
            </div>
            <div className="form-group">
              <label>GitHub Link</label>
              <input type="url" name="github_link" value={formData.github_link} onChange={handleInputChange} className="glow-input" />
            </div>
          </div>
          
          <div className="form-group">
            <label>Description</label>
            <textarea name="description" value={formData.description} onChange={handleInputChange} required className="glow-input" rows="4"></textarea>
          </div>
          
          <div className="form-group">
            <label>Tech Stack (comma separated)</label>
            <input type="text" name="tech_stack" value={formData.tech_stack} onChange={handleInputChange} required className="glow-input" placeholder="React, Node.js, Supabase" />
          </div>

          <div className="form-group image-upload-group">
            <label>Project Cover Image</label>
            <div className="file-input-wrapper">
              <input type="file" id="image-upload" accept="image/*" onChange={handleFileChange} className="file-input" />
              <div className="file-input-custom">
                <FaImage /> {imageFile ? imageFile.name : 'Choose a file...'}
              </div>
            </div>
            {formData.image_url && !imageFile && <p className="current-image-text">Current: {formData.image_url.substring(0, 30)}...</p>}
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary" disabled={uploading}>
              {uploading ? 'Uploading...' : isEditing ? 'Save Changes' : 'Publish Project'}
            </button>
            {isEditing && (
              <button type="button" className="btn btn-secondary" onClick={resetForm}>Cancel</button>
            )}
          </div>
        </form>
      </div>

      <div className="projects-list-wrapper">
        <h3>Active Projects</h3>
        {loading ? (
          <p>Loading projects...</p>
        ) : projects.length === 0 ? (
          <p className="no-data">No projects found. Create one above.</p>
        ) : (
          <div className="admin-projects-grid">
            {projects.map(project => (
              <div key={project.id} className="admin-project-card glassmorphism-card">
                {project.image_url && (
                  <div className="img-preview" style={{ backgroundImage: `url(${project.image_url})` }}></div>
                )}
                <div className="card-content">
                  <h4>{project.title}</h4>
                  <p className="tech-tags">{project.tech_stack?.join(', ')}</p>
                  <p className="desc-preview">{project.description?.substring(0, 80)}...</p>
                  <div className="card-actions">
                    <button onClick={() => handleEdit(project)} className="btn-icon edit"><FaEdit /> Edit</button>
                    <button onClick={() => handleDelete(project.id)} className="btn-icon delete"><FaTrash /> Delete</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectsManager;
