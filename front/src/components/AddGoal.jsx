import React, { useState } from 'react';
import Error from './Error';

import axios from 'axios';
import Swal from 'sweetalert2';
import { withRouter } from 'react-router-dom';

function AddGoal({ history, saveReloadGoals }) {

  // states:
  const [nameGoal, saveName] = useState('');
  const [colorGoal, saveColor] = useState('');
  const [textGoal, saveText] = useState('');
  const [stepGoal, saveStep] = useState('');
  // const [idGoal, saveId] = useState('');
  const [error, saveError] = useState(false);

  const addGoal = async e => {
    e.preventDefault();
    if (nameGoal === '' || colorGoal === '' || textGoal === '' || stepGoal === '') {
      saveError(true);
      return;
    }
    saveError(false)

    //create a new goal
    try {
      const result = await axios.post('http://localhost:4000/goals', {    //  3000

        name: nameGoal,
        color: colorGoal,
        goalText: textGoal,
        step1: stepGoal,

      });
      console.log(result);
      if (result.status === 201) {
        Swal.fire(
          'Good job!',
          'Goal was created successfuly',
          'success'
        )
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
      })
    }
    // user redirect to goals added:
    saveReloadGoals(true);
    history.push('/goals')
  }

  return (
    <div className="col-md-8 mx-auto">
      <h1 className="text-center">Add new Goal</h1>

      {error ? <Error message="All fields are mandatory" /> : null}

      <form className="mt-5" onSubmit={addGoal}>
        <div className="form-group">
          <label>Goal Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            placeholder="Goal Name"
            onChange={e => saveName(e.target.value)}
          />
        </div>

        {/* <div className="form-group">
          <label>Goal Id</label>
          <input
            type="number"
            className="form-control"
            name="goalId"
            placeholder="Goal Id"
            onChange={e => saveId(e.target.value)}
          />
        </div> */}

        <div className="form-group">
          <label>Goal Color</label>
          <input
            type="text"
            className="form-control"
            name="color"
            placeholder="Color"
            onChange={e => saveColor(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Goal Text</label>
          <input
            type="text"
            className="form-control"
            name="Text"
            placeholder="Goal Text"
            onChange={e => saveText(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Step</label>
          <input
            type="text"
            className="form-control"
            name="Step"
            placeholder="Step"
            onChange={e => saveStep(e.target.value)}
          />
        </div>

        <input
          type="submit"
          className="font-weight-bold text-uppercase mt-5 btn btn-primary btn-block py-3"
          value="Add Goal"
        />
      </form>
    </div>
  )
}
export default withRouter(AddGoal);