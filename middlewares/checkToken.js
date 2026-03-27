import jwt from 'jsonwebtoken'


export const checkToken = async (req, res, next) => {
    const token = req.headers.authorization
    try{
        const decoded = await jwt.verify(token, process.env.JWT_SECRET)
        if(decoded){
            req.token = decoded
            next()
        }
        
    }
    catch(err){
        console.log(err)
        res.status(500).json(`Access denied`)
    }
}