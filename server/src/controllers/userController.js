import UserService from "../services/userService.js";
import dotenv from "dotenv";
import { validationResult } from "express-validator";

dotenv.config();
class UserController {
  async registration(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ message: "Ошибка валидации", error: errors.array() });
      }
      const { email, password } = req.body;
      const userData = await UserService.registration(email, password);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const userData = await UserService.login(email, password);
      console.log(userData);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async logout(req, res) {
    try {
    } catch (e) {}
  }

  async activate(req, res) {
    try {
      const activationLink = req.params.link;
      await UserService.activate(activationLink);
      return res.redirect(process.env.CLIENT_URL);
    } catch (e) {
      console.log(e);
    }
  }

  async refresh(req, res) {
    try {
    } catch (e) {}
  }

  async update(req, res) {
    try {
    } catch (e) {}
  }

  async getOne(req, res) {
    try {
    } catch (e) {}
  }
}

export default new UserController();
