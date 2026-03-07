import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../supabaseClient';
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt, FaPaperPlane, FaSpinner } from 'react-icons/fa';
import './Contact.css';

const Contact = () => {
  const form = useRef();
  const [status, setStatus] = useState({ message: '', type: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [contactInfo, setContactInfo] = useState({ location: 'Your City, Country', email: 'your.email@example.com' });

  useEffect(() => {
    fetchContactInfo();
  }, []);

  const fetchContactInfo = async () => {
    try {
      const { data, error } = await supabase.from('about').select('location, email').single();
      if (!error && data) {
        setContactInfo({ location: data.location || contactInfo.location, email: data.email || contactInfo.email });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const sendEmail = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ message: '', type: '' });

    const formData = new FormData(form.current);
    const payload = {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message')
    };

    try {
      const { error } = await supabase.from('messages').insert([payload]);
      if (error) throw error;
      
      setStatus({ message: "Thanks for your message! It has been securely sent to my dashboard.", type: 'success' });
      form.current.reset();
    } catch (error) {
      console.error('Error sending message:', error.message);
      setStatus({ message: "Oops! There was a problem submitting your form.", type: 'error' });
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setStatus({ message: '', type: '' }), 5000);
    }
  };

  return (
    <section id="contact" className="section">
      <div className="container">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          Contact Me
        </motion.h2>

        <motion.div 
          className="contact-wrapper"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="contact-info">
            <h3>Let's Connect</h3>
            <p>I'm always open to discussing AI, machine learning, and potential collaborations.</p>
            <div className="info-item">
              <FaEnvelope className="info-icon" />
              <span>{contactInfo.email}</span>
            </div>
            <div className="info-item">
              <FaMapMarkerAlt className="info-icon" />
              <span>{contactInfo.location}</span>
            </div>
            <div className="info-item">
              <FaPhoneAlt className="info-icon" />
              <span>+00 0000000000</span>
            </div>
          </div>
          
          <div className="contact-form-container">
            <form ref={form} onSubmit={sendEmail}>
              <div className="form-group">
                <input type="text" name="name" required placeholder="Your Name" />
              </div>
              <div className="form-group">
                <input type="email" name="email" required placeholder="Your Email" />
              </div>
              <div className="form-group">
                <textarea name="message" required placeholder="Your Message" rows="5"></textarea>
              </div>
              
              <button type="submit" className="btn btn-primary btn-submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>Sending... <FaSpinner className="fa-spin" style={{marginLeft: '8px'}} /></>
                ) : (
                  <>Send Message <FaPaperPlane style={{marginLeft: '8px'}} /></>
                )}
              </button>
              
              {status.message && (
                <div className={`form-status ${status.type === 'success' ? 'success-msg' : 'error-msg'}`}>
                  {status.message}
                </div>
              )}
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
