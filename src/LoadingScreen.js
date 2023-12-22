import React, { useEffect, useState } from 'react';
import loadingBackground from './metaverse.jpg'; // Remplacez cela par le chemin de votre image de fond

const LoadingScreen = () => {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(rotation => (rotation + 1) % 360);
    }, 16);

    return () => clearInterval(interval);
  }, []);

  const containerStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: `url(${loadingBackground}) center center fixed`,
    backgroundSize: 'cover',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 999,  // Ajout de la propriété z-index
  };
  
  const headingStyle = {
    color: '#fff',
    marginBottom: '20px',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)', // Ombre du texte
  };
  
  const loaderStyle = {
    width: '40px',
    height: '40px',
    border: '4px solid #f3f3f3',
    borderTop: '4px solid #3498db',
    borderRadius: '50%',
    margin: '20px auto',
    animation: 'spin 1s linear infinite',
    transform: `rotate(${rotation}deg)`,
  };
  

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>Chargement en cours...</h2>
      <div style={loaderStyle}></div>
    </div>
  );
};

export default LoadingScreen;
