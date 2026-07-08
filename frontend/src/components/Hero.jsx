import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Github, Linkedin, Mail, Code2 } from 'lucide-react';
import ThreeBackground from './ThreeBackground';

const Hero = () => {
  return (
    <section id="home" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', position: 'relative' }}>
      
      {/* 3D Particle Background */}
      <ThreeBackground />

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="hero-content"
        style={{ zIndex: 10 }}
      >
        <span className="gradient-text" style={{ fontWeight: '600', letterSpacing: '0.1em', textTransform: 'uppercase', fontSize: '0.9rem', marginBottom: '20px', display: 'block' }}>
          Hi, I am Antony Abishek A
        </span>
        <h1 style={{ fontSize: 'clamp(2.5rem, 8vw, 5rem)', lineHeight: '1.1', marginBottom: '15px' }}>
          Building Full-Stack Web <br /> & <span className="gradient-text">AI Products</span>
        </h1>
        <p style={{ color: 'var(--text-primary)', fontSize: '1.4rem', fontWeight: '500', marginBottom: '10px' }}>
          Final-Year CSE Student | MERN Stack | AI & Computer Vision
        </p>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto 10px' }}>
          I design and build scalable web applications, practical AI experiences, and user-focused digital products.
        </p>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', maxWidth: '620px', margin: '0 auto 40px' }}>
          Open to internships, collaborations, and opportunities to build something meaningful.
        </p>
        
        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="#projects" className="glass-card" style={{ padding: '15px 30px', textDecoration: 'none', color: 'var(--bg-primary)', background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))', display: 'flex', alignItems: 'center', gap: '10px', transition: 'var(--transition)', fontWeight: 'bold' }}>
            View My Projects <ArrowRight size={20} />
          </a>
          <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
            <a href="https://github.com/Antony136" aria-label="GitHub Profile" target="_blank" rel="noreferrer" className="glass-card circular-icon-link" style={{ padding: '12px', color: 'var(--text-primary)', border: '1px solid var(--glass-border)' }}><Github size={20} /></a>
            <a href="https://www.linkedin.com/in/antonyabishek136" aria-label="LinkedIn Profile" target="_blank" rel="noreferrer" className="glass-card circular-icon-link" style={{ padding: '12px', color: 'var(--text-primary)', border: '1px solid var(--glass-border)' }}><Linkedin size={20} /></a>
            <a href="https://leetcode.com/u/Antony_136/" aria-label="LeetCode Profile" target="_blank" rel="noreferrer" className="glass-card circular-icon-link" style={{ padding: '12px', color: 'var(--text-primary)', border: '1px solid var(--glass-border)' }}><Code2 size={20} /></a>
            <a href="mailto:antonyabishek014@gmail.com" aria-label="Email Me" className="glass-card circular-icon-link" style={{ padding: '12px', color: 'var(--text-primary)', border: '1px solid var(--glass-border)' }}><Mail size={20} /></a>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
