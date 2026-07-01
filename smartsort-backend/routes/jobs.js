const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');
const { requireManagerOrAdmin, restrictToFacility } = require('../middleware/auth');
const { validate } = require('../middleware/validation');
const { schemas } = require('../utils/validators');

router.get('/', restrictToFacility, jobController.getJobs);
router.post('/', requireManagerOrAdmin, validate(schemas.job.create), jobController.createJob);
router.patch('/:id', requireManagerOrAdmin, validate(schemas.job.update), jobController.updateJob);
router.get('/summary', restrictToFacility, jobController.getJobsSummary);

module.exports = router;
