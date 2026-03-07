import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import './SkillsManager.css';

const SkillsManager = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Form State
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    level: 50 // Default percentage
  });

  // Predefined Categories
  const categories = ['Frontend', 'Backend', 'AI/ML', 'Tools', 'Database'];

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.from('skills').select('*').order('category', { ascending: true });
      if (error) throw error;
      setSkills(data || []);
    } catch (error) {
      console.error('Error fetching skills:', error.message);
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
      if (isEditing) {
        const { error } = await supabase.from('skills').update(formData).eq('id', currentId);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('skills').insert([formData]);
        if (error) throw error;
      }
      
      resetForm();
      fetchSkills();
    } catch (error) {
      console.error('Submit Error:', error.message);
      alert('Error saving skill');
    }
  };

  const handleEdit = (skill) => {
    setIsEditing(true);
    setCurrentId(skill.id);
    setFormData({
      name: skill.name,
      category: skill.category,
      level: skill.level
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this skill? This cannot be undone.')) {
      try {
        const { error } = await supabase.from('skills').delete().eq('id', id);
        if (error) throw error;
        fetchSkills();
      } catch (error) {
        console.error('Delete Error:', error.message);
      }
    }
  };

  const resetForm = () => {
    setIsEditing(false);
    setCurrentId(null);
    setFormData({ name: '', category: '', level: 50 });
  };

  // Group skills by category for display
  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {});

  return (
    <div className="admin-skills-container">
      <div className="admin-header">
        <h2 className="admin-page-title">Skill Matrix</h2>
        <p className="admin-page-subtitle">Manage your technical proficiencies and their categories.</p>
      </div>

      <div className="admin-form-card glassmorphism-card">
        <h3>{isEditing ? 'Update Skill' : 'Add New Skill'}</h3>
        <form onSubmit={handleSubmit} className="skill-form">
          <div className="form-row">
            <div className="form-group">
              <label>Skill Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleInputChange} required className="glow-input" placeholder="e.g., React JS" />
            </div>
            <div className="form-group">
              <label>Category</label>
              <select name="category" value={formData.category} onChange={handleInputChange} required className="glow-input">
                <option value="" disabled>Select a category...</option>
                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>
          </div>
          
          <div className="form-group">
            <label>Proficiency Level: {formData.level}%</label>
            <input 
              type="range" 
              name="level" 
              min="10" 
              max="100" 
              step="5"
              value={formData.level} 
              onChange={handleInputChange} 
              className="range-input" 
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              {isEditing ? 'Save Changes' : 'Add Skill'}
            </button>
            {isEditing && (
              <button type="button" className="btn btn-secondary" onClick={resetForm}>Cancel</button>
            )}
          </div>
        </form>
      </div>

      <div className="skills-list-wrapper">
        <h3>Current Skills</h3>
        {loading ? (
          <p>Loading skills...</p>
        ) : skills.length === 0 ? (
          <p className="no-data">No skills tracked. Add some above.</p>
        ) : (
          <div className="skills-category-list">
            {Object.keys(groupedSkills).map(category => (
              <div key={category} className="skill-category-group">
                <h4 className="category-title">{category}</h4>
                <div className="skills-table-container glassmorphism-card">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Skill Name</th>
                        <th>Level</th>
                        <th className="action-col">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {groupedSkills[category].map(skill => (
                        <tr key={skill.id}>
                          <td><strong>{skill.name}</strong></td>
                          <td>
                            <div className="level-bar-container">
                              <div className="level-bar" style={{ width: `${skill.level}%` }}></div>
                              <span className="level-text">{skill.level}%</span>
                            </div>
                          </td>
                          <td className="action-col">
                            <button onClick={() => handleEdit(skill)} className="btn-icon-sm edit" title="Edit"><FaEdit /></button>
                            <button onClick={() => handleDelete(skill.id)} className="btn-icon-sm delete" title="Delete"><FaTrash /></button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SkillsManager;
