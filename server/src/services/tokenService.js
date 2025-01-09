import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { TokenSchema } from "../models/models.js";

dotenv.config();
class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
      expiresIn: "30m",
    });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
      expiresIn: "30d",
    });
    return {
      accessToken,
      refreshToken,
    };
  }

  validateAccessToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
      return userData;
    } catch (e) {
      return null;
    }
  }

  validateRefreshToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
      return userData;
    } catch (e) {
      return null;
    }
  }

  async saveToken(userId, refToken) {
    const findToken = await TokenSchema.findOne({ where: { userId: userId } });
    if (findToken) {
      return await TokenSchema.update(
        { refreshToken: refToken },
        { where: { userId: userId } },
      );
    }
    const token = await TokenSchema.create({
      userId: userId,
      refreshToken: refToken,
    });
    return token;
  }

  async removeToken(refreshToken) {
    const tokenData = TokenSchema.destroy({
      where: { refreshToken: refreshToken },
    });

    return tokenData;
  }

  async findToken(refreshToken) {
    const tokenData = TokenSchema.findOne({
      where: { refreshToken: refreshToken },
    });

    return tokenData;
  }
}

export default new TokenService();
