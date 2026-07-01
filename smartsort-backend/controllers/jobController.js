const jobService = require('../services/jobService');

class JobController {
  async getJobs(req, res, next) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const facilityId = req.query.facilityId;

      const { jobs, totalCount } = await jobService.getJobs(facilityId, page, limit);

      res.status(200).json({
        data: jobs,
        totalCount,
        totalPages: Math.ceil(totalCount / limit),
        currentPage: page,
      });
    } catch (err) {
      next(err);
    }
  }

  async createJob(req, res, next) {
    try {
      const job = await jobService.createJob(req.body);
      res.status(201).json(job);
    } catch (err) {
      next(err);
    }
  }

  async updateJob(req, res, next) {
    try {
      const { id } = req.params;
      const job = await jobService.updateJob(id, req.body);
      res.status(200).json(job);
    } catch (err) {
      next(err);
    }
  }

  async getJobsSummary(req, res, next) {
    try {
      const facilityId = req.query.facilityId;
      const summary = await jobService.getJobsSummary(facilityId);
      res.status(200).json(summary);
    } catch (err) {
      next(err);
    }
  }

  async getBulkJobs(req, res, next) {
    try {
      const jobs = await jobService.getBulkJobs();
      res.status(200).json(jobs);
    } catch (err) {
      next(err);
    }
  }

  async createBulkJob(req, res, next) {
    try {
      const job = await jobService.createBulkJob(req.body);
      res.status(201).json(job);
    } catch (err) {
      next(err);
    }
  }

  async updateBulkJob(req, res, next) {
    try {
      const { id } = req.params;
      const job = await jobService.updateBulkJob(id, req.body);
      res.status(200).json(job);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new JobController();
