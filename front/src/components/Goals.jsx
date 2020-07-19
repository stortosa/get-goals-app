import React, { Fragment } from 'react';
import GoalDetails from './GoalDetails';

function Goals({ goals, saveReloadGoals, steps, saveReloadSteps }) {
  console.log(goals)
  return (
    <Fragment>
      <h1 className="text-center">Goals</h1>
      <ul className="list-group mt-5">
        {goals.map((goal) => (
          <GoalDetails key={goal._id} goal={goal} saveReloadGoals={saveReloadGoals} steps={steps} saveReloadSteps={saveReloadSteps} />
        ))}
      </ul>
    </Fragment>
  )
}
export default Goals; 