import { DataBase } from "../database/database.js";
import { DataTypes } from "sequelize";

const User = DataBase.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    email: { type: DataTypes.STRING, unique: true },
    password: { type: DataTypes.STRING },
    role: { type: DataTypes.ARRAY(DataTypes.STRING), defaultValue: ["USER"] },
  },
  {
    tableName: "Users",
  },
);

const Bot = DataBase.define(
  "Bot",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: { type: DataTypes.STRING, allowNull: false },
    token: { type: DataTypes.STRING, unique: true, allowNull: false },
    description: { type: DataTypes.STRING },
  },
  {
    tableName: "Bots",
  },
);

User.hasMany(Bot);
Bot.belongsTo(User);

const Message = DataBase.define(
  "Message",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    title: { type: DataTypes.STRING },
    content: { type: DataTypes.STRING },
    img: {
      type: DataTypes.STRING,
    },
    isDraft: { type: DataTypes.BOOLEAN, defaultValue: false },
  },
  {
    tableName: "Messages",
  },
);

Bot.hasMany(Message);
Message.belongsTo(Bot);

const Task = DataBase.define(
  "Task",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    scheduledTimes: { type: DataTypes.ARRAY(DataTypes.DATE), allowNull: false },
  },
  {
    tableName: "Tasks",
  },
);

Message.hasMany(Task);
Task.belongsTo(Message);

export { User, Bot, Message, Task };
