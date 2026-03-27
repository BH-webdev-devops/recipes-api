import User from "../models/User.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'


export const registerNewUser = async (req, res) => {
    const { firstName, email, password, role } = req.body
    if (!firstName || !email || !password) {
        return res.status(400).json(`All fields are required`)
    }
    try {
        const verifyUser = await User.findOne({ where: { email } })
        if (verifyUser) {
            return res.status(400).json(`Email already taken`)
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = await User.create({
            firstName,
            email,
            password: hashedPassword,
            role
        })

        return res.status(201).json(`Welcome to the recipes app ${newUser.firstName}`)
    }
    catch (err) {
        console.log(err)
        return res.status(500).json(`Internal server error`)
    }
}


export const loginUser = async (req, res) => {
    const { email, password } = req.body.userInfo

    if (!email || !password) {
        return res.status(400).json(`Email and password are required`)
    }
    try {
        const verifyUser = await User.findOne({ where: { email } })
        if (!verifyUser) {
            return res.status(400).json(`Email or password are not valid`)
        }
        const verifyPassword = await bcrypt.compare(password, verifyUser.password)
        if (!verifyPassword) {
            return res.status(400).json({error : 'Email or password are not valid'})
        }
        const token = await jwt.sign({ id: verifyUser.id }, process.env.JWT_SECRET, { expiresIn: '7d' })


        return res.status(200).json({ token, message: `Welcome ${verifyUser.firstName}`})
        // return res.status(200).json(token)
    }

    catch (err) {
        console.log(err)
        return res.status(500).json(`Internal server error`)
    }
}


export const getUser = async (req, res) => {
    const {id} = req.token
    try{
        const user = await User.findByPk(id, {
            attributes : {exclude : ['password']}
        })
        if(!user){
            return res.status(404).json(`User not found`)
        }
        return res.status(200).json(user)
    }
    catch (err) {
        console.log(err)
        return res.status(500).json(`Internal server error`)
    }
}