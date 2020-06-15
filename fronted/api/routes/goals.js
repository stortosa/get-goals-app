const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const GoalsController = require('../controllers/goals');


// router.post('/', (req, res, next) => {
//   res.status(200).json({
//     message: 'Handling GET requests to /goals'
//   });
// });

router.get('/', GoalsController.goals_get_all);


// depende de lo que quiera poner o el schema de goals:
// router.post('/', checkAuth, GoalsController.goals_create_goal);
router.post('/', GoalsController.goals_create_goal);

router.get("/:goalId", GoalsController.goals_get_goal);

router.patch('/:goalId', GoalsController.goals_update_goal);

router.delete('/:goalId', GoalsController.goals_delete);

module.exports = router;