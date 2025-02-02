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

  async getOne(req, res, next) {
    try {
      const { botId } = req.params;
      const { id } = req.user;
      const bot = await BotService.getOne(botId, id);
      return res.json(bot);
    } catch (e) {
      next(e);
    }
  }

  async update(req, res, next) {
    try {
      const { name } = req.body;
      const { botId } = req.params;
      const { id } = req.user;
      const updateBot = await BotService.update(botId, name, id);
      return res.json(updateBot);
    } catch (e) {
      next(e);
    }
  }

  async delete(req, res, next) {
    try {
      const { botId } = req.params;
      const user = req.user;
      const del = await BotService.delete(botId, user);
      return res.json(del);
    } catch (e) {
      next(e);
    }
  }
}

export default new BotController();
