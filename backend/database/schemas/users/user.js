import sequelize from "../../connect.js";
import { DataTypes } from "sequelize";
import env from 'dotenv'

env.config()

const usrTbl = process.env.USR_TBL;

const User = sequelize.define(usrTbl, {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    fname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'user'
    }
}, {
    freezeTableName: true
});


export default User;