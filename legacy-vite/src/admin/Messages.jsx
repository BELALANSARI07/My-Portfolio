import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { FaTrash, FaEnvelopeOpenText } from 'react-icons/fa';
import './Messages.css';

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      setMessages(data || []);
    } catch (error) {
      console.error('Error fetching messages:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this message?')) {
      try {
        const { error } = await supabase.from('messages').delete().eq('id', id);
        if (error) throw error;
        setMessages(messages.filter(msg => msg.id !== id));
      } catch (error) {
        console.error('Delete Error:', error.message);
      }
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="admin-messages-container">
      <div className="admin-header">
        <h2 className="admin-page-title">Inbox</h2>
        <p className="admin-page-subtitle">View and manage contact form submissions directly from the portfolio.</p>
      </div>

      <div className="messages-list-wrapper">
        {loading ? (
          <p>Loading your inbox...</p>
        ) : messages.length === 0 ? (
          <div className="empty-inbox glassmorphism-card">
            <FaEnvelopeOpenText size={40} style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }} />
            <p className="no-data">Your inbox is empty. No messages yet.</p>
          </div>
        ) : (
          <div className="messages-grid">
            {messages.map(msg => (
              <div key={msg.id} className="message-card glassmorphism-card">
                <div className="msg-header">
                  <div>
                    <h4>{msg.name}</h4>
                    <a href={`mailto:${msg.email}`} className="msg-email">{msg.email}</a>
                  </div>
                  <span className="msg-date">{formatDate(msg.created_at)}</span>
                </div>
                <div className="msg-body">
                  <p>{msg.message}</p>
                </div>
                <div className="msg-footer">
                  <button onClick={() => handleDelete(msg.id)} className="btn-icon-sm delete" title="Delete Message">
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Messages;
