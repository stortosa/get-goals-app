import React, { Fragment } from 'react';
import GoalDetails from './GoalDetails';
// import GoalList from './GoalList';

function Goals({ goals, extractId }) {
  // console.log(goals)
  return (
    <Fragment>
      <h1 className="text-center">Goals</h1>
      <ul className="list-group mt-5">
        {goals.map(goal => (
          <GoalDetails key={goal._id} goal={goal} />
          // <GoalDetails key={extractId} goal={goal} />

        ))}
      </ul>
    </Fragment>
  )
}
export default Goals;