import {DataTypes} from 'sequelize'
import { sequelize } from '../config/database.js'


const Recipe = sequelize.define(`Recipe`, {
    title : {
        type : DataTypes.STRING,
        allowNull : false
    }, 
    ingredients : {
        type : DataTypes.STRING,
        allowNull : false
    },
    img : {
        type : DataTypes.STRING,
        allowNull : true
    },
    category : {
        type : DataTypes.STRING,
        allowNull : false
    }
})


export default Recipe