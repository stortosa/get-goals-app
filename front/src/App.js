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
import axios from 'axios';

function App() {
  const date = new Date().getFullYear();

  const [goals, saveGoals] = useState([]);
  const [reloadGoals, saveReloadGoals] = useState(true);

  const dataId = [];

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
  }, [reloadGoals]);

  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/home" render={() => <Home />} />
        <Route exact path="/goals" render={() =>
          <Goals goals={goals} saveReloadGoals={saveReloadGoals} />} />
        <Route exact path="/goals/steps" render={() =>
          <StepsList goals={goals} saveReloadGoals={saveReloadGoals} />} />
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