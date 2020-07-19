import React from 'react';

function StepDetails({ ste }) {
  console.log(ste)

  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      <p>{ste.name}</p>
      {/* <p>id: {ste._id}</p> */}
    </li>
  )
}
export default StepDetails;