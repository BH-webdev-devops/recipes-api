import User from '../models/User.js'


export const checkIsAdmin = async (req, res , next ) => {
    const {id} = req.token
    try{
        const userByID = await User.findByPk(id)
        if(!userByID){
            return res.status(404).json(`No user found`)
        }
        if(userByID.role !== 'admin'){
            return res.status(400).json(`Access denied`)
        }
        next()

    }
    catch(err){
        console.log(err)
        res.status(500).json(`Internal server error`)
    }
}


