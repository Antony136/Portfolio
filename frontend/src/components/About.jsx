import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Database, Layout, Smartphone, Download } from 'lucide-react';

const About = () => {
  const skills = [
    { title: 'Web Development', icon: <Layout size={24} />, items: ['HTML/CSS', 'React.js', 'Node.js', 'Express.js', 'MongoDB'] },
    { title: 'Languages', icon: <Code2 size={24} />, items: ['C', 'C++', 'Java', 'Python', 'JavaScript', 'TypeScript'] },
    { title: 'Databases', icon: <Database size={24} />, items: ['MySQL', 'MongoDB', 'PostgreSQL'] },
    { title: 'Tools & Skills', icon: <Smartphone size={24} />, items: ['Git/GitHub', 'Postman', 'Problem Solving', 'Teamwork'] }
  ];

  return (
    <section id="about">
      <div className="grid grid-2" style={{ alignItems: 'flex-end', gap: 'clamp(20px, 5vw, 80px)' }}>
        <div>
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', marginBottom: '30px' }}>About <span className="gradient-text">Me</span></h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '20px', fontSize: '1.1rem' }}>
            I am a final-year Computer Science Engineering student building full-stack web applications, AI-driven experiences, and practical software products.
          </p>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '30px', fontSize: '1.1rem' }}>
            I enjoy turning ideas into scalable applications with thoughtful UI, clean architecture, and real-world impact. My focus lies at the intersection of web development, intelligent systems, and product thinking.
          </p>

          <div style={{ display: 'flex', gap: '15px', marginBottom: '40px', flexWrap: 'wrap' }}>
            <motion.a 
              href="https://drive.google.com/file/d/1vYfJtgdO4opRUJ02gmacTRD81ntBWG7G/view?usp=drive_link" 
              target="_blank" 
              rel="noreferrer" 
              className="glass-card" 
              style={{ padding: '12px 24px', textDecoration: 'none', color: 'white', display: 'flex', alignItems: 'center', gap: '10px', background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))', border: 'none', fontWeight: 'bold', borderRadius: '10px' }}
              whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(99, 102, 241, 0.4)' }}
              whileTap={{ scale: 0.95 }}
            >
              View Resume
            </motion.a>
            <motion.a 
              href="https://drive.google.com/uc?export=download&id=1vYfJtgdO4opRUJ02gmacTRD81ntBWG7G" 
              target="_blank" 
              rel="noreferrer" 
              className="glass-card" 
              style={{ padding: '12px 24px', textDecoration: 'none', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '10px', background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', fontWeight: 'bold', borderRadius: '10px' }}
              whileHover={{ scale: 1.05, background: 'rgba(255, 255, 255, 0.08)', borderColor: 'var(--accent-primary)', boxShadow: '0 0 20px rgba(99, 102, 241, 0.2)' }}
              whileTap={{ scale: 0.95 }}
            >
              <Download size={18} />
              Download Resume
            </motion.a>
          </div>

          <div className="glass-card" style={{ padding: '25px', marginBottom: '20px' }}>
            <h4 style={{ marginBottom: '15px', fontSize: '1.2rem' }}>Education</h4>
            <div style={{ marginBottom: '15px' }}>
              <p style={{ color: 'var(--text-primary)', fontWeight: '600' }}>B.E. Computer Science Engineering</p>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Sri Venkateswara College of Engineering • 2023 - Present</p>
              <p style={{ color: 'var(--accent-primary)', fontSize: '0.9rem', fontWeight: '500', marginTop: '4px' }}>CGPA: 8.74 / 10</p>
            </div>
            <div>
              <p style={{ color: 'var(--text-primary)', fontWeight: '600' }}>Higher Secondary (Computer Science & Maths)</p>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Holy Family Convent School • 2011 - 2023</p>
              <p style={{ color: 'var(--accent-primary)', fontSize: '0.9rem', fontWeight: '500', marginTop: '4px' }}>Score: 96.01%</p>
            </div>
          </div>

          <div className="glass-card" style={{ padding: '30px', borderLeft: '4px solid var(--accent-primary)' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ position: 'relative', display: 'flex', height: '12px', width: '12px' }}>
                <span style={{ animation: 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite', position: 'absolute', display: 'inline-flex', height: '100%', width: '100%', borderRadius: '9999px', backgroundColor: 'var(--accent-primary)', opacity: 0.75 }}></span>
                <span style={{ position: 'relative', display: 'inline-flex', borderRadius: '9999px', height: '12px', width: '12px', backgroundColor: 'var(--accent-primary)' }}></span>
              </span>
              Currently Exploring
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <li style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-primary)', fontWeight: '600', fontSize: '1rem' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-primary)' }}></div>
                  AI-powered web applications
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', paddingLeft: '18px', lineHeight: '1.4' }}>
                  Building practical solutions that combine intelligent systems with clean, modern interfaces.
                </p>
              </li>
              <li style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-primary)', fontWeight: '600', fontSize: '1rem' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-secondary)' }}></div>
                  Computer vision + real-world impact
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', paddingLeft: '18px', lineHeight: '1.4' }}>
                  Exploring how visual intelligence can be turned into useful tools for people and businesses.
                </p>
              </li>
              <li style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-primary)', fontWeight: '600', fontSize: '1rem' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-primary)' }}></div>
                  Scalable full-stack systems
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', paddingLeft: '18px', lineHeight: '1.4' }}>
                  Focusing on architecture, maintainability, and thoughtful product development from idea to deployment.
                </p>
              </li>
            </ul>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="grid grid-2" style={{ gap: '20px' }}>
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="glass-card"
                style={{ padding: '20px' }}
              >
                <div className="gradient-text" style={{ marginBottom: '15px' }}>{skill.icon}</div>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '10px' }}>{skill.title}</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                  {skill.items.map(item => (
                    <span key={item} style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>• {item}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="glass-card" style={{ padding: '30px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '4px' }}>Internship & Projects</h3>
            <div>
              <p style={{ color: 'var(--text-primary)', fontWeight: '700', marginBottom: '6px' }}>Full Stack Developer Intern</p>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                Worked as a Full Stack Developer Intern at Future Interns (Remote) from March 2026 to April 2026. I contributed to web development workflows, built responsive interfaces, worked with backend APIs, and helped deploy applications using modern tools and practices.
              </p>
            </div>
            <div>
              <p style={{ color: 'var(--text-primary)', fontWeight: '700', marginBottom: '6px' }}>Projects I Built</p>
              <ul style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.7', paddingLeft: '18px', margin: 0 }}>
                <li><strong>Portfolio Website</strong> — a polished personal portfolio showcasing my work, skills, and projects.</li>
                <li><strong>Mini CRM</strong> — a lead management system with dashboard analytics and client tracking.</li>
                <li><strong>Restaurant Website</strong> — a full-stack restaurant platform with reservations, menu browsing, and admin workflow.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
