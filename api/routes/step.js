const express = require('express');
const router = express.Router();
// const checkAuth = require('../middleware/check-auth');
const StepController = require('../controllers/step');


router.get('/', StepController.steps_get_all);

router.post('/', StepController.steps_create_step);

router.get('/:stepId', StepController.steps_get_step);
//Edit:
router.put('/:stepId', StepController.steps_update_step)

router.delete('/:stepId', StepController.step_delete);

module.exports = router;