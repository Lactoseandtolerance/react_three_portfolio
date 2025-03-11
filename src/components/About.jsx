import React, { useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';

// Main section with scroll enabled
const AboutSection = styled.section`
  min-height: 100vh;
  padding: 80px 20px;
  position: relative;
  background-color: rgba(12, 12, 12, 0.3); // Changed from solid to semi-transparent
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

// Fashion grid with improved randomization
const FashionGrid = styled.div`
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

const FashionBox = styled.div`
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

const SlideImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  transition: opacity 1.5s ease-in-out;
  opacity: 0;
  
  &.active {
    opacity: 1;
  }
`;

// New interactive polaroid gallery
const GallerySection = styled.div`
  position: relative;
  margin: 5rem 0;
  padding: 2rem 0;
  text-align: center;
`;

const GalleryTitle = styled.h3`
  font-size: 2rem;
  color: #d4af37;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const PolaroidGallery = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 25px;
  perspective: 1000px;
`;

const rotatePolaroid = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Polaroid = styled.div`
  width: 220px;
  height: 260px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  padding: 15px 15px 40px 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  transform: ${props => `rotate(${props.rotation}deg)`};
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  cursor: pointer;
  position: relative;
  z-index: 1;
  
  &:hover {
    transform: translateY(-15px) rotate(0deg) scale(1.1);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.5), 0 0 30px rgba(212, 175, 55, 0.3);
    z-index: 10;
  }
  
  &.active {
    transform: scale(1.6) rotateY(0deg) !important;
    z-index: 20;
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.6), 0 0 40px rgba(212, 175, 55, 0.4);
  }
`;

const PolaroidImage = styled.div`
  width: 100%;
  height: 180px;
  background-color: #222;
  background-image: ${props => `url(${props.src})`};
  background-size: cover;
  background-position: center;
  margin-bottom: 10px;
`;

const PolaroidCaption = styled.p`
  font-family: 'Permanent Marker', cursive, sans-serif;
  color: #333;
  font-size: 0.9rem;
  text-align: center;
  transform: rotate(-2deg);
`;

const PolaroidOverlay = styled.div`
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

const About = () => {
  // States
  const [activePolaroid, setActivePolaroid] = useState(null);
  
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
  
  // Improved fashion images slideshow
  useEffect(() => {
    const fashionBoxes = document.querySelectorAll('.fashion-box');
    const intervals = [];
    
    fashionBoxes.forEach((box, boxIndex) => {
      const slides = box.querySelectorAll('.slide-image');
      if (slides.length < 2) return;
      
      // Initialize first slide
      slides[0].classList.add('active');
      
      // Set different transition delays for each box to create staggered effect
      const delay = 3000 + (boxIndex * 1500); // More random timing (3-9s)
      
      const slideInterval = setInterval(() => {
        // Find current active slide
        let currentIndex = 0;
        slides.forEach((slide, i) => {
          if (slide.classList.contains('active')) {
            currentIndex = i;
            slide.classList.remove('active');
          }
        });
        
        // Activate next slide
        const nextIndex = (currentIndex + 1) % slides.length;
        slides[nextIndex].classList.add('active');
      }, delay);
      
      intervals.push(slideInterval);
    });
    
    // Cleanup intervals on component unmount
    return () => intervals.forEach(interval => clearInterval(interval));
  }, []);
  
  // Close polaroid when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (activePolaroid !== null && e.target.classList.contains('overlay')) {
        setActivePolaroid(null);
      }
    };
    
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [activePolaroid]);
  
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
      images: ['Fashion7.jpg', 'Fashion1.jpg', 'Fashion2.jpg', 'Fashion3.jpg'],
      height: '300px',
      mobileHeight: '220px',
      minFloat: -4,
      maxFloat: 6,
      animationDuration: '10s',
      animationDelay: '1.1s'
    }
  ];
  
  // Gallery images - these would be your actual home decor images
  const galleryImages = [
    { src: "/images/cool1.jpg", caption: "unconvential coffee makers" },
    { src: "/images/cool2.jpg", caption: "faux-organic furniture" },
    { src: "/images/cool3.jpg", caption: "raw wood foundations" },
    { src: "/images/cool4.jpg", caption: "rounded spaces" },
    { src: "/images/cool5.jpg", caption: "eccentric pots" },
    { src: "/images/cool6.jpg", caption: "inviting workspaces" },
    { src: "/images/cool7.jpg", caption: "vegitation in werid places" },
    { src: "/images/cool8.jpg", caption: "ergonomic room layouts" }
  ];
  
  // Generate random rotation for polaroids
  const getRandomRotation = () => {
    return Math.floor(Math.random() * 16) - 8; // Between -8 and 8 degrees
  };
  
  // Toggle polaroid active state
  const togglePolaroid = (index) => {
    if (activePolaroid === index) {
      setActivePolaroid(null);
    } else {
      setActivePolaroid(index);
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
        
        <FashionGrid className="fashion-grid">
          {fashionImages.map((item, boxIndex) => (
            <FashionBox 
              key={boxIndex} 
              className="fashion-box"
              height={item.height}
              mobileHeight={item.mobileHeight}
              minFloat={item.minFloat}
              maxFloat={item.maxFloat}
              animationDuration={item.animationDuration}
              animationDelay={item.animationDelay}
            >
              {item.images.map((image, imageIndex) => (
                <SlideImage
                  key={imageIndex}
                  className={`slide-image ${imageIndex === 0 ? 'active' : ''}`}
                  style={{ backgroundImage: `url(/images/${image})` }}
                />
              ))}
            </FashionBox>
          ))}
        </FashionGrid>
        
        <SectionDivider />
        
        <GallerySection>
          <GalleryTitle>Organic Home Decor & Unique Appliances</GalleryTitle>
          
          <PolaroidGallery>
            {galleryImages.map((image, index) => (
              <Polaroid 
                key={index}
                rotation={getRandomRotation()}
                onClick={() => togglePolaroid(index)}
                className={activePolaroid === index ? 'active' : ''}
              >
                <PolaroidImage src={image.src} />
                <PolaroidCaption>{image.caption}</PolaroidCaption>
              </Polaroid>
            ))}
          </PolaroidGallery>
          
          {/* Overlay when a polaroid is active */}
          <PolaroidOverlay 
            className="overlay"
            visible={activePolaroid !== null} 
            onClick={() => setActivePolaroid(null)}
          />
        </GallerySection>
      </Container>
    </AboutSection>
  );
};

export default About;