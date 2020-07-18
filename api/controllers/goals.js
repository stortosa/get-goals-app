const Goal = require('../models/goal');
const mongoose = require('mongoose');

exports.goals_get_all = (req, res, next) => {
  Goal.find()
    .select('title color description step1 step2 step3 step4 step5 step6 step7 step8 step9 step10 _id')
    .populate('goal', 'title')
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        goals: docs.map(doc => {
          return {
            title: doc.title,
            color: doc.color,
            description: doc.description,
            step1: doc.step1,
            step2: doc.step2,
            step3: doc.step3,
            step4: doc.step4,
            step5: doc.step5,
            step6: doc.step6,
            step7: doc.step7,
            step8: doc.step8,
            step9: doc.step9,
            step10: doc.step10,
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
    title: req.body.title,
    color: req.body.color,
    description: req.body.description,
    step1: req.body.step1,
    step2: req.body.step2,
    step3: req.body.step3,
    step4: req.body.step4,
    step5: req.body.step5,
    step6: req.body.step6,
    step7: req.body.step7,
    step8: req.body.step8,
    step9: req.body.step9,
    step10: req.body.step10,

  });
  goal
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: 'Created goal succesfully',
        createdGoal: {
          title: result.title,
          color: result.color,
          description: result.description,
          step1: result.step1,
          step2: result.step2,
          step3: result.step3,
          step4: result.step4,
          step5: result.step5,
          step6: result.step6,
          step7: result.step7,
          step8: result.step8,
          step9: result.step9,
          step10: result.step10,
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
    .select('title color description step1 step2 step3 step4 step5 step6 step7 step8 step9 step10 _id')
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
          body: { title: 'String', color: 'String', description: 'String', step1: 'String', step2: 'String', step3: 'String', step4: 'String', step5: 'String', step6: 'String', step7: 'String', step8: 'String', step9: 'String', step10: 'String' }
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