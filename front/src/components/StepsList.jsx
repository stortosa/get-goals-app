import React, { Fragment } from 'react';
import StepDetails from './StepDetails';

function StepsList({ steps, saveReloadStep }) {
  console.log(steps);
  return (
    <Fragment>
      <ul className="list-group mt-5">
        {/* <StepDetails /> */}
        {steps.map((ste) => (
          <StepDetails key={ste.name} ste={ste} saveReloadStep={saveReloadStep} />
        ))}
      </ul>
    </Fragment>
  )
}
export default StepsList;