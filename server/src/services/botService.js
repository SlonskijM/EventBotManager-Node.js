import ApiError from "../exceptions/api-error.js";
import { Bot } from "../models/models.js";
import TelegramTokenService from "./telegramTokenService.js";
class BotService {
  async create(token, id) {
    const { first_name } = await TelegramTokenService.validBotToken(token);
    const hash = TelegramTokenService.hash(token);
    const bot = await Bot.findOne({ where: { hash } });
    if (bot) {
      throw ApiError.InvalidTokenError("Данный токен уже добавлен!");
    }
    const encryptToken = await TelegramTokenService.encryptToken(token);
    return await Bot.create({
      name: first_name,
      token: encryptToken,
      userId: id,
      hash,
    });
  }

  async getAll(id) {
    return await Bot.findAll({ where: { userId: id } });
  }

  async delete(id, user) {
    const bot = await Bot.findOne({ where: { id, userId: user.id } });
    if (!bot) throw ApiError.BadRequest("Бот с таким id не существует!");
    return await Bot.destroy({ where: { id } });
  }
}

export default new BotService();
