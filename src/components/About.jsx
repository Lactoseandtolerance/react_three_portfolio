import React, { useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';

// Main section with scroll enabled
const AboutSection = styled.section`
  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
  position: relative;
  background-color: #0c0c0c;
  scrollbar-width: thin;
  scrollbar-color: #333 #0c0c0c;
  
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: #0c0c0c;
  }
  
  &::-webkit-scrollbar-thumb {
    background-color: #333;
    border-radius: 6px;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
  padding: 0 20px;
`;

const SectionTitle = styled.h2`
  font-size: 3rem;
  color: #d4af37;
  margin-bottom: 2rem;
  text-align: center;
  padding-top: 80px;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const AboutContent = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
  
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const AboutText = styled.div`
  p {
    font-size: 1.2rem;
    line-height: 1.8;
    margin-bottom: 1.5rem;
    color: #d4d4d4;
  }
`;

// Enhanced skills container with grid layout
const SkillsContainer = styled.div`
  background: rgba(17, 17, 17, 0.7);
  border-radius: 10px;
  padding: 2rem;
  border: 1px solid #333;
  position: relative;
  min-height: 300px;
`;

const SkillsTitle = styled.h3`
  font-size: 1.8rem;
  color: #d4af37;
  margin-bottom: 1.5rem;
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const SkillBubble = styled.div`
  background: #1b1b1b;
  color: #fff;
  border: 1px solid #d4af37;
  border-radius: 10px;
  padding: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 0.9rem;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  transform-origin: center;
  cursor: pointer;
  height: 45px;
  position: relative;
  overflow: hidden;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg, 
      transparent, 
      rgba(212, 175, 55, 0.2), 
      transparent
    );
    transition: left 0.5s ease;
  }
  
  &:hover {
    transform: scale(1.1);
    background: #d4af37;
    color: #000;
    z-index: 10;
    box-shadow: 0 5px 15px rgba(212, 175, 55, 0.3);
    
    &:before {
      left: 100%;
    }
  }
`;

const SectionDivider = styled.div`
  margin: 5rem 0;
  height: 1px;
  background: linear-gradient(to right, transparent, #333, transparent);
`;

// Common grid layout for Fashion and Decor items
const ItemsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-auto-rows: minmax(250px, auto);
  gap: 1.5rem;
  margin: 3rem 0;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const randomFloatAnimation = (min, max) => keyframes`
  0% { transform: translateY(${min}px) scale(1); }
  50% { transform: translateY(${max}px) scale(1.05); }
  100% { transform: translateY(${min}px) scale(1); }
`;

const ItemBox = styled.div`
  position: relative;
  height: ${props => props.height || '350px'};
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4);
  animation: ${props => randomFloatAnimation(props.minFloat || -5, props.maxFloat || 5)} 
    ${props => props.animationDuration || '8s'} 
    ease-in-out infinite;
  animation-delay: ${props => props.animationDelay || '0s'};
  
  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      to bottom,
      transparent 70%,
      rgba(0, 0, 0, 0.7)
    );
    z-index: 1;
  }
  
  @media (max-width: 768px) {
    height: ${props => props.mobileHeight || '250px'};
  }
`;

const ItemImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  transition: opacity 1.2s ease-in-out;
  opacity: ${props => props.active ? '1' : '0'};
`;

// Overlay when an image is clicked to enlarge
const ImageOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  z-index: 15;
  display: ${props => props.visible ? 'block' : 'none'};
  cursor: pointer;
`;

// Individual image component with state-based transitions
const SlidingImages = ({ images, boxIndex, imageType }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  useEffect(() => {
    // Calculate a different delay for each box
    const baseDelay = 4000; // Longer base delay (4 seconds)
    const randomOffset = Math.floor(Math.random() * 2000); // Random offset between 0-2000ms
    const delay = baseDelay + (boxIndex * 800) + randomOffset; // 4-8.2s with randomization
    
    // Set up the interval for changing images
    const interval = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % images.length);
    }, delay);
    
    // Clean up the interval
    return () => clearInterval(interval);
  }, [boxIndex, images.length]);
  
  return (
    <>
      {images.map((image, imageIndex) => (
        <ItemImage
          key={imageIndex}
          active={imageIndex === activeIndex}
          style={{ backgroundImage: `url(/images/${image})` }}
        />
      ))}
    </>
  );
};

const About = () => {
  // States
  const [activeImage, setActiveImage] = useState(null);
  
  // Refs for parallax
  const fashionBoxesRef = useRef([]);
  const decorBoxesRef = useRef([]);
  
  // Skills list with grouping by category
  const skills = [
    { name: 'Python', category: 'Programming' },
    { name: 'JavaScript', category: 'Programming' },
    { name: 'HTML', category: 'Web' },
    { name: 'CSS', category: 'Web' },
    { name: 'SQL', category: 'Data' },
    { name: 'React.js', category: 'Web' },
    { name: 'Three.js', category: 'Graphics' },
    { name: 'Data Visualization', category: 'Data' },
    { name: 'Machine Learning', category: 'AI' },
    { name: 'Database Design', category: 'Data' },
    { name: 'RESTful APIs', category: 'Web' },
    { name: 'Pandas', category: 'Data' },
    { name: 'Scikit-learn', category: 'AI' },
    { name: 'Firebase', category: 'Backend' },
    { name: 'OpenCV', category: 'AI' },
    { name: 'OOP', category: 'Programming' },
    { name: 'Data Structures', category: 'Programming' },
    { name: 'Content-Based Filtering', category: 'AI' },
    { name: 'Collaborative Filtering', category: 'AI' },
    { name: 'Plotly', category: 'Data' },
    { name: 'Tkinter', category: 'UI' }
  ];

  // Color coded skills based on category
  const getCategoryColor = (category) => {
    const colors = {
      'Programming': '#3f51b5', // Indigo
      'Web': '#2196f3',         // Blue
      'Data': '#009688',        // Teal
      'AI': '#9c27b0',          // Purple
      'Graphics': '#ff9800',    // Orange
      'Backend': '#f44336',     // Red
      'UI': '#4caf50'           // Green
    };
    
    return colors[category] || '#d4af37'; // Gold default
  };
  
  // Enhanced parallax scrolling effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      
      // Apply parallax to fashion boxes
      fashionBoxesRef.current.forEach((box, index) => {
        if (!box) return;
        
        const rect = box.getBoundingClientRect();
        
        // Only apply effect when box is in viewport
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          // Different speeds based on box position
          const speed = 0.15 + (index * 0.03);
          const yPos = (scrollY - box.offsetTop) * speed;
          
          // Apply the transform with a subtle movement
          box.style.transform = `translateY(${yPos}px)`;
          
          // Add depth perception by scaling slightly
          const scale = 1 + (yPos * 0.0005);
          box.style.transform += ` scale(${scale})`;
        }
      });
      
      // Apply parallax to decor boxes
      decorBoxesRef.current.forEach((box, index) => {
        if (!box) return;
        
        const rect = box.getBoundingClientRect();
        
        // Only apply effect when box is in viewport
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          // Different speeds based on box position (reverse direction from fashion)
          const speed = 0.12 + (index * 0.02);
          const yPos = (scrollY - box.offsetTop) * speed * -1; // Reverse direction
          
          // Apply the transform with a subtle movement
          box.style.transform = `translateY(${yPos}px)`;
          
          // Add depth perception by scaling slightly
          const scale = 1 + (Math.abs(yPos) * 0.0003);
          box.style.transform += ` scale(${scale})`;
        }
      });
    };
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Close enlarged image when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (activeImage !== null && e.target.classList.contains('overlay')) {
        setActiveImage(null);
      }
    };
    
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [activeImage]);
  
  // Fashion images data with randomized properties
  const fashionImages = [
    {
      images: ['Fashion1.jpg', 'Fashion2.jpg', 'Fashion3.jpg', 'Fashion4.jpg'],
      height: '320px',
      mobileHeight: '240px',
      minFloat: -8,
      maxFloat: 2,
      animationDuration: '9s',
      animationDelay: '0s'
    },
    {
      images: ['Fashion3.jpg', 'Fashion4.jpg', 'Fashion5.jpg', 'Fashion6.jpg'],
      height: '380px',
      mobileHeight: '260px',
      minFloat: -2,
      maxFloat: 12,
      animationDuration: '11s',
      animationDelay: '0.3s'
    },
    {
      images: ['Fashion5.jpg', 'Fashion6.jpg', 'Fashion7.jpg', 'Fashion1.jpg'],
      height: '340px',
      mobileHeight: '230px',
      minFloat: -15,
      maxFloat: -5,
      animationDuration: '8.5s',
      animationDelay: '0.7s'
    },
    {
      images: ['Fashion7.jpg', 'Fashion3.jpg', 'Fashion1.jpg', 'Fashion2.jpg'],
      height: '300px',
      mobileHeight: '220px',
      minFloat: -4,
      maxFloat: 6,
      animationDuration: '10s',
      animationDelay: '1.1s'
    }
  ];
  
  // Decor images data with randomized properties (different from fashion)
  const decorImages = [
    {
      images: ['cool1.jpg', 'cool5.jpg', 'cool3.jpg', 'cool8.jpg'],
      height: '370px',
      mobileHeight: '250px',
      minFloat: -6,
      maxFloat: 4,
      animationDuration: '10.5s',
      animationDelay: '0.2s'
    },
    {
      images: ['cool2.jpg', 'cool6.jpg', 'cool4.jpg', 'cool7.jpg'],
      height: '330px',
      mobileHeight: '230px',
      minFloat: -3,
      maxFloat: 9,
      animationDuration: '9.5s',
      animationDelay: '0.5s'
    },
    {
      images: ['cool3.jpg', 'cool7.jpg', 'cool1.jpg', 'cool5.jpg'],
      height: '350px',
      mobileHeight: '240px',
      minFloat: -10,
      maxFloat: -3,
      animationDuration: '11.5s',
      animationDelay: '0.8s'
    },
    {
      images: ['cool4.jpg', 'cool8.jpg', 'cool2.jpg', 'cool6.jpg'],
      height: '310px',
      mobileHeight: '220px',
      minFloat: -5,
      maxFloat: 8,
      animationDuration: '8.5s',
      animationDelay: '1.3s'
    }
  ];
  
  // Toggle image enlarge on click
  const toggleImageView = (index, type) => {
    if (activeImage && activeImage.index === index && activeImage.type === type) {
      setActiveImage(null);
    } else {
      setActiveImage({ index, type });
    }
  };
  
  return (
    <AboutSection id="about">
      <Container>
        <SectionTitle>About Me</SectionTitle>
        
        <AboutContent>
          <AboutText>
            <p>
              I'm a passionate developer with skills in a variety of technologies.
              I enjoy getting lost in learning and applying my skills to the fullest
              extent I can!
            </p>
            <p>
              My journey in technology began with a curiosity about how things work,
              which quickly evolved into a passion for creating and innovating. I've
              developed expertise in various programming languages and technologies,
              always striving to expand my knowledge and skills.
            </p>
            <p>
              When I'm not coding, I enjoy exploring modern fashion trends and finding
              creative ways to express myself. I believe that creativity and technical
              skill go hand in hand, and I bring both to every project I work on.
            </p>
          </AboutText>
          
          <SkillsContainer>
            <SkillsTitle>My Skills</SkillsTitle>
            <SkillsGrid>
              {skills.map((skill, index) => (
                <SkillBubble 
                  key={index}
                  style={{
                    borderColor: getCategoryColor(skill.category),
                    animationDelay: `${index * 0.05}s`,
                    boxShadow: `0 0 10px ${getCategoryColor(skill.category)}30`
                  }}
                >
                  {skill.name}
                </SkillBubble>
              ))}
            </SkillsGrid>
          </SkillsContainer>
        </AboutContent>
        
        <SectionDivider />
        
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <p style={{ fontSize: '1.2rem', color: '#c0c0c0', maxWidth: '800px', margin: '0 auto' }}>
            I'm particularly drawn to urban streetwear and minimalist aesthetics, finding inspiration in the fusion of comfort and bold expression.
          </p>
        </div>
        
        <ItemsGrid className="fashion-grid">
          {fashionImages.map((item, boxIndex) => (
            <ItemBox 
              key={boxIndex} 
              className="fashion-box"
              ref={el => { if (el) fashionBoxesRef.current[boxIndex] = el; }}
              height={item.height}
              mobileHeight={item.mobileHeight}
              minFloat={item.minFloat}
              maxFloat={item.maxFloat}
              animationDuration={item.animationDuration}
              animationDelay={item.animationDelay}
              onClick={() => toggleImageView(boxIndex, 'fashion')}
              style={{ cursor: 'pointer' }}
            >
              <SlidingImages 
                images={item.images} 
                boxIndex={boxIndex} 
                imageType="fashion" 
              />
            </ItemBox>
          ))}
        </ItemsGrid>
        
        <SectionDivider />
        
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <p style={{ fontSize: '1.2rem', color: '#c0c0c0', maxWidth: '800px', margin: '0 auto' }}>
            Beyond fashion, I enjoy discovering unique home decor pieces and functional appliances that blend artistry with practicality. These items represent the aesthetic style I'm drawn to.
          </p>
        </div>
        
        <ItemsGrid className="decor-grid">
          {decorImages.map((item, boxIndex) => (
            <ItemBox 
              key={boxIndex} 
              className="decor-box"
              ref={el => { if (el) decorBoxesRef.current[boxIndex] = el; }}
              height={item.height}
              mobileHeight={item.mobileHeight}
              minFloat={item.minFloat}
              maxFloat={item.maxFloat}
              animationDuration={item.animationDuration}
              animationDelay={item.animationDelay}
              onClick={() => toggleImageView(boxIndex, 'decor')}
              style={{ cursor: 'pointer' }}
            >
              <SlidingImages 
                images={item.images} 
                boxIndex={boxIndex} 
                imageType="decor" 
              />
            </ItemBox>
          ))}
        </ItemsGrid>
      </Container>
      
      {/* Overlay for enlarged images */}
      <ImageOverlay 
        className="overlay"
        visible={activeImage !== null} 
        onClick={() => setActiveImage(null)}
      >
        {activeImage && (
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '80%',
            maxWidth: '800px',
            maxHeight: '80vh',
            background: '#111',
            borderRadius: '10px',
            overflow: 'hidden',
            boxShadow: '0 0 30px rgba(0,0,0,0.8)'
          }}>
            <div style={{
              width: '100%',
              height: '0',
              paddingBottom: '75%',
              position: 'relative'
            }}>
              <img 
                src={`/images/${activeImage.type === 'fashion' 
                  ? fashionImages[activeImage.index].images[0] 
                  : decorImages[activeImage.index].images[0]}`} 
                alt="Enlarged view"
                style={{
                  position: 'absolute',
                  top: '0',
                  left: '0',
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
            </div>
          </div>
        )}
      </ImageOverlay>
    </AboutSection>
  );
};

export default About;