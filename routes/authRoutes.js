import {Router} from 'express'
import { regiterNewUser, loginUser } from '../controllers/authController.js'
const authRoutes = Router()



authRoutes.post('/register', regiterNewUser)
authRoutes.post('/login', loginUser)


export default authRoutes