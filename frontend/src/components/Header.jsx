import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Sun, Moon } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'Projects', href: '#projects' },
    { name: 'About', href: '#about' },
    { name: 'Achievements', href: '#highlights' },
    { name: 'Stats', href: '#coding-stats' },
    { name: 'Blog', href: '#blog' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header className={`transition-all duration-300 ${isScrolled ? 'glass-card rounded-none border-t-0 border-x-0' : 'bg-transparent'}`} style={{ position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 50, padding: isScrolled ? '15px 20px' : '25px 20px' }}>
      <div className="container mx-auto flex justify-between items-center" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 className="text-2xl font-bold gradient-text" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Portfolio.</h1>
        
        <style>{`
          .desktop-nav {
            display: none;
          }
          .nav-link {
            color: var(--text-secondary);
            text-decoration: none;
            margin-left: 30px;
            font-weight: 500;
            transition: var(--transition);
          }
          .nav-link:hover {
            color: var(--text-primary);
          }
          @media (min-width: 768px) {
            .desktop-nav { display: flex !important; align-items: center; }
            .mobile-toggle { display: none !important; }
          }
        `}</style>

        <div className="desktop-nav">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="nav-link">{link.name}</a>
          ))}
          <button onClick={toggleTheme} aria-label="Toggle Theme" style={{ background: 'none', border: 'none', color: 'var(--text-primary)', marginLeft: '30px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }} className="mobile-toggle">
          <button onClick={toggleTheme} aria-label="Toggle Theme" style={{ background: 'none', border: 'none', color: 'var(--text-primary)', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <div onClick={() => setIsMenuOpen(!isMenuOpen)} style={{ cursor: 'pointer', color: 'var(--text-primary)' }}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="mobile-menu" style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', padding: '100px 20px 20px', display: 'flex', flexDirection: 'column', gap: '25px', zIndex: 40, alignItems: 'center', background: 'var(--bg-primary)', overflowY: 'auto' }}>
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} onClick={() => setIsMenuOpen(false)} style={{ color: 'var(--text-primary)', textDecoration: 'none', fontSize: '1.5rem', fontWeight: 'bold' }}>{link.name}</a>
          ))}
        </div>
      )}
    </header>
  );
};

export default Header;
