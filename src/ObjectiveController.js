// ObjectiveController.js
import React from 'react';
import ObjectiveComponent from './ObjectiveComponent';

const ObjectiveController = ({ currentObjective, score, distanceToGoal }) => {
  return (
    <ObjectiveComponent currentObjective={currentObjective} score={score} distanceToGoal={distanceToGoal}/>
  );
};

export default ObjectiveController;
