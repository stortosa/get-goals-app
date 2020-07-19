const Step = require('../models/step');
const mongoose = require('mongoose');

exports.steps_get_all = (req, res, next) => {
  Step.find()
    .select('name _id')
    .populate('step')
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        steps: docs.map(doc => {
          return {
            name: doc.name,
            _id: doc._id,
            request: {
              type: 'GET',
              url: 'http://localhost:4000/steps/' + doc._id
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

exports.steps_create_step = (req, res, next) => {
  const step = new Step({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
  });
  step
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: 'Created step succesfully',
        createdStep: {
          name: result.name,
          _id: result._id,
          request: {
            type: 'POST',
            url: 'http://localhost:4000/steps/' + result._id
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

exports.steps_get_step = (req, res, next) => {
  const id = req.params.stepId;
  Step.findById(id)
    .select('name _id')
    .populate('step')
    .exec()
    .then(doc => {
      console.log("From database", doc);
      if (doc) {
        res.status(200).json({
          step: doc,
          request: {
            type: 'GET',
            description: 'Get all steps',
            url: 'http://localhost:4000/steps'
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

exports.steps_update_step = (req, res, next) => {
  const id = req.params.stepId;
  Step.findByIdAndUpdate(id, req.body, { new: true })
    .populate('step')
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

exports.step_delete = (req, res, next) => {
  const id = req.params.stepId;
  Step.deleteMany({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json({
        message: 'Step deleted',
        request: {
          type: 'POST',
          url: 'http://localhost:4000/steps',
          body: { step: 'String' }
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