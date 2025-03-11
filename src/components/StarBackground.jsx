import React from 'react';
import styled, { keyframes } from 'styled-components';

// Animation for stars
const animStar = keyframes`
  from {
    transform: translateY(0px);
  }
  to {
    transform: translateY(-2000px);
  }
`;

// Container for the star background
const StarContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  background: linear-gradient(to bottom, #000000 0%, #050510 100%);
  overflow: hidden;
`;

// Base star styling
const Stars = styled.div`
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  background: transparent;
  box-shadow: ${props => props.shadow};
  animation: ${animStar} ${props => props.duration}s linear infinite;
  
  &:after {
    content: " ";
    position: absolute;
    top: 2000px;
    width: ${props => props.size}px;
    height: ${props => props.size}px;
    background: transparent;
    box-shadow: ${props => props.shadow};
  }
`;

// Create a star field with a specific size and count
const createStarField = (size, count, color, duration) => {
  // Generate shadows for the stars
  let shadows = '';
  for (let i = 0; i < count; i++) {
    const x = Math.floor(Math.random() * 2000);
    const y = Math.floor(Math.random() * 2000);
    shadows += `${x}px ${y}px ${color}, `;
  }
  
  // Remove trailing comma and space
  shadows = shadows.slice(0, -2);
  
  return <Stars size={size} shadow={shadows} duration={duration} />;
};

const AdvancedStarBackground = () => {
  return (
    <StarContainer>
      {/* Small white stars */}
      {createStarField(1, 500, '#FFF', 150)}
      
      {/* Medium white stars */}
      {createStarField(2, 200, '#FFF', 200)}
      
      {/* Gold stars to match the theme */}
      {createStarField(1, 100, '#d4af37', 175)}
      {createStarField(2, 50, '#d4af37', 225)}
      
      {/* Blue stars to add variety */}
      {createStarField(1, 100, '#4169E1', 180)}
      {createStarField(2, 50, '#87CEEB', 210)}
    </StarContainer>
  );
};

export default AdvancedStarBackground;