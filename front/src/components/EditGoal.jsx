import React, { useState, useRef } from 'react';
import Error from './Error';

import axios from 'axios';
import Swal from 'sweetalert2';
import { withRouter } from 'react-router-dom';

function EditGoal(props) {
  const { history, oneGoal, saveReloadGoals } = props;

  console.log(oneGoal);

  //generate Refs:
  const nameGoalRef = useRef('');
  const colorGoalRef = useRef('');
  const textGoalRef = useRef('');
  const stepGoalRef = useRef('');

  const [error, saveError] = useState(false);
  const [stateEdit, saveStateEdit] = useState('');

  const editGoal = async (e) => {

    e.preventDefault();
    //catch form´s values

    // validation
    const newName = nameGoalRef.current.value,
      newColor = colorGoalRef.current.value,
      newText = textGoalRef.current.value,
      newStep = stepGoalRef.current.value;

    if (newName === '' || newColor === '' || newText === '' || newStep === '') {
      saveError(true);
      return;
    }

    saveError(false);

    // Values from Form
    const editingGoal = {
      name: newName,
      color: newColor,
      goalText: newText,
      step1: newStep,
      // _id: oneGoal._id
    }
    console.log(editingGoal);

    // send request 
    const url = `http://localhost:4000/goals/${oneGoal._id}`;

    try {

      const result = await axios.put(url, editingGoal);

      console.log(result);
      if (result.status === 200) {
        Swal.fire(
          'Good job!',
          'The was edited successfuly!',
          'success'
        )
      }
    } catch{
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
      })
    }
    // user redirect to goals added:
    saveReloadGoals(true);
    history.push('/goals');
  }

  return (
    <div className="col-md-8 mx-auto">
      <h1 className="text-center">Edit a Goal</h1>

      {error ? <Error message="All fields are mandatory" /> : null}

      <form className="mt-5" onSubmit={editGoal}>
        <div className="form-group">
          <label>Goal Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            placeholder="Goal Name"
            ref={nameGoalRef}
          // defaultValue={}
          />
        </div>

        <div className="form-group">
          <label>Goal Color</label>
          <input
            type="text"
            className="form-control"
            name="color"
            placeholder="Color"
            ref={colorGoalRef}
          // defaultValue={oneGoal.color}

          />
        </div>

        <div className="form-group">
          <label>Goal Text</label>
          <input
            type="text"
            className="form-control"
            name="Text"
            placeholder="Goal Text"
            ref={textGoalRef}
          // defaultValue={goal.textGoal}
          />
        </div>

        <div className="form-group">
          <label>Step</label>
          <input
            type="text"
            className="form-control"
            name="Step"
            placeholder="Step"
            ref={stepGoalRef}
          // defaultValue={goal.stepGoal}
          />
        </div>

        <input
          type="submit"
          className="font-weight-bold text-uppercase mt-5 btn btn-primary btn-block py-3"
          value="Edit a Goal"
        />
      </form>
    </div>
  )
}
export default withRouter(EditGoal);