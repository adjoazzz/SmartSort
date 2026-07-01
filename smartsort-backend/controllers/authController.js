const userService = require('../services/userService');

class AuthController {
  async syncAuth(req, res, next) {
    try {
      const { id, email, name, role } = req.body;
      const user = await userService.syncAuthUser(id, email, name, role);
      res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new AuthController();
