import React from 'react';

const ObjectiveComponent = ({ currentObjective, score, time, distanceToGoal, distanceToGoalInHeight }) => {
  const objectiveStyle = {
    position: 'fixed',
    top: '20px',
    right: '20px',
    padding: '10px',
    background: 'linear-gradient(to right, #1a1a1a, #333, #1a1a1a)',
    color: '#fff',
    borderRadius: '8px',
    border: '2px solid #fff',
    fontFamily: 'Arial, sans-serif',
    fontSize: '14px',
    boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.5)',
    zIndex: '1000',
  };

  const headingStyle = {
    fontSize: '13px',
    fontWeight: 'bold',
    marginBottom: '5px',
  };

  const infoStyle = {
    fontSize: '12px',
    marginBottom: '5px',
    color: 'rgb(225, 225, 225, 255)',
  };

  // Styles for when the goal is reached
  const goalReachedStyle = {
    color: 'green', // Change the color to green when the goal is reached
    fontWeight: 'bold', // Add bold style
  };

  return (
    <div style={objectiveStyle}>
      <p style={headingStyle}>Objectif en cours :</p>
      <p style={infoStyle}>{currentObjective}</p>
      <p style={headingStyle}>Score :</p>
      <p style={infoStyle}>{score}</p>
      <p style={headingStyle}>Temps écoulé :</p>
      <p style={infoStyle}>{time} s</p>
      {distanceToGoal !== -1 && (
        <>
          {distanceToGoal >= 0 && distanceToGoal <= 2 ? (
            <>
              <p style={{ ...headingStyle, ...goalReachedStyle }}>Distance atteinte</p>
              <p style={infoStyle}></p>
            </>
          ) : (
            <>
              <p style={headingStyle}>Distance jusqu'à l'objectif:</p>
              <p style={infoStyle}>{distanceToGoal} mètres</p>
            </>
          )}
        </>
      )}
      {distanceToGoalInHeight !== -1 && (
        <>
          {distanceToGoalInHeight >= -1 && distanceToGoalInHeight <= 1 ? (
            <>
              <p style={{ ...headingStyle, ...goalReachedStyle }}>Hauteur atteinte</p>
              <p style={infoStyle}></p>
            </>
          ) : (
            <>
              <p style={headingStyle}>Distance en hauteurs</p>
              <p style={infoStyle}>{distanceToGoalInHeight} mètres</p>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default ObjectiveComponent;
