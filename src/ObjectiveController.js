// ObjectiveController.js
import React from 'react';
import ObjectiveComponent from './ObjectiveComponent';

const ObjectiveController = ({ currentObjective, score, time,  distanceToGoal, distanceToGoalInHeight }) => {
  return (
    <ObjectiveComponent currentObjective={currentObjective} score={score} time={time} distanceToGoal={distanceToGoal} distanceToGoalInHeight={distanceToGoalInHeight}/>
  );
};

export default ObjectiveController;
