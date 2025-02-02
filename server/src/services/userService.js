import { User } from "../models/models.js";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import mailService from "./mailService.js";
import TokenService from "./tokenService.js";
import UserDto from "../dto/user-dto.js";
import dotenv from "dotenv";
import ApiError from "../exceptions/api-error.js";

dotenv.config();

class UserService {
  async registration(email, password) {
    const candidtae = await User.findOne({ where: { email } });
    if (candidtae) {
      throw ApiError.BadRequest(
        `Пользователь с таким email: ${email} уже существует!`,
      );
    }
    const hashPassword = await bcrypt.hash(password, 3);
    const activationLink = uuidv4();

    const user = await User.create({
      email,
      password: hashPassword,
      activationLink,
    });
    // await mailService.sendActivationMail(
    //   email,
    //   `${process.env.API_URL}/api/user/activate/${activationLink}`,
    // );
    const userDto = new UserDto(user);
    const tokens = TokenService.generateTokens({ ...userDto });
    await TokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }

  async activate(activationLink) {
    const user = await User.findOne({
      where: { activationLink: activationLink },
    });

    if (!user) {
      throw ApiError.BadRequest("Пользователь не существует");
    }

    await User.update(
      { isActivated: true },
      {
        where: { activationLink: activationLink },
      },
    );
  }

  async login(email, password) {
    const user = await User.findOne({ where: { email: email } });
    if (!user) {
      throw ApiError.BadRequest("Пользователь с таким email не существует!");
    }
    const pass = await bcrypt.compare(password, user.password);
    if (!pass) throw ApiError.BadRequest("Неверный пароль!");
    const userDto = new UserDto(user);
    const tokens = TokenService.generateTokens({ ...userDto });
    await TokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }

  async logout(refreshToken) {
    const token = await TokenService.removeToken(refreshToken);
    return token;
  }

  async refresh(refreshToken) {
    if (!refreshToken) throw ApiError.UnauthorizedError();
    const userData = TokenService.validateRefreshToken(refreshToken);
    const tokenFromDB = await TokenService.findToken(refreshToken);

    if (!userData || !tokenFromDB) throw ApiError.UnauthorizedError();

    const user = await User.findOne({ where: { id: userData.id } });
    const userDto = new UserDto(user);
    const tokens = TokenService.generateTokens({ ...userDto });
    await TokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }

  async getOne() {
    const user = await User.findAll();
    return user;
  }
}

export default new UserService();
