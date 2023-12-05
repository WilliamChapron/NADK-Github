// ObjectiveSystem.js
import React from 'react';

const ObjectiveComponent = ({ currentObjective, score, distanceToGoal }) => {
  const objectiveStyle = {
    position: 'fixed',  // Changez 'absolute' à 'fixed'
    top: '20px',
    right: '20px',
    padding: '20px',
    background: 'linear-gradient(to right, #1a1a1a, #333, #1a1a1a)',
    color: '#fff',
    borderRadius: '10px',
    border: '2px solid #fff',
    fontFamily: 'Arial, sans-serif',
    fontSize: '16px',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)',
    zIndex: '1000',
  };

  const headingStyle = {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '10px',
  };

  const infoStyle = {
    marginBottom: '8px',
  };

  return (
    <div style={objectiveStyle}>
      <p style={headingStyle}>Objectif en cours:</p>
      <p style={infoStyle}>{currentObjective}</p>
      <p style={headingStyle}>Score:</p>
      <p style={infoStyle}>{score}</p>
      <p style={headingStyle}>Distance jusqu'à l'objectif:</p>
      <p style={infoStyle}>{distanceToGoal} mètres</p>
    </div>
  );
};

export default ObjectiveComponent;
