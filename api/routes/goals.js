const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const GoalsController = require('../controllers/goals');


router.get('/', GoalsController.goals_get_all);

router.post('/', GoalsController.goals_create_goal);

router.get("/:goalId", GoalsController.goals_get_goal);
//Edit:
router.put('/:goalId', GoalsController.goals_update_goal)

router.delete('/:goalId', GoalsController.goals_delete);

module.exports = router;