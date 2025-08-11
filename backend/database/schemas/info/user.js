import sequelize from "../../connect.js";
import { DataTypes } from "sequelize";
import User from "../users/user.js";
import env from 'dotenv'

env.config()
const info = process.env.INFO_TBL
const UserInfo =sequelize.define(info,{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true
    },
    fullname:{
        type: DataTypes.STRING,
        allowNull:false,
    },
    title:{
        type: DataTypes.STRING,
        allowNull:true
    },
    about:{
        type:DataTypes.STRING,
        allowNull:false
    },
    exp:{
        type:DataTypes.STRING,
        allowNull:false
    },
    location:{
        type:DataTypes.STRING,
        allowNull:false
    },
    tagline:{
        type:DataTypes.STRING,
        allowNull:true
    },
    userId:{
        type: DataTypes.INTEGER,
        references:{
            model: User,
            key:'id'
        },
        onDelete:'CASCADE'
    }
},{
    freezeTableName: true,
})

export default UserInfo;