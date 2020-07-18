import React from 'react';

function StepDetails({goal}) {
  console.log(goal)

  return (
    <li data-categoria={goal.categoria} className="list-group-item d-flex justify-content-between align-items-center">
      {/* hacer un mapeo con las que se hallan grabado de las 10 y pone rlas que tiene el user, fácil
    con un mapeo se muestran por Id del User: en un ul con  li */}
      <p>Step 1: {goal.step1}</p>
      <p>Step 2: {goal.step2}</p>
      <p>Step 3: {goal.step3}</p>
      <p>Step 4: {goal.step4}</p>
      <p>Step 5: {goal.step5}</p>
      <p>Step 6: {goal.step6}</p>
      <p>Step 7: {goal.step7}</p>
      <p>Step 8: {goal.step8}</p>
      <p>Step 9: {goal.step9}</p>
      <p>Step 10: {goal.step10}</p>
    </li>
  )
}
export default StepDetails;