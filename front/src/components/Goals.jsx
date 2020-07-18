import React, { Fragment } from 'react';
import GoalDetails from './GoalDetails';
import StepDetails from './StepDetails';

function Goals({ goals, saveReloadGoals }) {
  console.log(goals)
  return (
    <Fragment>
      <h1 className="text-center">Goals</h1>
      <ul className="list-group mt-5">
        {goals.map(goal => (
          <GoalDetails key={goal._id} goal={goal} saveReloadGoals={saveReloadGoals} />
        ))}
      </ul>
    </Fragment>
  )
}
export default Goals; 