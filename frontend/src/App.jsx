import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Projects from './components/Projects';
import About from './components/About';
import Highlights from './components/Highlights';
import CodingStats from './components/CodingStats';
import Blog from './components/Blog';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import ScrollProgress from './components/ScrollProgress';
import SEO from './components/SEO';
import { HelmetProvider } from 'react-helmet-async';
import { Analytics } from '@vercel/analytics/react';

const App = () => {
  return (
    <HelmetProvider>
      <Router>
      <div className="app-container">
        <SEO 
          title="Antony Abishek A | Final-Year CSE Student | Full-Stack & AI Developer" 
          description="Final-year Computer Science Engineering student building full-stack web applications and AI-driven solutions that solve real-world problems."
          keywords="Antony Abishek A, Final-Year CSE Student, Full-Stack Developer, AI Developer, MERN Stack, React, Node.js, Portfolio"
          url="https://antonyabishek.vercel.app/"
        />
        <CustomCursor />
        <ScrollProgress />
        <Header />
        <main>
          <Routes>
            <Route path="/" element={
              <>
                <Hero />
                <Projects />
                <About />
                <Highlights />
                <CodingStats />
                <Blog />
                <Contact />
              </>
            } />
          </Routes>
        </main>
        <Footer />
        <Analytics />
      </div>
    </Router>
    </HelmetProvider>
  );
};

export default App;
