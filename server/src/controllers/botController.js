import BotService from "../services/botService.js";
import { json } from "express";

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

  async delete(req, res, next) {
    try {
      const id = req.params.id;
      const user = req.user;
      const del = await BotService.delete(id, user);
      return res.json(del);
    } catch (e) {
      next(e);
    }
  }
}

export default new BotController();
