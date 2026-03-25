import Recipe from "../models/Recipe.js"
import User from "../models/User.js"



export const checkIfRecipeExist = async (req,res, next) => {
    const {id} = req.params
    try{
        const recipe = await Recipe.findByPk(id,
            {
                attributes: ["id", "title", "ingredients", "img", "category"],
                include: [
                    {
                        model: User,
                        as: 'author',
                        attributes: ['id', 'firstName', 'email']
                    }]
            })
        if(!recipe){
            res.status(404).json(`Recipe not found with this ID`)
        }
        req.recipe = recipe
        next()
    }
     catch (err) {
        console.log(err)
        return res.status(500).json(`Internal server error`)
    }
} 