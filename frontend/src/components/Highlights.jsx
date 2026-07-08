import React from 'react';
import { motion } from 'framer-motion';
import { 
  Trophy, 
  Globe, 
  Brain, 
  BarChart3, 
  Link as LinkIcon, 
  Terminal, 
  Users,
  Award
} from 'lucide-react';

const highlights = [
  {
    icon: <Globe size={24} />,
    title: "Full-Stack Development Experience",
    description: "Built and deployed production-ready MERN applications with authentication, REST APIs, CRUD workflows, and responsive user interfaces.",
    color: "#a855f7"
  },
  {
    icon: <Brain size={24} />,
    title: "Applied AI & Computer Vision",
    description: "Developed AI-powered solutions that combine web interfaces with practical analysis, computer vision, and real-world problem-solving.",
    color: "#ec4899"
  },
  {
    icon: <BarChart3 size={24} />,
    title: "Internship Exposure",
    description: "Completed a full-stack developer internship where I built and deployed multiple web applications using modern tools and deployment practices.",
    color: "#3b82f6"
  },
  {
    icon: <LinkIcon size={24} />,
    title: "Hackathons & Innovation",
    description: "Participated in multiple hackathons and earned a special mention for an AI-driven traffic management solution.",
    color: "#10b981"
  },
  {
    icon: <Terminal size={24} />,
    title: "Problem Solving & DSA",
    description: "Consistently practiced data structures and algorithms, with 270+ problems solved on LeetCode and a strong foundation in logical problem-solving.",
    color: "#f59e0b"
  },
  {
    icon: <Users size={24} />,
    title: "Collaborative & Product-Focused",
    description: "Work comfortably across frontend, backend, and team environments, with a strong focus on building useful software that people can trust.",
    color: "#ef4444"
  }
];

const Highlights = () => {
  return (
    <section id="highlights">
      <div style={{ marginBottom: '60px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '3rem', marginBottom: '15px' }}>
          🏆 <span className="gradient-text">Achievements</span> & Highlights
        </h2>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '700px', margin: '0 auto' }}>
          Key milestones and core strengths that define my journey as a developer.
        </p>
      </div>

      <div className="grid grid-3" style={{ gap: '25px' }}>
        {highlights.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5, borderColor: item.color }}
            className="glass-card"
            style={{ 
              padding: '30px', 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '15px',
              border: '1px solid var(--glass-border)',
              transition: 'all 0.3s ease'
            }}
          >
            <div style={{ 
              width: '50px', 
              height: '50px', 
              borderRadius: '12px', 
              background: `${item.color}15`, 
              color: item.color,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '10px'
            }}>
              {item.icon}
            </div>
            
            <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--text-primary)' }}>
              {item.title}
            </h3>
            
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', fontSize: '0.95rem' }}>
              {item.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Highlights;
