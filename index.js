import express from 'express'
const app = express()
import { sequelize } from './config/database.js'
import usersRouter from './routes/userRoutes.js'
import recipesRouter from './routes/recipeRoutes.js'
import authRouter from './routes/authRoutes.js'
import { applyAssociations } from './models/associations.js'
import { swaggerSpec } from './config/swagger.js'
import swaggerUi from 'swagger-ui-express'
import path from 'path'
import fs from 'fs'
import cors from 'cors'
import 'dotenv/config'
const PORT = process.env.PORT || 8080;
app.use(express.json())
app.use(express.urlencoded({ extended: false }))


app.use(cors())
app.use(express.static('public'))
app.use('/images', express.static('public/images'));


app.get('/public/images/:filename', (req, res) => {
    const file = `public/images/${req.params.filename}`;
    res.sendFile(path.resolve(file));
});

app.get('/images', (req, res) => {
  fs.readdir('public/images', (err, files) => {
    if (err) {
      return res.status(500).send({ error: err });
    }
    res.send({ images: files });
  });
});


app.get('/', (req, res) => {
    res.send(`Welcome to the recipes API`)
})

app.use('/api', usersRouter, recipesRouter, authRouter)
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(PORT, async () => {
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