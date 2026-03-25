import { Router } from 'express'
const usersRouter = Router()
import { createUser, getAllUsers, getUserByID, updateUserByID } from '../controllers/userController.js'
import { checkID } from '../middlewares/checkID.js'


usersRouter.get(`/users`, getAllUsers)
usersRouter.get(`/user/:id`, checkID, getUserByID)
usersRouter.post(`/user`, createUser)
usersRouter.put(`/user/:id`, checkID, updateUserByID)



export default usersRouter