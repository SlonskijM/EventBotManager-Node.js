import express, { json } from "express";
import dotenv from "dotenv";
import { DataBase } from "./src/database/database.js";
import router from "./src/routes/index.js";
dotenv.config();

const PORT = process.env.PORT || 4000;

const app = express();

app.use(express.json());
app.use("/api", router);

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
