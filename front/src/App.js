import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './components/Home';
import Header from './components/Header';
import Footer from './components/Footer';
import Goals from './components/Goals';
import GoalDetails from './components/GoalDetails';
import EditGoal from './components/EditGoal';
import AddGoal from './components/AddGoal';

function App() {
  const date = new Date().getFullYear();

  const [goals, saveGoals] = useState([]);
  const [reloadGoals, saveReloadGoals] = useState(true);
  const [extractId, saveExtractId] = useState([]);

  const dataId = [];

  // TENDRIA QUE SER LA URL A USER/:ID UNA VEZ LOGEADO
  useEffect(() => {
    if (reloadGoals) {
      const requestApi = async () => {
        const result = await fetch('http://localhost:4000/goals')
          .then(res => {
            return res.json();
          })
          .then(data => {
            // console.log(data.goal)
            return data.goals
          })
        saveGoals(result);
        // console.log(result);

        result.map(resul =>
          extractId.push(resul._id),
        )
        // saveExtractId(extractId);
        // console.log(extractId)
        //destructuring:
        // const { name, color, goalText, step1, _id } = result[0];
        // console.log(_id)
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
          <Goals goals={goals} extractId={extractId} />} />
        <Route exact path="/new-goal" render={() => <AddGoal saveReloadGoals={saveReloadGoals} />} />
        <Route exact path="/goals/:_id" render={() => <GoalDetails />} />
        <Route exact path="/goals/edit/:_id" render={(props) => {
          // console.log(typeof props.match.params._id);
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
