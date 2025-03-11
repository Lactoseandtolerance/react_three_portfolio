import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';

// Import components
import Navigation from './components/Navigation';
import SimpleNav from './components/SimpleNav';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import StarBackground from './components/StarBackground'; // Import the new CSS-based star background

// Global styles
const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  body {
    font-family: 'Roboto Mono', monospace;
    background-color: #000;
    color: #d4d4d4;
    overflow-x: hidden;
  }
  
  a {
    text-decoration: none;
    color: inherit;
  }
  
  section {
    min-height: 100vh;
    padding: 100px 0;
    position: relative;
  }
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 1;
`;

function App() {
  const [showNavigation, setShowNavigation] = useState(true);
  
  useEffect(() => {
    // Disable scrolling on the home page to keep the globe navigation static
    const handleRouteChange = () => {
      const path = window.location.pathname;
      if (path === '/') {
        document.body.style.overflow = 'hidden'; // Prevent scrolling on home page
      } else {
        document.body.style.overflow = 'auto'; // Enable scrolling on other pages
      }
    };
    
    // Initial check
    handleRouteChange();
    
    // Listen for popstate event (browser back/forward navigation)
    window.addEventListener('popstate', handleRouteChange);
    
    return () => {
      window.removeEventListener('popstate', handleRouteChange);
      document.body.style.overflow = 'auto'; // Reset on unmount
    };
  }, []);
  
  return (
    <Router>
      <GlobalStyle />
      
      {/* Add the star background to all pages */}
      <StarBackground />
      
      {/* Show 3D navigation only on the home page */}
      <Routes>
        <Route path="/" element={<Navigation />} />
      </Routes>
      
      {/* Show simple nav on all pages except home */}
      <Routes>
        <Route path="/about" element={<SimpleNav />} />
        <Route path="/projects" element={<SimpleNav />} />
        <Route path="/contact" element={<SimpleNav />} />
      </Routes>
      
      <ContentWrapper>
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        
        <Footer />
      </ContentWrapper>
    </Router>
  );
}

export default App;