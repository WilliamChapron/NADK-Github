// ObjectiveComponent.js
import React from 'react';
import './ObjectiveComponent.css'; // Import the CSS file

const ObjectiveComponent = ({ currentObjective, score, time, distanceToGoal, distanceToGoalInHeight }) => {
  return (
    <div className="objective-container">
      <p className="heading-style">Objectif en cours :</p>
      <p className="info-style">{currentObjective}</p>
      <p className="heading-style">Score :</p>
      <p className="info-style">{score}</p>
      <p className="heading-style">Temps écoulé :</p>
      <p className="info-style">{time} s</p>
      {distanceToGoal !== -1 && (
        <>
          {distanceToGoal >= 0 && distanceToGoal <= 2 ? (
            <>
              <p className={`heading-style goal-reached-style`}>Distance atteinte</p>
              <p className="info-style"></p>
            </>
          ) : (
            <>
              <p className="heading-style">Distance jusqu'à l'objectif:</p>
              <p className="info-style">{distanceToGoal} mètres</p>
            </>
          )}
        </>
      )}
      {distanceToGoalInHeight !== -1 && (
        <>
          {distanceToGoalInHeight >= -1 && distanceToGoalInHeight <= 1 ? (
            <>
              <p className={`heading-style goal-reached-style`}>Hauteur atteinte</p>
              <p className="info-style"></p>
            </>
          ) : (
            <>
              <p className="heading-style">Distance en hauteurs</p>
              <p className="info-style">{distanceToGoalInHeight} mètres</p>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default ObjectiveComponent;
