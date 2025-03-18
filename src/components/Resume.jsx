import React, { useState } from 'react';
import styled from 'styled-components';

const ResumeSection = styled.section`
  min-height: 100vh;
  padding: 80px 20px;
  position: relative;
  background-color: #0c0c0c;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SectionTitle = styled.h2`
  font-size: 3rem;
  color: #d4af37;
  margin-bottom: 2rem;
  text-align: center;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const ResumeIntro = styled.div`
  text-align: center;
  max-width: 800px;
  margin-bottom: 3rem;
  
  p {
    font-size: 1.2rem;
    line-height: 1.8;
    color: #d4d4d4;
  }
`;

const ResumeContainer = styled.div`
  width: 100%;
  max-width: 900px;
  height: 700px;
  margin: 0 auto;
  background: #1b1b1b;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  position: relative;
  
  @media (max-width: 768px) {
    height: 500px;
  }
`;

const PDFEmbed = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
  background-color: #ffffff;
`;

const DownloadButton = styled.a`
  display: inline-block;
  margin-top: 2rem;
  padding: 1rem 2rem;
  background: #d4af37;
  color: #000;
  text-decoration: none;
  font-weight: bold;
  border-radius: 5px;
  transition: all 0.3s ease;
  
  &:hover {
    background: #a98c37;
    transform: translateY(-3px);
  }
  
  &:active {
    transform: translateY(1px);
  }
`;

const DebugInfo = styled.div`
  margin: 1rem 0;
  padding: 1rem;
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 5px;
  border: 1px solid #555;
  color: #d4d4d4;
  text-align: left;
  font-size: 0.9rem;
  margin-top: 2rem;
  display: ${props => props.show ? 'block' : 'none'};
`;

const ErrorMessage = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #ff5252;
  font-size: 1.2rem;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.7);
  padding: 2rem;
  border-radius: 10px;
  max-width: 80%;
`;

const LoadingMessage = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #d4d4d4;
  font-size: 1.2rem;
`;

const Resume = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [debugMode, setDebugMode] = useState(false);
  
  // Path to your resume PDF
  const resumePath = process.env.PUBLIC_URL + "Pro-Resume - Angel Nivar .pdf";
  
  const handleLoadError = () => {
    setIsLoading(false);
    setHasError(true);
    console.error("Failed to load the PDF");
  };
  
  const toggleDebug = () => {
    setDebugMode(!debugMode);
  };
  
  return (
    <ResumeSection id="resume">
      <Container>
        <SectionTitle>My Resume</SectionTitle>
        
        <ResumeIntro>
          <p>
            Below you'll find my professional resume highlighting my skills, 
            experience, and qualifications. Feel free to download a copy for your records.
          </p>
        </ResumeIntro>
        
        <ResumeContainer>
          {isLoading && <LoadingMessage>Loading resume...</LoadingMessage>}
          {hasError && (
            <ErrorMessage>
              <p>Unable to load the resume PDF.</p>
              <p>Please ensure the PDF file is in the public folder.</p>
              <p>Click the download button below to view the resume.</p>
            </ErrorMessage>
          )}
          <PDFEmbed 
            src={resumePath}
            onLoad={() => setIsLoading(false)}
            onError={handleLoadError}
            title="Angel Nivar Resume"
            type="application/pdf"
          />
        </ResumeContainer>
        
        <DownloadButton 
          href={resumePath} 
          download="Angel_Nivar_Resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
        >
          Download Resume
        </DownloadButton>
        
        <div style={{ marginTop: '10px', textAlign: 'center' }}>
          <button 
            onClick={toggleDebug} 
            style={{ 
              background: 'none', 
              border: 'none', 
              color: '#777', 
              cursor: 'pointer',
              fontSize: '0.8rem',
              textDecoration: 'underline'
            }}
          >
            {debugMode ? 'Hide Debug Info' : 'Show Debug Info'}
          </button>
        </div>
        
        <DebugInfo show={debugMode}>
          <p>Resume Path: {resumePath}</p>
          <p>Loading State: {isLoading ? 'Loading' : 'Not Loading'}</p>
          <p>Error State: {hasError ? 'Error' : 'No Error'}</p>
          <p>Notes on PDF display:</p>
          <ul style={{ paddingLeft: '20px', marginTop: '10px' }}>
            <li>PDF must be in the public folder named "resume.pdf"</li>
            <li>Check your browser console for additional errors</li>
            <li>Some browsers have restrictions on iframe PDF embedding</li>
          </ul>
        </DebugInfo>
      </Container>
    </ResumeSection>
  );
};

export default Resume;