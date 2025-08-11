import sequelize from "../../connect.js";
import { DataTypes } from "sequelize";
import User from "../users/user.js";
import env from 'dotenv'

env.config()
const contact = process.env.CONTACT_TBL;

const Contact= sequelize.define(contact,{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    icon:{
        type:DataTypes.STRING,
        allowNull:true
    },
    url:{
        type:DataTypes.STRING,
        allowNull:false
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
    freezeTableName:true
})


export default Contact;