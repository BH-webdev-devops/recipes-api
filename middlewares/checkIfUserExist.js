import User from "../models/User.js"


export const checkIfUserExist = async (req, res, next) => {
    try{
        const userByID = await User.findByPk(req.body.userID)
        if(!userByID){
            res.status(400).json(`User not found with this ID`)
        }
        next()
    }
    catch(err){
        res.status(500).json(`Internal server error`)
    }
}