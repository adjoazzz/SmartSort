const deviceService = require('../services/deviceService');

class DeviceController {
  async getDevices(req, res, next) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const facilityId = req.query.facilityId;

      const { devices, totalCount } = await deviceService.getDevices(facilityId, page, limit);

      res.status(200).json({
        data: devices,
        totalCount,
        totalPages: Math.ceil(totalCount / limit),
        currentPage: page,
      });
    } catch (err) {
      next(err);
    }
  }

  async updateDevice(req, res, next) {
    try {
      const { id } = req.params;
      const { location, status, fillLevel, lastSortedItem } = req.body;

      const updatedDevice = await deviceService.updateDevice(id, {
        ...(location !== undefined ? { location } : {}),
        ...(status !== undefined ? { status } : {}),
        ...(fillLevel !== undefined ? { fillLevel } : {}),
        ...(lastSortedItem !== undefined ? { lastSortedItem } : {})
      });

      res.status(200).json(updatedDevice);
    } catch (err) {
      next(err);
    }
  }

  async getDeviceEvents(req, res, next) {
    try {
      const { id } = req.params;
      const limit = parseInt(req.query.limit) || 100;
      const events = await deviceService.getDeviceEvents(id, limit);
      res.status(200).json(events);
    } catch (err) {
      next(err);
    }
  }

  async saveTelemetry(req, res, next) {
    try {
      const updatedBin = await deviceService.saveTelemetry(req.body);
      res.status(200).json({ status: "success", data: updatedBin });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new DeviceController();
