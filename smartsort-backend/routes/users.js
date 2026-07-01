const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { requireManagerOrAdmin, restrictToFacility } = require('../middleware/auth');
const { validate } = require('../middleware/validation');
const { schemas } = require('../utils/validators');

router.get('/', requireManagerOrAdmin, restrictToFacility, userController.getUsers);
router.post('/', requireManagerOrAdmin, validate(schemas.user.create), userController.createUser);
router.patch('/:id', requireManagerOrAdmin, validate(schemas.user.update), userController.updateUser);

module.exports = router;
