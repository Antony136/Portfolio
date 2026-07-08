import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Send, CheckCircle2, AlertCircle, MapPin, Mail } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState({ loading: false, success: false, error: null });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: null });

    const API_URL = window.location.hostname === 'localhost' 
      ? 'http://localhost:5000/api/contact'
      : 'https://portfolio-o6p3.onrender.com/api/contact';

    try {
      await axios.post(API_URL, formData);
      setStatus({ loading: false, success: true, error: null });
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus(prev => ({ ...prev, success: false })), 5000);
    } catch (err) {
      setStatus({ 
        loading: false, 
        success: false, 
        error: err.response?.data?.message || 'Something went wrong. Please try again.' 
      });
    }
  };

  return (
    <section id="contact">
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h2 style={{ fontSize: '3rem', marginBottom: '15px' }}>Get in <span className="gradient-text">Touch</span></h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '10px' }}>Have a project, idea, or opportunity in mind? I’d love to connect and build something meaningful together.</p>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '30px' }}>Open to internships, collaborations, and opportunities to create practical digital experiences.</p>
          
          <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', flexWrap: 'wrap', marginBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-primary)' }}>
              <div style={{ padding: '10px', background: 'rgba(99, 102, 241, 0.1)', borderRadius: '12px', color: 'var(--accent-primary)' }}>
                <MapPin size={20} />
              </div>
              <span style={{ fontSize: '1.1rem' }}>Chennai, Tamilnadu, India</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-primary)' }}>
              <div style={{ padding: '10px', background: 'rgba(99, 102, 241, 0.1)', borderRadius: '12px', color: 'var(--accent-primary)' }}>
                <Mail size={20} />
              </div>
              <a href="mailto:antonyabishek014@gmail.com" style={{ fontSize: '1.1rem', color: 'inherit', textDecoration: 'none' }}>antonyabishek014@gmail.com</a>
            </div>
          </div>
        </div>

        {status.success ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card" 
            style={{ padding: '60px 40px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}
          >
            <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px' }}>
              <CheckCircle2 size={40} color="#10b981" />
            </div>
            <h3 style={{ fontSize: '2rem' }}>Message sent successfully!</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem' }}>I'll get back to you as soon as possible.</p>
            <button 
              onClick={() => setStatus({ loading: false, success: false, error: null })}
              style={{ background: 'none', border: '1px solid var(--glass-border)', color: 'var(--text-primary)', padding: '10px 25px', borderRadius: '8px', cursor: 'pointer', marginTop: '10px' }}
            >
              Send another message
            </button>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="glass-card" style={{ padding: '40px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div className="grid grid-2">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label>Name</label>
                <input 
                  type="text" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleChange} 
                  required 
                  style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', padding: '12px', borderRadius: '10px', color: 'var(--text-primary)', outline: 'none' }} 
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label>Email</label>
                <input 
                  type="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleChange} 
                  required 
                  style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', padding: '12px', borderRadius: '10px', color: 'var(--text-primary)', outline: 'none' }} 
                />
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label>Subject</label>
              <input 
                type="text" 
                name="subject" 
                value={formData.subject} 
                onChange={handleChange} 
                required 
                style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', padding: '12px', borderRadius: '10px', color: 'var(--text-primary)', outline: 'none' }} 
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label>Message</label>
              <textarea 
                name="message" 
                value={formData.message} 
                onChange={handleChange} 
                required 
                rows="5"
                style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', padding: '12px', borderRadius: '10px', color: 'var(--text-primary)', resize: 'none', outline: 'none' }} 
              ></textarea>
            </div>

            <button 
              type="submit" 
              disabled={status.loading}
              style={{ 
                background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))', 
                color: 'var(--bg-primary)', border: 'none', padding: '15px', borderRadius: '10px', 
                fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', 
                justifyContent: 'center', gap: '10px', marginTop: '10px' 
              }}
            >
              {status.loading ? 'Sending...' : <><Send size={20} /> Send Message</>}
            </button>

            {status.error && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ color: '#ef4444', display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
                <AlertCircle size={20} /> {status.error}
              </motion.div>
            )}
          </form>
        )}
      </div>
    </section>
  );
};

export default Contact;
