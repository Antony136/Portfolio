import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Database, Layout, Smartphone } from 'lucide-react';

const About = () => {
  const [theme, setTheme] = React.useState(document.documentElement.getAttribute('data-theme') || 'dark');

  React.useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'data-theme') {
          setTheme(document.documentElement.getAttribute('data-theme'));
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true });
    return () => observer.disconnect();
  }, []);

  const statsColor = theme === 'light' ? '0f172a' : 'ffffff';

  const skills = [
    { title: "Web Development", icon: <Layout size={24} />, items: ["HTML/CSS", "React.js", "Node.js", "Express.js", "MongoDB"] },
    { title: "Languages", icon: <Code2 size={24} />, items: ["C", "C++", "Java", "Python", "JavaScript", "TypeScript"] },
    { title: "Databases", icon: <Database size={24} />, items: ["MySQL", "MongoDB", "PostgreSQL"] },
    { title: "Tools & Skills", icon: <Smartphone size={24} />, items: ["Git/GitHub", "Postman", "Problem Solving", "Teamwork"] }
  ];

  return (
    <section id="about">
      <div className="grid grid-2" style={{ alignItems: 'center', gap: 'clamp(20px, 5vw, 80px)' }}>
        <div>
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', marginBottom: '30px' }}>About <span className="gradient-text">Me</span></h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '20px', fontSize: '1.1rem' }}>
            I am a final-year Computer Science Engineering student building full-stack web applications, AI-driven experiences, and practical software products.
          </p>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '30px', fontSize: '1.1rem' }}>
            I enjoy turning ideas into scalable applications with thoughtful UI, clean architecture, and real-world impact. My focus lies at the intersection of web development, intelligent systems, and product thinking.
          </p>
          
          <div style={{ display: 'flex', gap: '15px', marginBottom: '40px', flexWrap: 'wrap' }}>
            <a href="https://drive.google.com/file/d/1zsSEDVrKCUDKzw4WsGTxZ8eE7By1liL0/view?usp=sharing" target="_blank" rel="noreferrer" className="glass-card" style={{ padding: '12px 24px', textDecoration: 'none', color: 'white', display: 'flex', alignItems: 'center', gap: '10px', background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))', border: 'none', fontWeight: 'bold', borderRadius: '10px' }}>
              View Resume
            </a>
            <a href="https://drive.google.com/uc?export=download&id=1zsSEDVrKCUDKzw4WsGTxZ8eE7By1liL0" className="glass-card" style={{ padding: '12px 24px', textDecoration: 'none', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '10px', background: 'var(--bg-secondary)', border: '1px solid var(--glass-border)', fontWeight: 'bold', borderRadius: '10px', transition: 'var(--transition)' }}>
              Download Resume
            </a>
          </div>
          
          <div className="glass-card" style={{ padding: '25px' }}>
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
        </div>

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
      </div>

      <div className="grid grid-2" style={{ alignItems: 'start', gap: 'clamp(20px, 5vw, 80px)', marginTop: '40px' }}>
        <div>
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

        <div>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '20px' }}>GitHub Stats</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <img 
              src={`https://github-readme-stats.vercel.app/api?username=Antony136&show_icons=true&theme=transparent&hide_border=true&title_color=6366f1&icon_color=6366f1&text_color=${statsColor}&bg_color=00000000`}
              alt="Antony's GitHub stats" 
              style={{ width: '100%', maxWidth: '450px', borderRadius: '10px' }}
            />
            <img 
              src={`https://github-readme-stats.vercel.app/api/top-langs/?username=Antony136&layout=compact&theme=transparent&hide_border=true&title_color=6366f1&text_color=${statsColor}&bg_color=00000000`} 
              alt="Top Languages" 
              style={{ width: '100%', maxWidth: '400px', borderRadius: '10px' }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
