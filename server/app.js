import express, { json } from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { DataBase } from "./src/database/database.js";
import router from "./src/routes/index.js";
import errorMiddleware from "./src/middleware/error-middleware.js";

dotenv.config();

const PORT = process.env.PORT || 4000;

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use("/api", router);
app.use(errorMiddleware);
const start = async () => {
  try {
    await DataBase.authenticate();
    // await DataBase.sync();
    await app.listen(PORT, () => console.log(`SERVER START ON PORT: ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
