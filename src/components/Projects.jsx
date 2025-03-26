import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const ProjectsSection = styled.section`
  min-height: 100vh;
  padding: 80px 20px;
  position: relative;
  background-color: rgba(10, 10, 10, 0.3); // Changed from solid to semi-transparent
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
  margin-bottom: 3rem;
  text-align: center;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
    margin-bottom: 2rem;
  }
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 30px;
  margin-bottom: 40px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ProjectCard = styled.div`
  background: #1b1b1b;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(212, 175, 55, 0.1);
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 30px rgba(212, 175, 55, 0.2);
    border: 1px solid rgba(212, 175, 55, 0.3);
  }
`;

const ProjectMedia = styled.div`
  width: 100%;
  height: 220px;
  overflow: hidden;
  position: relative;
  
  video, img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }
  
  &:hover {
    video, img {
      transform: scale(1.05);
    }
  }
`;

const MediaOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, rgba(0,0,0,0) 70%, rgba(0,0,0,0.8) 100%);
`;

const ProjectInfo = styled.div`
  padding: 1.5rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const ProjectTitle = styled.h3`
  font-size: 1.6rem;
  color: #d4af37;
  margin-bottom: 1rem;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 40px;
    height: 3px;
    background: #d4af37;
  }
`;

const ProjectDescription = styled.p`
  margin-bottom: 1rem;
  line-height: 1.6;
  color: #d4d4d4;
  flex-grow: 1;
  
  /* Limit to 4 lines with ellipsis */
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const TechUsed = styled.div`
  margin: 1rem 0;
  color: #a0a0a0;
  font-size: 0.9rem;
  
  span {
    display: inline-block;
    background: rgba(212, 175, 55, 0.1);
    border: 1px solid rgba(212, 175, 55, 0.2);
    border-radius: 15px;
    padding: 4px 10px;
    margin-right: 8px;
    margin-bottom: 8px;
    color: #d4d4d4;
  }
`;

const ProjectLinks = styled.div`
  margin-top: auto;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  
  a {
    display: inline-block;
    margin-right: 1rem;
    color: #d4af37;
    font-weight: bold;
    text-decoration: none;
    padding: 8px 12px;
    border: 1px solid #d4af37;
    border-radius: 5px;
    transition: all 0.3s ease;
    
    &:hover {
      background: #d4af37;
      color: #000;
    }
  }
`;

const DetailModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.85);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  opacity: ${props => props.show ? '1' : '0'};
  visibility: ${props => props.show ? 'visible' : 'hidden'};
  transition: all 0.3s ease;
`;

const ModalContent = styled.div`
  background: #1b1b1b;
  border-radius: 10px;
  width: 100%;
  max-width: 900px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(212, 175, 55, 0.3);
  display: flex;
  flex-direction: column;
  
  @media (max-width: 768px) {
    max-height: 80vh;
  }
`;

const ModalHeader = styled.div`
  padding: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  h3 {
    font-size: 2rem;
    color: #d4af37;
    margin: 0;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: #d4d4d4;
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    color: #d4af37;
  }
`;

const ModalBody = styled.div`
  padding: 20px;
  
  .modal-media {
    width: 100%;
    height: 400px;
    margin-bottom: 20px;
    
    video, img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 5px;
    }
    
    @media (max-width: 768px) {
      height: 250px;
    }
  }
  
  p {
    line-height: 1.8;
    margin-bottom: 20px;
    color: #d4d4d4;
  }
`;

const ModalFooter = styled.div`
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 15px;
  }
`;

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [showModal, setShowModal] = useState(false);
  
  // Lock/unlock body scroll when modal opens/closes
  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showModal]);
  
  // Project data
  const projects = [
    {
      title: "What's Da Moov",
      description: "Ever been bored on a weekend with no idea what's going on nearby? That's why I built What's Da Moov! It's an app that helps you discover local events tailored just for you. I created a recommendation system that learns what you like and suggests events you'll actually want to attend. The app uses your location to find what's happening around you right now, and I made sure the interface is super easy to use with filters that help you find exactly what you're looking for. It was a fun challenge to build a backend that updates in real-time while keeping everyone's data secure.",
      tech: ["SQL", "Database Design", "HTML", "Python", "Flask"],
      media: { type: "video", src: "/assets/Whats_Da_Moov.mp4" },
      links: [{ text: "GitHub", url: "https://github.com/Lactoseandtolerance/What-s-Da-Moov" }]
    },
    {
      title: "Video Surveillance Technique Enhancement",
      description: "This project was my deep dive into computer vision! I wanted to see if I could make surveillance cameras smarter at detecting and tracking objects in real-time. I played around with some really cool techniques like shape context descriptors (which help computers recognize objects from their outlines) and adaptive background mixtures (which help separate moving objects from the background). The most satisfying part was seeing the system successfully track people and objects even when the lighting changed or things got partially hidden. It's like teaching a computer to see the way we do - definitely challenging but incredibly rewarding when it works!",
      tech: ["Python", "OpenCV", "Machine Learning", "Data Processing"],
      media: { type: "video", src: "/assets/Video_Surveillance_Output.mp4" },
      links: [{ text: "GitHub", url: "https://github.com/Lactoseandtolerance/Video-Surveilance-Technique" }]
    },
    {
      title: "Machine Learning Anime Recommendation Algorithm",
      description: "As an anime fan, I got tired of spending hours searching for new shows to watch, so I built my own recommendation system! I created this tool that suggests anime based on what you've already enjoyed. The cool part is that it works in two ways - it can find shows similar to ones you like (content-based filtering) and also recommend shows that people with similar taste enjoyed (collaborative filtering). I had to wrangle some pretty massive datasets, which was a fun challenge. I also built a simple interface with Tkinter so you can just input your favorite shows and get personalized recommendations right away. No more scrolling endlessly through streaming platforms!",
      tech: ["Python", "Pandas", "Scikit-learn", "SQL", "Tkinter", "Collaborative Filtering", "Content-Based Filtering"],
      media: { type: "image", src: "/images/wip.png" },
      links: [{ text: "GitHub", url: "https://github.com/Lactoseandtolerance/Anime-Rec-Systems" }]
    },
    {
      title: "Straight A's or Straight Time",
      description: "Have you ever wondered what really makes a neighborhood 'good'? My team and I were curious about how school quality and crime rates affect housing prices, so we built this tool to help home buyers make smarter decisions. We gathered data from multiple sources like Zillow and crime databases, then created visualizations that show the relationship between these factors. The coolest part was building interactive maps that let you see the 'sweet spots' – neighborhoods with good schools and low crime rates that are still affordable! I even built prediction models that can estimate how home values might change over time. This project was a fun way to apply data science to a real-world problem that affects so many people's biggest life investment.",
      tech: ["Python", "Pandas", "Scikit-learn", "Geospatial Analysis", "Tableau", "Data Visualization", "API Integration"],
      media: { type: "image", src: "/images/wip.png" },
      links: [{ text: "GitHub", url: "https://github.com/yourusername/home-sweet-home" }]
    },
    {
      title: "Academic Success Strategies",
      description: "I've always been fascinated by how some students seem to ace their classes without pulling all-nighters! So I designed this research project to uncover the most effective study methods. I created surveys and collected data from students across different majors, then used Python to analyze what actually works. The findings were eye-opening – things like spaced repetition and teaching concepts to others came out on top, while cramming the night before (surprise!) wasn't so effective. I built some beautiful visualizations in Tableau that made these patterns really clear. The most rewarding part was presenting these insights to an academic panel and seeing them consider implementing some of these strategies in their teaching approaches!",
      tech: ["Python", "Excel", "Tableau", "PowerPoint", "Data Analysis", "Survey Design"],
      media: { type: "image", src: "/images/wip.png" },
      links: [{ text: "View Presentation", url: "https://yourdomain.com/academic-strategies-presentation" }]
    },
    {
      title: "OffVibe: Audio-Based Music Recommender",
      description: "As a music lover, I was frustrated with how streaming platforms kept recommending the same popular songs. So I built OffVibe to change that! Instead of just looking at what's trending, my system analyzes the actual musical elements of songs – things like tempo, key, energy level, and danceability. I tapped into Spotify's API to grab these audio features and built a recommendation engine that focuses 80% on the music itself and just 20% on user behavior. What I'm most proud of is how this helps independent artists get discovered based on their sound, not just their streaming numbers. It's perfect for DJs looking for mixable tracks or anyone wanting to discover hidden gems that match their taste. The dashboard I created lets you input any song and instantly get recommendations based on its musical DNA!",
      tech: ["Python", "Spotify API", "Machine Learning", "Content-Based Filtering", "Collaborative Filtering", "Web Development"],
      media: { type: "image", src: "/images/wip.png" },
      links: [{ text: "Demo", url: "https://yourdomain.com/offvibe-demo" }, { text: "GitHub", url: "https://github.com/yourusername/offvibe" }]
    },
    {
      title: "cloudcover: Cloud-Based Energy Forecasting",
      description: "Climate change has me thinking a lot about renewable energy, so I developed this cloud-based forecasting system for solar power generation! The problem is pretty interesting – solar energy is great, but it's unpredictable because of weather changes. I built a machine learning model that uses weather data to predict how much power solar plants will generate in the coming hours and days. The system pulls data from NASA and weather APIs, stores everything in AWS, and runs predictions automatically. What makes this project special is how it helps grid operators balance energy distribution more efficiently, reducing waste and costs. I'm particularly proud of getting the prediction accuracy within 10% of actual values – which might not sound impressive until you realize how chaotic weather patterns can be!",
      tech: ["AWS", "Python", "Machine Learning", "Time Series Analysis", "API Integration", "Flask"],
      media: { type: "image", src: "/images/wip.png" },
      links: [{ text: "Live Demo", url: "https://yourdomain.com/solarcast-demo" }, { text: "GitHub", url: "https://github.com/Lactoseandtolerance/solar_forecast_azure" }]
    }
  ];
  
  // Reverse the projects array for display
  const reversedProjects = [...projects].reverse();
  
  const openProjectDetails = (project) => {
    setSelectedProject(project);
    setShowModal(true);
  };
  
  const closeModal = () => {
    setShowModal(false);
  };
  
  return (
    <ProjectsSection id="projects">
      <Container>
        <SectionTitle>My Projects</SectionTitle>
        
        <ProjectsGrid>
          {reversedProjects.map((project, index) => (
            <ProjectCard key={index} onClick={() => openProjectDetails(project)}>
              <ProjectMedia>
                {project.media.type === 'video' ? (
                  <video src={project.media.src} autoPlay muted loop />
                ) : (
                  <img src={project.media.src} alt={project.title} />
                )}
                <MediaOverlay />
              </ProjectMedia>
              
              <ProjectInfo>
                <ProjectTitle>{project.title}</ProjectTitle>
                <ProjectDescription>{project.description}</ProjectDescription>
                
                <TechUsed>
                  {project.tech.slice(0, 4).map((tech, techIndex) => (
                    <span key={techIndex}>{tech}</span>
                  ))}
                  {project.tech.length > 4 && <span>+{project.tech.length - 4} more</span>}
                </TechUsed>
                
                <ProjectLinks> 
                  <a 
                    onClick={(e) => {
                      e.stopPropagation();
                      openProjectDetails(project);
                    }}
                  >
                    View Details
                  </a>
                </ProjectLinks>
              </ProjectInfo>
            </ProjectCard>
          ))}
        </ProjectsGrid>
        
        {/* Project Details Modal */}
        <DetailModal show={showModal} onClick={closeModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            {selectedProject && (
              <>
                <ModalHeader>
                  <h3>{selectedProject.title}</h3>
                  <CloseButton onClick={closeModal}>×</CloseButton>
                </ModalHeader>
                
                <ModalBody>
                  <div className="modal-media">
                    {selectedProject.media.type === 'video' ? (
                      <video src={selectedProject.media.src} controls autoPlay muted />
                    ) : (
                      <img src={selectedProject.media.src} alt={selectedProject.title} />
                    )}
                  </div>
                  
                  <p>{selectedProject.description}</p>
                  
                  <TechUsed>
                    <h4 style={{ color: '#d4af37', marginBottom: '10px' }}>Technologies Used:</h4>
                    {selectedProject.tech.map((tech, techIndex) => (
                      <span key={techIndex}>{tech}</span>
                    ))}
                  </TechUsed>
                </ModalBody>
                
                <ModalFooter>
                  <div style={{ color: '#a0a0a0' }}>Click outside to close</div>
                  
                  <ProjectLinks>
                    {selectedProject.links.map((link, linkIndex) => (
                      <a 
                        key={linkIndex} 
                        href={link.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {link.text}
                      </a>
                    ))}
                  </ProjectLinks>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </DetailModal>
      </Container>
    </ProjectsSection>
  );
};

export default Projects;