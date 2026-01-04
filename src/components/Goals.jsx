import React from 'react';
import styled from 'styled-components';

const GoalsSection = styled.section`
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
`;

const SectionTitle = styled.h2`
  font-size: 3rem;
  color: #d4af37;
  margin-bottom: 2.5rem;
  text-align: center;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const GoalsHero = styled.div`
  margin-bottom: 4rem;
  text-align: center;
  max-width: 900px;
  margin: 0 auto 4rem;
  
  p {
    font-size: 1.25rem;
    line-height: 1.8;
    color: #d4d4d4;
    margin-bottom: 1rem;
  }
  
  strong {
    color: #00e676;
    font-weight: 600;
  }
`;

const GoalsContent = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
  margin-bottom: 5rem;
  background: rgba(17, 17, 17, 0.7);
  border-radius: 15px;
  padding: 3rem;
  border: 1px solid #333;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const GoalsCard = styled.div`
  background: #111;
  border-radius: 10px;
  padding: 2rem;
  border: 1px solid #333;
  height: 100%;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.4);
    border-color: ${props => props.accentColor || '#d4af37'};
  }
`;

const GoalsTitle = styled.h3`
  font-size: 1.8rem;
  color: ${props => props.color || '#d4af37'};
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 10px;
  }
`;

const GoalsList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const GoalItem = styled.li`
  margin-bottom: 1.5rem;
  padding-left: 2rem;
  position: relative;
  color: #d4d4d4;
  font-size: 1.1rem;
  line-height: 1.6;
  
  &:before {
    content: "→";
    position: absolute;
    left: 0;
    color: ${props => props.color || '#d4af37'};
    font-weight: bold;
  }
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const TimelineSection = styled.div`
  margin-top: 5rem;
  position: relative;
`;

const TimelineTitle = styled.h3`
  font-size: 2.2rem;
  color: #d4af37;
  margin-bottom: 3rem;
  text-align: center;
  
  &:after {
    content: '';
    display: block;
    width: 100px;
    height: 3px;
    background: linear-gradient(90deg, transparent, #d4af37, transparent);
    margin: 15px auto 0;
  }
`;

const Timeline = styled.div`
  position: relative;
  max-width: 950px;
  margin: 0 auto;
  
  &:before {
    content: '';
    position: absolute;
    width: 4px;
    background: linear-gradient(180deg, #00e676, #d4af37, #00a1ff, #ff6b6b, #00e676, #d4af37);
    top: 0;
    bottom: 0;
    left: 50%;
    margin-left: -2px;
    border-radius: 4px;
    
    @media (max-width: 768px) {
      left: 31px;
    }
  }
`;

const TimelineItem = styled.div`
  padding: 0;
  position: relative;
  width: 50%;
  box-sizing: border-box;
  left: ${props => props.side === 'left' ? '0' : '50%'};
  margin-bottom: 0;
  
  @media (max-width: 768px) {
    width: 100%;
    padding-left: 60px;
    left: 0;
    margin-bottom: 20px;
  }
`;

const TimelineContent = styled.div`
  padding: 20px;
  background: rgba(27, 27, 27, 0.8);
  backdrop-filter: blur(5px);
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  border-left: 4px solid ${props => props.color || '#d4af37'};
  transition: all 0.3s ease;
  margin: ${props => props.side === 'left' ? '0 20px 20px 0' : '0 0 20px 20px'};
  position: relative;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);
    background: rgba(35, 35, 35, 0.9);
  }
  
  @media (max-width: 768px) {
    margin: 0 0 20px 0;
  }
`;

const TimelineDate = styled.div`
  display: inline-block;
  font-weight: bold;
  color: ${props => props.color || '#00e676'};
  margin-bottom: 0.5rem;
  font-size: 1rem;
  padding: 3px 12px;
  border-radius: 15px;
  background: ${props => props.color ? `${props.color}15` : 'rgba(0, 230, 118, 0.1)'};
  border: 1px solid ${props => props.color ? `${props.color}30` : 'rgba(0, 230, 118, 0.3)'};
`;

const TimelineItemTitle = styled.h4`
  font-size: 1.4rem;
  margin: 0.6rem 0;
  color: #f0f0f0;
`;

const TimelineDesc = styled.p`
  color: #d4d4d4;
  line-height: 1.6;
  margin: 0;
  font-size: 0.95rem;
`;

const TimelineDot = styled.div`
  position: absolute;
  width: 16px;
  height: 16px;
  background-color: ${props => props.color || '#d4af37'};
  border-radius: 50%;
  left: ${props => props.side === 'left' ? 'auto' : '0'};
  right: ${props => props.side === 'left' ? '0' : 'auto'};
  top: 25px;
  z-index: 1;
  box-shadow: 0 0 8px ${props => props.color || '#d4af37'};
  transform: ${props => props.side === 'left' ? 'translateX(50%)' : 'translateX(-50%)'};
  
  @media (max-width: 768px) {
    left: 25px;
    right: auto;
    transform: translateX(-50%);
  }
`;

const BlankMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
`;

const MessageText = styled.p`
  font-size: 1.8rem;
  color: #d4af37;
  font-weight: 300;
  letter-spacing: 2px;
  
  @media (max-width: 768px) {
    font-size: 1.3rem;
  }
`;

const Goals = () => {
  return (
    <GoalsSection id="goals">
      <BlankMessage>
        <MessageText>Coming Soon...</MessageText>
      </BlankMessage>
    </GoalsSection>
  );
};

export default Goals;