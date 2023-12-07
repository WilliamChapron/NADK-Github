// ObjectiveController.js
import React from 'react';
import ObjectiveComponent from './ObjectiveComponent';

const ObjectiveController = ({ currentObjective, score, distanceToGoal, distanceToGoalInHeight }) => {
  return (
    <ObjectiveComponent currentObjective={currentObjective} score={score} distanceToGoal={distanceToGoal} distanceToGoalInHeight={distanceToGoalInHeight}/>
  );
};

export default ObjectiveController;
