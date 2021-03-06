import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './components/Home';
import Header from './components/Header';
import Footer from './components/Footer';
import Goals from './components/Goals';
import GoalDetails from './components/GoalDetails';
import EditGoal from './components/EditGoal';
import AddGoal from './components/AddGoal';
import StepsList from './components/StepsList';
import StepDetails from './components/StepDetails';
import axios from 'axios';

function App() {
  const date = new Date().getFullYear();

  const [goals, saveGoals] = useState([]);
  const [reloadGoals, saveReloadGoals] = useState(true);
  const [steps, saveSteps] = useState([]);
  const [reloadSteps, saveReloadSteps] = useState(true);

  useEffect(() => {
    if (reloadGoals) {
      const requestApi = async () => {
        const result = await axios.get('http://localhost:4000/goals')
        // console.log(result.data.goals)
        saveGoals(result.data.goals);

      }
      requestApi();
      //change a false reload of goal: 
      saveReloadGoals(false);
    }
    if (reloadSteps) {
      const requestApiStep = async () => {
        const resultStep = await axios.get('http://localhost:4000/steps')
        // console.log(resultStep.data.steps);
        saveSteps(resultStep.data.steps)
      }
      requestApiStep();
      saveReloadSteps(false);
    }

  }, [reloadGoals, reloadSteps]);

  // useEffect(() => {
  //   if (reloadSteps) {
  //     const requestApiStep = async () => {
  //       const resultStep = await axios.get('http://localhost:4000/steps')
  //       // console.log(resultStep.data.steps);
  //       saveSteps(resultStep.data.steps)
  //     }
  //     requestApiStep();
  //     saveReloadSteps(false);
  //   }
  // }, [reloadSteps]);

  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/home" render={() => <Home />} />
        <Route exact path="/goals" render={() =>
          <Goals goals={goals} saveReloadGoals={saveReloadGoals} steps={steps} saveReloadSteps={saveReloadSteps} />} />
        <Route exact path="/steps" render={() =>
          <StepsList steps={steps} saveReloadSteps={saveReloadSteps} />} />
        <Route exact path="/steps/:_id" render={() => <StepDetails />} />
        <Route exact path="/new-goal" render={() => <AddGoal saveReloadGoals={saveReloadGoals} />} />
        <Route exact path="/goals/:_id" render={() => <GoalDetails />} />
        <Route exact path="/goals/edit/:_id" render={(props) => {
          // console.log(props.match.params);
          const idGoal = (props.match.params._id);

          const oneGoal = goals.filter(goal => goal._id === idGoal);
          return (
            <EditGoal
              oneGoal={oneGoal[0]}
              saveReloadGoals={saveReloadGoals} />
          )
        }} />

      </Switch>
      <Footer date={date} />
    </Router>
  );
}

export default App;