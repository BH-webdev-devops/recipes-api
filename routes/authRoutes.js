import {Router} from 'express'
import { registerNewUser, loginUser, getUser } from '../controllers/authController.js'
import { checkToken } from '../middlewares/checkToken.js'
const authRoutes = Router()



authRoutes.post('/register', registerNewUser)
authRoutes.post('/login', loginUser)
authRoutes.get('/auth/me', checkToken, getUser )


export default authRoutes