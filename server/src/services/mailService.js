import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.USER_GMAIL,
        pass: process.env.PASSWORD_GMAIL,
      },
    });
  }
  async sendActivationMail(to, link) {
    await this.transporter.sendMail({
      from: process.env.USER_GMAIL,
      to,
      subject: "Активация аккаунта на " + process.env.API_URL,
      text: "",
      html: `
            <div>
                <h1>Для активации перейдите по ссылке</h1>
                <a href="${link}">${link}</a>
            </div>
          `,
    });
  }
}

export default new MailService();
