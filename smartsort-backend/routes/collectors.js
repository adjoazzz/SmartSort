const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { restrictToFacility } = require('../middleware/auth');
const { validate } = require('../middleware/validation');
const { schemas } = require('../utils/validators');

router.get('/', restrictToFacility, userController.getCollectors);
router.post('/', validate(schemas.user.create), userController.createCollector);
router.patch('/:id', validate(schemas.user.update), userController.updateCollector);

module.exports = router;
