import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const NavContainer = styled.nav`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 100;
  display: flex;
  gap: 10px;
`;

const NavButton = styled(Link)`
  background: ${props => props.active ? '#d4af37' : 'rgba(27, 27, 27, 0.8)'};
  color: ${props => props.active ? '#000' : '#fff'};
  padding: 8px 15px;
  border-radius: 5px;
  text-decoration: none;
  font-weight: bold;
  backdrop-filter: blur(5px);
  border: 1px solid ${props => props.active ? '#d4af37' : 'rgba(212, 175, 55, 0.3)'};
  transition: all 0.3s ease;
  
  &:hover {
    background: #d4af37;
    color: #000;
    transform: translateY(-3px);
  }
`;

const HomeButton = styled(Link)`
  background: rgba(27, 27, 27, 0.8);
  color: #fff;
  padding: 8px 15px;
  border-radius: 5px;
  text-decoration: none;
  font-weight: bold;
  backdrop-filter: blur(5px);
  border: 1px solid rgba(212, 175, 55, 0.3);
  transition: all 0.3s ease;
  margin-right: 10px;
  
  &:hover {
    background: #d4af37;
    color: #000;
    transform: translateY(-3px);
  }
`;

const SimpleNav = () => {
  const location = useLocation();
  const path = location.pathname;
  
  return (
    <NavContainer>
      <HomeButton to="/">Home</HomeButton>
      <NavButton to="/about" active={path === '/about'}>About</NavButton>
      <NavButton to="/projects" active={path === '/projects'}>Projects</NavButton>
      <NavButton to="/contact" active={path === '/contact'}>Contact</NavButton>
    </NavContainer>
  );
};

export default SimpleNav;