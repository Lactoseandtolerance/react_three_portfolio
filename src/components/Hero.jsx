import React from 'react';
import styled from 'styled-components';

const HeroContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  position: relative;
  overflow: hidden;
  padding-top: 60px;
`;

const HeroContent = styled.div`
  z-index: 2;
  position: relative;
  max-width: 800px;
  padding: 30px;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 10px;
  backdrop-filter: blur(8px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(212, 175, 55, 0.3);
`;

const Title = styled.h1`
  font-size: 4.5rem;
  color: #d4af37;
  margin-bottom: 1rem;
  font-weight: bold;
  text-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  
  @media (max-width: 768px) {
    font-size: 3rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.8rem;
  color: #c0c0c0;
  margin-bottom: 2rem;
  max-width: 800px;
  
  @media (max-width: 768px) {
    font-size: 1.4rem;
  }
`;

const ScrollIndicator = styled.div`
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  color: #fff;
  font-size: 1rem;
  
  &::after {
    content: '';
    display: block;
    width: 20px;
    height: 20px;
    border-right: 2px solid #fff;
    border-bottom: 2px solid #fff;
    transform: rotate(45deg);
    margin: 10px auto;
    animation: scrollDown 2s infinite;
  }
  
  @keyframes scrollDown {
    0% {
      opacity: 0;
      transform: rotate(45deg) translate(-5px, -5px);
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0;
      transform: rotate(45deg) translate(5px, 5px);
    }
  }
`;

const Hero = () => {
  return (
    <HeroContainer id="hero">
      <HeroContent>
        <Title>Angel Nivar</Title>
        <Subtitle>Exploring the infinite possibilities of technology.</Subtitle>
        <Subtitle>Welcome to my portfolio</Subtitle>
      </HeroContent>
      
      <ScrollIndicator>Scroll to learn more</ScrollIndicator>
    </HeroContainer>
  );
};

export default Hero;