// models/users/profileImage.js

import sequelize from "../../connect.js";
import { DataTypes } from "sequelize";
import User from "../users/user.js";

const Image = sequelize.define("Image", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  imgUrl: {
    type: DataTypes.STRING,
    allowNull: false
  },
  imgType:{
    type: DataTypes.STRING,
    allowNull: false
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id'
    },
    onDelete: 'CASCADE'
  }
}, {
  freezeTableName: true,
});

export default Image;
