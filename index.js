import express, { application } from 'express'
const app = express()
import { sequelize } from './config/database.js'
import usersRouter from './routes/userRoutes.js'
import recipesRouter from './routes/recipeRoutes.js'
import { applyAssociations } from './models/associations.js'
import 'dotenv/config'
app.use(express.json())
app.use(express.urlencoded({extended: false}))


app.use('/api', usersRouter, recipesRouter)


app.listen(3000, async () => {
    try {
        await sequelize.authenticate()
        console.log('Connection has been established successfully.');
        await applyAssociations()
        await sequelize.sync({ alter: true });
    }
    catch (err) {
        return console.log(err)
    }
})