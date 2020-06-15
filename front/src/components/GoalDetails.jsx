import React from 'react';
import { Link } from 'react-router-dom';

function GoalDetails({ goal }) {
  console.log(goal)
  const deleteGoal = (_id) =>{
    console.log("Eliminando...",_id);
    //TODO eliminar los registros
  }
  return (
    // <h1 className="text-center">Goal Details</h1>

    <li data-categoria={goal.categoria} className="list-group-item d-flex justify-content-between align-items-center">
      <p>
        Name: {goal.name}
        {""}
      </p>
      <p>Color: {goal.color}</p>
      <p>Text: {goal.goalText}</p>
      <p>Step: {goal.step1}</p>
      <p>Id: {goal._id}</p>
      <div>
        <Link to={`/goals/edit/${goal._id}`} className="btn btn-success mr-2">Edit</Link>
        <button type="button" className="btn btn-danger" onClick={()=>deleteGoal(goal._id)}>Delete &times;</button>
      </div>
    </li>

  );
}
export default GoalDetails;