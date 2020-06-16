import React, { useState, useRef } from 'react';
import Error from './Error';

import axios from 'axios';
import Swal from 'sweetalert2';
import { withRouter } from 'react-router-dom';

function EditGoal(props) {
  const { history, oneGoal, saveReloadGoals } = props;

  console.log(oneGoal);
  const nameGoalRef = useRef('');
  const colorGoalRef = useRef('');
  const textGoalRef = useRef('');
  const stepGoalRef = useRef('');
  // const idGoal = oneGoal._id;

  const [error, saveError] = useState(false);

  const editGoal = async e => {

    const newName = nameGoalRef.current.value,
          newColor = colorGoalRef.current.value,
          newText = textGoalRef.current.value,
          newStep = stepGoalRef.current.value;
          // newId = oneGoal_id;

    if(newName === '' || newColor === '' || newText === '' || newStep === ''){
      saveError(true);
      return;
    }
    saveError(false);

    e.preventDefault();
    //catch form´s values

    const editingGoal = {
      name: newName,
      color: newColor,
      goalText: newText,
      step1: newStep,
      _id: oneGoal._id
    }
    console.log(editingGoal);

    // send request
    const url = `http://localhost:4000/goals/${oneGoal._id}`;  /// goals/edit/ id     4000

    try {
      const result = await axios.put(url, editingGoal);
      console.log(result);
      if (result.status === 200) {
        Swal.fire(
          'Goal edited',
          'Goal was edited successfuly',
          'Success'
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
          // defaultValue={oneGoal.name}
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
          // defaultValue={goal.colorGoal}

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
        // onClick={()=>{console.log(nameGoalRef.current.value, colorGoalRef.current.value, textGoalRef.current.value, stepGoalRef.current.value)}}
        />
      </form>
    </div>
  )
}
export default withRouter(EditGoal);