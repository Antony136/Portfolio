import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github, CheckCircle2 } from 'lucide-react';

const ProjectModal = ({ project, onClose }) => {
  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [project]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div 
        style={{ 
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', 
          backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)', 
          zIndex: 99999, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' 
        }}
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="glass-card"
          style={{ 
            width: '100%', maxWidth: '900px', maxHeight: '90vh', overflowY: 'auto', 
            position: 'relative', padding: '40px', backgroundColor: 'var(--bg-primary)'
          }}
          onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
        >
          {/* Close Button */}
          <button 
            onClick={onClose}
            aria-label="Close Modal"
            style={{ 
              position: 'absolute', top: '20px', right: '20px', background: 'var(--glass-bg)', 
              border: '1px solid var(--glass-border)', color: 'var(--text-primary)', 
              borderRadius: '50%', padding: '8px', cursor: 'pointer', display: 'flex'
            }}
          >
            <X size={24} />
          </button>

          <div style={{ marginBottom: '30px', paddingRight: '40px' }}>
            {project.subtitle && <span className="gradient-text" style={{ fontWeight: 'bold', textTransform: 'uppercase', fontSize: '0.85rem', letterSpacing: '0.05em' }}>{project.subtitle}</span>}
            <h2 style={{ fontSize: '2.5rem', lineHeight: '1.2', marginTop: '10px', marginBottom: '15px' }}>{project.title}</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
              {project.tech.map(t => (
                <span key={t} style={{ fontSize: '0.8rem', padding: '6px 12px', background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', borderRadius: '20px', color: 'var(--text-primary)' }}>{t}</span>
              ))}
            </div>
            
            <div style={{ display: 'flex', gap: '15px' }}>
              {project.github && project.github !== '#' && (
                <a href={project.github} target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-primary)', textDecoration: 'none', fontWeight: '500' }}>
                  <Github size={18} /> Source Code
                </a>
              )}
              {project.live && project.live !== '#' && (
                <a href={project.live} target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-primary)', textDecoration: 'none', fontWeight: '500' }}>
                  <ExternalLink size={18} /> Live Demo
                </a>
              )}
            </div>
          </div>

          <div style={{ borderTop: '1px solid var(--glass-border)', paddingTop: '30px', display: 'flex', flexDirection: 'column', gap: '30px' }}>
            
            {/* Demo Video */}
            {project.demoVideo && (
              <div style={{ width: '100%', borderRadius: '16px', overflow: 'hidden', border: '1px solid var(--glass-border)', boxShadow: '0 20px 40px rgba(0,0,0,0.3)', backgroundColor: '#000' }}>
                <video 
                  src={project.demoVideo} 
                  autoPlay 
                  loop 
                  muted 
                  controls 
                  style={{ width: '100%', maxHeight: '60vh', display: 'block', objectFit: 'contain' }} 
                />
              </div>
            )}

            {/* Standard Description (if no detailed sections) */}
            {!project.details && (
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: '1.8' }}>{project.description}</p>
            )}

            {/* Detailed Sections (Like AI Traffic System) */}
            {project.details && (
              <>
                {project.details.problemStatement && (
                  <div>
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '15px' }}>Problem Statement & Solution</h3>
                    <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: '15px' }}>{project.details.problemStatement}</p>
                  </div>
                )}

                {project.details.features && (
                  <div>
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '15px' }}>Key Workflows & Features</h3>
                    <div className="grid grid-2" style={{ gap: '20px' }}>
                      {project.details.features.map((feature, i) => (
                        <div key={i} className="glass-card" style={{ padding: '20px', background: 'var(--glass-bg)' }}>
                          <h4 style={{ color: 'var(--text-primary)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <CheckCircle2 size={18} color="var(--accent-primary)" /> {feature.title}
                          </h4>
                          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{feature.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {project.details.challenges && (
                  <div>
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '15px' }}>Challenges Faced</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '15px' }}>
                      {project.details.challenges.map((challenge, i) => (
                        <div key={i} style={{ padding: '15px', borderLeft: '2px solid var(--accent-secondary)', background: 'var(--glass-bg)', borderRadius: '0 10px 10px 0' }}>
                          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', margin: 0 }}>{challenge}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {project.details.futureImprovements && (
                  <div>
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '15px' }}>Future Improvements</h3>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                      {project.details.futureImprovements.map((item, i) => (
                        <span key={i} style={{ padding: '8px 15px', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.2)', color: '#10b981', borderRadius: '8px', fontSize: '0.9rem' }}>
                          • {item}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {project.details.feasibility && (
                  <div className="grid grid-2" style={{ gap: '30px', marginTop: '10px' }}>
                    <div>
                      <h3 style={{ fontSize: '1.5rem', marginBottom: '15px' }}>Feasibility</h3>
                      <ul style={{ listStylePosition: 'inside', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {project.details.feasibility.map((f, i) => <li key={i}>{f}</li>)}
                      </ul>
                    </div>
                    {project.details.novelty && (
                      <div>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '15px' }}>Novelty</h3>
                        <ul style={{ listStylePosition: 'inside', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                          {project.details.novelty.map((n, i) => <li key={i}>{n}</li>)}
                        </ul>
                      </div>
                    )}
                  </div>
                )}

                {project.details.business && (
                  <div className="glass-card" style={{ padding: '30px', borderLeft: '4px solid var(--accent-secondary)', marginBottom: '20px' }}>
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '15px' }}>Business & Value Proposition</h3>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '15px' }}><strong>Target Audience:</strong> {project.details.business.model}</p>
                    {project.details.business.valueProps && (
                      <ul style={{ listStylePosition: 'inside', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
                        {project.details.business.valueProps.map((vp, i) => <li key={i}>{vp}</li>)}
                      </ul>
                    )}
                    {project.details.business.roi && (
                      <div style={{ padding: '15px', background: 'rgba(99, 102, 241, 0.1)', borderRadius: '10px', color: 'var(--text-primary)', fontSize: '0.9rem' }}>
                        <strong>ROI:</strong> {project.details.business.roi}
                      </div>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ProjectModal;
