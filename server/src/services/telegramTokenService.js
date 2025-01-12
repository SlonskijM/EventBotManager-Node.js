import axios from "axios";
import ApiError from "../exceptions/api-error.js";
import sodium from "libsodium-wrappers";
import crypto from "crypto";

class TelegramTokenService {
  async validBotToken(token) {
    try {
      const url = `https://api.telegram.org/bot${token}/getMe`;
      const response = await axios.get(url);
      return response.data.result;
    } catch (e) {
      throw ApiError.InvalidTokenError();
    }
  }

  async encryptToken(token) {
    await sodium.ready;

    const key = Buffer.from(process.env.SECRET_KEY_FROM_TOKEN, "utf8").slice(
      0,
      sodium.crypto_secretbox_KEYBYTES,
    );
    const nonce = sodium.randombytes_buf(sodium.crypto_secretbox_NONCEBYTES);
    const ciphertext = sodium.crypto_secretbox_easy(token, nonce, key);
    return `${Buffer.from(nonce).toString("hex")} ${Buffer.from(
      ciphertext,
    ).toString("hex")}`;
  }

  hash(token) {
    return crypto
      .createHmac("sha256", process.env.SECRET_KEY_FROM_TOKEN)
      .update(token)
      .digest("hex");
  }

  async decryptToken(combined, secretKey) {}
}

export default new TelegramTokenService();
