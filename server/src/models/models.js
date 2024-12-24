import { DataBase } from "../database/database.js";
import { DataTypes } from "sequelize";

const User = DataBase.define(
  "user",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    isActivated: { type: DataTypes.BOOLEAN, defaultValue: false },
    activationLink: { type: DataTypes.STRING },
    role: { type: DataTypes.ARRAY(DataTypes.STRING), defaultValue: ["USER"] },
  },
  {
    tableName: "Users",
  },
);

const TokenSchema = DataBase.define(
  "token",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    refreshToken: { type: DataTypes.STRING, allowNull: false },
  },
  {
    tableName: "Tokens",
  },
);

User.hasOne(TokenSchema, {
  foreignKey: "userId",
  as: "token",
});

TokenSchema.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});

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

export { User, TokenSchema, Bot, Message, Task };
