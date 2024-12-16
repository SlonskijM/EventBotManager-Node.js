import { DataBase } from "../db/db.js";
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
    email: { type: DataTypes.STRING, unique: true },
    password: { type: DataTypes.STRING },
    role: { type: DataTypes.STRING, defaultValue: "ADMIN" },
  },
  {
    freezeTableName: true,
    tableName: "Users",
  },
);

const Announcement = DataBase.define(
  "announcement",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    body_year: {
      type: DataTypes.INTEGER,
    },
    volume: {
      type: DataTypes.FLOAT,
    },
    img: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    advertisementArticle: {
      type: DataTypes.STRING,
    },
    detailNumber: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.INTEGER,
    },
    discount: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    partCondition: {
      type: DataTypes.BOOLEAN,
    },
    VIN: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
    tableName: "Announcements",
  },
);

const TypeDetail = DataBase.define(
  "typeDetail",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
    tableName: "TypeDetails",
  },
);

const Car = DataBase.define(
  "car",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
    tableName: "Cars",
  },
);

const Fuel = DataBase.define(
  "fuel",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
    tableName: "Fuels",
  },
);

const Transmission = DataBase.define(
  "transmission",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
    tableName: "Transmissions",
  },
);

const Body = DataBase.define(
  "body",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
    tableName: "Bodys",
  },
);

// wheelAnnouncement

// const WheelAnnouncement = DataBase.define(
//   "wheelAnnouncement",
//   {
//     id: {
//       type: DataTypes.INTEGER,
//       primaryKey: true,
//       autoIncrement: true,
//       allowNull: false,
//     },
//     width: {
//       type: DataTypes.STRING,
//     },
//     height: {
//       type: DataTypes.STRING,
//     },
//     radius: {
//       type: DataTypes.STRING,
//     },
//     state: {
//       type: DataTypes.BOOLEAN,
//     },
//     season: {
//       type: DataTypes.BOOLEAN,
//     },
//     quantity: {
//       type: DataTypes.NUMBER,
//     },
//     year: {
//       type: DataTypes.NUMBER,
//     },
//     article: {
//       type: DataTypes.STRING,
//     },
//     description: {
//       type: DataTypes.STRING,
//     },
//     img: {
//       type: DataTypes.JSON,
//     },
//   },
//   {
//     freezeTableName: true,
//     tableName: "WheelAnnouncements",
//   },
// );
//
// const WheelBrand = DataBase.define(
//   "wheelBrand",
//   {
//     id: {
//       type: DataTypes.INTEGER,
//       primaryKey: true,
//       autoIncrement: true,
//       allowNull: false,
//     },
//     name: {
//       type: DataTypes.STRING,
//     },
//   },
//   {
//     freezeTableName: true,
//     tableName: "WheelBrands",
//   },
// );

const CarType = DataBase.define(
  "carType",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
    tableName: "CarTypes",
  },
);

Body.hasMany(Announcement);
Announcement.belongsTo(Body);

Transmission.hasMany(Announcement);
Announcement.belongsTo(Transmission);

Fuel.hasMany(Announcement);
Announcement.belongsTo(Fuel);

TypeDetail.hasMany(Announcement);
Announcement.belongsTo(TypeDetail);

export { User, Announcement, TypeDetail, Car, Transmission, Body, Fuel };
