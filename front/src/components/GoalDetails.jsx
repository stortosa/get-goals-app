import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

import StepDetails from './StepDetails';

function GoalDetails({ goal, saveReloadGoals, steps, saveReloadSteps }) {
  console.log(goal)
  console.log(steps)
  const deleteGoal = (_id) => {
    console.log("Eliminando...", _id);

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.value) {
        try {
          const url = (`http://localhost:4000/goals/${_id}`);
          const result = await axios.delete(url);

          if (result.status === 200) {
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            )
            //link to API:
            saveReloadGoals(true);
          }
        } catch (error) {
          console.log(error);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
          })
        }
      }
    })
  }
  return (
    // <h1 className="text-center">Goal Details</h1>

    <li data-categoria={goal.categoria} className="list-group-item d-flex justify-content-between align-items-center">
      <p>
        Title: {goal.title}
        {""}
      </p>
      <p>Color: {goal.color}</p>
      <p>Description: {goal.description}</p>
      <p>
        <ul className="list-group mt-5">
          {steps.map((ste) => (
            <StepDetails key={ste.name} ste={ste} saveReloadSteps={saveReloadSteps} />
          ))}
        </ul>
      </p>
      <p>Id: {goal._id}</p>
      <div>
        <Link to={`/goals/edit/${goal._id}`} className="btn btn-success mr-2">Edit</Link>
        <button type="button" className="btn btn-danger" onClick={() => deleteGoal(goal._id)}>Delete &times;</button>
      </div>
    </li>

  );
}
export default GoalDetails;