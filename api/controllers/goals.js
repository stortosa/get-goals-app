const Goal = require('../models/goal');
const mongoose = require('mongoose');

exports.goals_get_all = (req, res, next) => {
  Goal.find()
    .select('name color goalText step1 _id')
    .populate('goal', 'name')
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        goals: docs.map(doc => {
          return {
            name: doc.name,
            color: doc.color,
            goalText: doc.goalText,
            step1: doc.step1,
            _id: doc._id,
            request: {
              type: 'GET',
              url: 'http://localhost:4000/goals/' + doc._id
            }
          }
        })
      }
      // if(docs.length >= 0){
      res.status(200).json(response);
      // } else {
      //   res.status(404).json({
      //     message: "No entries found"
      //   });
      // }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
}

exports.goals_create_goal = (req, res, next) => {
  const goal = new Goal({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    color: req.body.color,
    goalText: req.body.goalText,
    step1: req.body.step1
  });
  goal
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: 'Created goal succesfully',
        createdGoal: {
          name: result.name,
          color: result.color,
          goalText: result.goalText,
          step1: result.step1,
          _id: result._id,
          request: {
            type: 'POST',
            url: 'http://localhost:4000/goals/' + result._id
          }
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
}

exports.goals_get_goal = (req, res, next) => {
  const id = req.params.goalId;
  Goal.findById(id)
    .select('name color goalText step1 _id')
    .populate('goal')
    .exec()
    .then(doc => {
      console.log("From database", doc);
      if (doc) {
        res.status(200).json({
          goal: doc,
          request: {
            type: 'GET',
            description: 'Get all goals',
            url: 'http://localhost:4000/goals'
          }
        });
      } else {
        res.status(404).json({ message: "No valid entry found for proveided ID" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
}

exports.goals_update_goal = (req, res, next) => {
  const id = req.params.goalId;
  Goal.findByIdAndUpdate(id, req.body, { new: true })
    .populate('goal')
    .then(x => {
      console.log(x)
      res.json({ "updated": true, id })
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });

}

exports.goals_delete = (req, res, next) => {
  const id = req.params.goalId;
  Goal.deleteMany({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json({
        message: 'Goal deleted',
        request: {
          type: 'POST',
          url: 'http://localhost:4000/goals',
          body: { name: 'String', color: 'String', goalText: 'String', step1: 'String' }
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
}