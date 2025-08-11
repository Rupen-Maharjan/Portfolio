import sequelize from "../../connect.js";
import { DataTypes } from "sequelize";
import User from "../users/user.js";
import env from 'dotenv'

env.config()
const edu = process.env.EDU_TBL;

const Edu = sequelize.define(edu,{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    degree:{
        type:DataTypes.STRING,
        allowNull:false
    },
    school:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    completed:{
        type:DataTypes.BOOLEAN,
        allowNull:false
    },
    major:{
        type:DataTypes.STRING,
        allowNull:false
    },
    level:{
        type:DataTypes.STRING,
        allowNull:true,
    },
    joined:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    compYear:{
        type:DataTypes.INTEGER,
        allowNull:true
    }
},{
    freezeTableName:true
})


export default Edu;