import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import { OrbitControls, Sphere, Stars, Html, Cloud } from '@react-three/drei';
import { useNavigate } from 'react-router-dom';
import * as THREE from 'three';
import styled from 'styled-components';

const NavigationContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 10;
  background: #000; /* Dark background */
`;

const HeroContent = styled.div`
  position: absolute;
  width: 100%;
  text-align: center;
  z-index: 5;
  
  h1 {
    font-size: 4rem;
    color: #d4af37;
    margin-bottom: 1rem;
    font-weight: bold;
    text-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    
    @media (max-width: 768px) {
      font-size: 3rem;
    }
  }
  
  p {
    font-size: 1.5rem;
    color: #ffffff;
    text-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    
    @media (max-width: 768px) {
      font-size: 1.2rem;
    }
  }
`;

const TopContent = styled(HeroContent)`
  top: 10%;
  
  h1 {
    font-size: 5rem;
    background: linear-gradient(45deg, #d4af37, #FFF8E1);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: float 4s ease-in-out infinite;
    
    @media (max-width: 768px) {
      font-size: 3.5rem;
    }
  }
  
  @keyframes float {
    0% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-15px);
    }
    100% {
      transform: translateY(0px);
    }
  }
`;

const BottomContent = styled(HeroContent)`
  bottom: 15%;
  
  p {
    font-size: 1.8rem;
    font-weight: 300;
    letter-spacing: 2px;
    color: #e0e0e0;
    text-shadow: 0 0 15px rgba(0, 0, 0, 0.8);
    opacity: 0.9;
    max-width: 800px;
    margin: 0 auto;
    animation: fadeInUp 2s ease-out, pulse 4s ease-in-out infinite;
    
    @media (max-width: 768px) {
      font-size: 1.4rem;
    }
  }
  
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 0.9;
      transform: translateY(0);
    }
  }
  
  @keyframes pulse {
    0% {
      opacity: 0.9;
    }
    50% {
      opacity: 0.7;
    }
    100% {
      opacity: 0.9;
    }
  }
`;

// Earth with continents and navigation points
const Earth = ({ setHoveredSection }) => {
  const globeRef = useRef();
  const navigate = useNavigate();
  
  // Load Earth textures
  const [earthMap, earthBump, earthSpec, earthNormal, cloudMap] = useLoader(THREE.TextureLoader, [
    '/earth_daymap.jpg',    // Color texture
    '/earth_normal_map.jpg', // Normal map for terrain
    '/earth_specular_map.jpg', // Specular highlights
    '/earth_bump.jpg',       // Bump map for terrain
    '/earth_clouds.png'      // Cloud layer
  ]);
  
  // Auto rotation - changed direction to mirror actual Earth rotation (west to east)
  useFrame((state, delta) => {
    if (globeRef.current) {
      globeRef.current.rotation.y -= 0.001; // Negative value for counterclockwise rotation
    }
  });
  
  // Function to convert latitude/longitude to 3D coordinates on a sphere
  const latLongToVector3 = (lat, lon, radius) => {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);
    
    const x = -(radius * Math.sin(phi) * Math.cos(theta));
    const z = (radius * Math.sin(phi) * Math.sin(theta));
    const y = (radius * Math.cos(phi));
    
    return [x, y, z];
  };
  
  // Navigation points positioned at specific cities with precise coordinates
  // Atlanta: 33.7490° N, 84.3880° W
  // Nairobi: 1.2921° S, 36.8219° E
  // Tokyo: 35.6762° N, 139.6503° E
  const navigationPoints = [
    { 
      section: 'about', 
      label: 'About', 
      position: latLongToVector3(33.7490, -84.3880, 1.5),  // Atlanta
      rotation: [0, 0, 0]
    },
    { 
      section: 'projects', 
      label: 'Projects', 
      position: latLongToVector3(-1.2921, 36.8219, 1.5),  // Nairobi
      rotation: [0, 0, 0]
    },
    { 
      section: 'contact', 
      label: 'Contact', 
      position: latLongToVector3(35.6762, 139.6503, 1.5),  // Tokyo
      rotation: [0, 0, 0]
    }
  ];
  
  // Create a custom star field with colorful stars
  useEffect(() => {
    // Function to create a randomized star with a specific color
    const createColoredStar = (color, size, scene) => {
      const starGeometry = new THREE.SphereGeometry(Math.random() * size, 8, 8);
      const starMaterial = new THREE.MeshBasicMaterial({ color: color });
      const star = new THREE.Mesh(starGeometry, starMaterial);
      
      // Random position
      star.position.x = Math.random() * 2000 - 1000;
      star.position.y = Math.random() * 2000 - 1000;
      star.position.z = Math.random() * 2000 - 1000;
      
      scene.add(star);
      return star;
    };
    
    // Add custom stars effect
    const addCustomStars = () => {
      const scene = globeRef.current?.parent;
      if (!scene) return;
      
      // Create stars with various colors
      const stars = [];
      
      // Create blue stars
      for (let i = 0; i < 50; i++) {
        stars.push(createColoredStar(0x4169E1, 0.2, scene)); // Royal Blue
      }
      
      // Create purple stars
      for (let i = 0; i < 30; i++) {
        stars.push(createColoredStar(0x9370DB, 0.25, scene)); // Medium Purple
      }
      
      // Create red stars
      for (let i = 0; i < 20; i++) {
        stars.push(createColoredStar(0xFF6347, 0.15, scene)); // Tomato
      }
      
      // Create gold stars
      for (let i = 0; i < 40; i++) {
        stars.push(createColoredStar(0xFFD700, 0.18, scene)); // Gold
      }
      
      // Create cyan stars
      for (let i = 0; i < 25; i++) {
        stars.push(createColoredStar(0x00FFFF, 0.22, scene)); // Cyan
      }
      
      // Animate the stars with pulsing effect
      const clock = new THREE.Clock();
      const animate = () => {
        const time = clock.getElapsedTime();
        
        stars.forEach((star, i) => {
          // Pulse size
          const scale = 0.8 + Math.sin(time * 0.5 + i) * 0.3;
          star.scale.set(scale, scale, scale);
          
          // Subtle position shift
          star.position.y += Math.sin(time * 0.2 + i * 0.01) * 0.02;
        });
        
        requestAnimationFrame(animate);
      };
      
      animate();
    };
    
    // Delay adding custom stars to ensure the scene is ready
    const timeout = setTimeout(() => {
      addCustomStars();
    }, 500);
    
    return () => clearTimeout(timeout);
  }, []);
  
  return (
    <>
      {/* Star field background - bright and static */}
      <Stars 
        radius={100} 
        depth={70}
        count={10000}
        factor={10}
        saturation={2.5}
        fade={false} /* Turned off fade effect */
        speed={0} /* Turned off animation */
      />
      
      {/* Removed nebulae effects that were creating large blue circles */}
      
      {/* Subtle cosmic dust effect - reduced size and opacity */}
      <Cloud
        position={[-30, -10, -50]}
        opacity={0.07}
        speed={0.05}
        width={20}
        depth={5}
        segments={10}
        color="#ffaa44"
      />
      
      {/* Earth sphere with realistic textures */}
      <group ref={globeRef}>
        {/* Main Earth sphere - brighter with more glow */}
        <Sphere args={[1.5, 64, 64]}>
          <meshPhongMaterial
            map={earthMap}
            bumpMap={earthBump}
            bumpScale={0.08} /* Increased from 0.05 for more pronounced terrain */
            specularMap={earthSpec}
            normalMap={earthNormal}
            normalScale={new THREE.Vector2(3, 3)} /* Increased from 2,2 */
            shininess={25} /* Increased from 15 for more shine */
            specular={new THREE.Color(0x666666)} /* Brighter specular highlights */
            emissive={new THREE.Color(0x223366)} /* Bluer emissive color */
            emissiveIntensity={0.4} /* Increased from 0.2 */
          />
        </Sphere>
        
        {/* Cloud layer */}
        <Sphere args={[1.53, 64, 64]}>  {/* Adjusted for new Earth size */}
          <meshPhongMaterial
            map={cloudMap}
            transparent={true}
            opacity={0.4}
            depthWrite={false}
            side={THREE.DoubleSide}
          />
        </Sphere>
        
        {/* Navigation points fixed to the globe's surface */}
        {navigationPoints.map((point, index) => (
          <group key={index} position={point.position} rotation={point.rotation}>
            {/* Clickable point */}
            <mesh
              onPointerOver={() => setHoveredSection(point.section)}
              onPointerOut={() => setHoveredSection(null)}
              onClick={() => navigate(`/${point.section}`)}
            >
              <sphereGeometry args={[0.15, 16, 16]} />
              <meshStandardMaterial
                color="#d4af37"
                emissive="#d4af37"
                emissiveIntensity={0.5}
              />
            </mesh>
            
            {/* Label - extra large text for maximum visibility */}
            <Html
              position={[0, 0.3, 0]}
              center
              distanceFactor={1.5}
              style={{
                color: '#ffd700', /* Bright gold */
                fontWeight: 'bold',
                fontSize: '42px', /* Dramatically increased from 32px to 42px */
                userSelect: 'none',
                textShadow: '0 0 20px rgba(0,0,0,1), 0 0 30px rgba(0,0,0,0.9), 0 0 5px rgba(255,215,0,0.5)', /* Added gold glow */
                fontFamily: "'Roboto Mono', monospace",
                letterSpacing: '1px'
              }}
            >
              {point.label}
            </Html>
          </group>
        ))}
      </group>
      
      {/* Lighting for the Earth - much brighter */}
      <ambientLight intensity={0.8} />
      <directionalLight
        position={[5, 3, 5]}
        intensity={2}
        castShadow
        color={new THREE.Color(0xffffff)}
      />
      <pointLight position={[-10, 0, -10]} intensity={1} color={new THREE.Color(0x3366ff)} />
      
      {/* Additional light sources for dramatic effect */}
      <pointLight position={[8, -8, 5]} intensity={0.6} color={new THREE.Color(0xff9900)} />
      <spotLight position={[-5, 5, -5]} intensity={0.8} angle={0.5} color={new THREE.Color(0xccddff)} />
    </>
  );
};

// Main Navigation component
const Navigation = () => {
  const [hoveredSection, setHoveredSection] = useState(null);
  const controlsRef = useRef();
  
  return (
    <NavigationContainer>
      <TopContent>
        <h1>Angel Nivar</h1>
      </TopContent>
      
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <Earth setHoveredSection={setHoveredSection} />
        <OrbitControls
          ref={controlsRef}
          enableZoom={false}
          enablePan={false}
          rotateSpeed={0.3}
          autoRotate={true}
          autoRotateSpeed={-0.5} // Negative value for counterclockwise rotation
          enableDamping={true}
          dampingFactor={0.05}
        />
      </Canvas>
      
      <BottomContent>
        <p>Exploring the infinite possibilities of technology</p>
      </BottomContent>
    </NavigationContainer>
  );
};

export default Navigation;