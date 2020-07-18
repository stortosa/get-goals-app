import React, { Fragment } from 'react';
import StepDetails from './StepDetails';

function StepsList({ goals, saveReloadGoals }) {
  console.log(goals);
  return (
    <Fragment>
      <h1 className="text-center">Steps:</h1>
      <ul className="list-group mt-5">
        {goals.map(goal => (
          <StepDetails key={goal._id} goal={goal} saveReloadGoals={saveReloadGoals} />
        ))}
      </ul>
    </Fragment>  )
}
export default StepsList;