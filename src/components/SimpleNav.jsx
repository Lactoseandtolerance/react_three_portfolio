import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const NavContainer = styled.nav`
  position: fixed;
  top: 30px;
  right: 30px;
  z-index: 100;
`;

const DropdownButton = styled.button`
  background: rgba(27, 27, 27, 0.8);
  color: #d4af37;
  padding: 10px 15px;
  border-radius: 5px;
  border: 1px solid rgba(212, 175, 55, 0.5);
  backdrop-filter: blur(10px);
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(212, 175, 55, 0.3);
  }
  
  svg {
    transition: transform 0.3s ease;
    transform: ${props => props.isOpen ? 'rotate(180deg)' : 'rotate(0)'};
  }
`;

const DropdownContent = styled.div`
  position: absolute;
  top: 45px;
  right: 0;
  background: rgba(27, 27, 27, 0.95);
  border-radius: 5px;
  border: 1px solid rgba(212, 175, 55, 0.5);
  backdrop-filter: blur(10px);
  width: 150px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  opacity: ${props => (props.isOpen ? '1' : '0')};
  transform: translateY(${props => (props.isOpen ? '0' : '-10px')});
  pointer-events: ${props => (props.isOpen ? 'auto' : 'none')};
  transition: all 0.3s ease;
  z-index: 25;
`;

const DropdownItem = styled(Link)`
  display: block;
  padding: 12px 15px;
  color: #fff;
  text-decoration: none;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${props => props.hovercolor ? `${props.hovercolor}33` : 'rgba(212, 175, 55, 0.3)'};
    color: ${props => props.hovercolor || '#d4af37'};
  }
`;

const ExternalDropdownItem = styled.a`
  display: block;
  padding: 12px 15px;
  color: #fff;
  text-decoration: none;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${props => props.hovercolor ? `${props.hovercolor}33` : 'rgba(212, 175, 55, 0.3)'};
    color: ${props => props.hovercolor || '#d4af37'};
  }
`;

const SimpleNav = () => {
  const location = useLocation();
  const path = location.pathname;
  const [dropdownOpen, setDropdownOpen] = useState(false);
  
  return (
    <NavContainer>
      <DropdownButton 
        isOpen={dropdownOpen}
        onClick={() => setDropdownOpen(!dropdownOpen)}
      >
        Menu
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
          <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
        </svg>
      </DropdownButton>
      
      <DropdownContent isOpen={dropdownOpen}>
        <DropdownItem to="/" hovercolor="#d4af37">Home</DropdownItem>
        <DropdownItem to="/about" hovercolor="#d4af37">About</DropdownItem>
        <DropdownItem to="/projects" hovercolor="#d4af37">Projects</DropdownItem>
        <DropdownItem to="/goals" hovercolor="#00e676">Goals</DropdownItem>
        <DropdownItem to="/resume" hovercolor="#00e676">Resume</DropdownItem>
        <DropdownItem to="/contact" hovercolor="#ff6b6b">Contact</DropdownItem>
        <ExternalDropdownItem 
          href="https://github.com/Lactoseandtolerance" 
          target="_blank" 
          rel="noopener noreferrer" 
          hovercolor="#2464eb"
        >
          GitHub
        </ExternalDropdownItem>
        <ExternalDropdownItem 
          href="https://www.linkedin.com/in/angel-nivar-a00740275/" 
          target="_blank" 
          rel="noopener noreferrer" 
          hovercolor="#0077b5"
        >
          LinkedIn
        </ExternalDropdownItem>
      </DropdownContent>
    </NavContainer>
  );
};

export default SimpleNav;