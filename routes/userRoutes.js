import { Router } from 'express'
const usersRouter = Router()
import { createUser, getAllUsers, getUserByID, updateUserByID } from '../controllers/userController.js'
import { checkID } from '../middlewares/checkID.js'
import { upload } from '../middlewares/fileUpload.js'
import { checkToken } from '../middlewares/checkToken.js'
import { checkIsAdmin } from '../middlewares/checkIsAdmin.js'


/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Retrieve a list of users
 *     responses:
 *       200:
 *         description: A list of users
 */
usersRouter.get(`/users`, checkToken, checkIsAdmin, getAllUsers)
usersRouter.get(`/user/:id`, checkID, getUserByID)
/**
 * @swagger
 * /api/user:
 *   post:
 *     summary: Create a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully
 */
usersRouter.post(`/user`, upload.single('img'), createUser)
usersRouter.put(`/user/:id`, checkID, updateUserByID)



export default usersRouter