import React from 'react';

const ObjectiveComponent = ({ currentObjective, score, distanceToGoal, distanceToGoalInHeight }) => {
  const objectiveStyle = {
    position: 'fixed',
    top: '20px',
    right: '20px',
    padding: '10px', // Réduire la taille de la boîte
    background: 'linear-gradient(to right, #1a1a1a, #333, #1a1a1a)',
    color: '#fff',
    borderRadius: '8px', // Coins plus arrondis
    border: '2px solid #fff',
    fontFamily: 'Arial, sans-serif',
    fontSize: '14px', // Réduire la taille de la police
    boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.5)',
    zIndex: '1000',
  };

  const headingStyle = {
    fontSize: '13px', // Réduire la taille de la police du titre
    fontWeight: 'bold',
    marginBottom: '5px', // Réduire l'espace entre le titre et le texte
  };

  const infoStyle = {
    fontSize: '12px', // Nouvelle taille de police
    marginBottom: '5px', // Réduire l'espace entre les éléments d'information
    color: 'rgb(225, 225, 225, 255)', // Couleur du texte
  };

  return (
    <div style={objectiveStyle}>
      <p style={headingStyle}>Objectif en cours:</p>
      <p style={infoStyle}>{currentObjective}</p>
      <p style={headingStyle}>Score:</p>
      <p style={infoStyle}>{score}</p>
      {distanceToGoal > 0 && (
      <>
        <p style={headingStyle}>Distance jusqu'à l'objectif:</p>
        <p style={infoStyle}>{distanceToGoal} mètres</p>
      </>
      )}
      {distanceToGoalInHeight > 0 && (
        <>
          <p style={headingStyle}>Distance en hauteurs</p>
          <p style={infoStyle}>{distanceToGoalInHeight} mètres</p>
        </>
      )}
    </div>
  );
};

export default ObjectiveComponent;
