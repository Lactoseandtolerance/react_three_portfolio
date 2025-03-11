import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  padding: 2rem 0;
  text-align: center;
  position: relative;
  z-index: 1;
  background-color: rgba(8, 8, 8, 0.5); // Changed from solid to semi-transparent
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const Copyright = styled.p`
  font-size: 1rem;
  color: #a0a0a0;
`;

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <FooterContainer>
      <FooterContent>
        <Copyright>
          &copy; {currentYear} Angel Nivar. All Rights Reserved.
        </Copyright>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;