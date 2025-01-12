import BotService from "../services/botService.js";

class BotController {
  async create(req, res, next) {
    try {
      const { token } = req.body;
      const { id } = req.user;
      const createBot = await BotService.create(token, id);
      return res.json(createBot);
    } catch (e) {
      next(e);
    }
  }

  async getAll(req, res, next) {
    try {
      const { id } = req.user;
      const allBots = await BotService.getAll(id);
      return res.json(allBots);
    } catch (e) {
      next(e);
    }
  }

  async update(req, res) {
    try {
    } catch (e) {}
  }

  async delete(req, res) {
    try {
    } catch (e) {}
  }
}

export default new BotController();
