import Recipe from "../models/Recipe.js";
import User from "../models/User.js";


export const getAllRecipes = async (req, res) => {
    console.log(req.token)
    try {
        const recipes = await Recipe.findAll({
            attributes: ["id", "title", "ingredients", "img", "category"],
            include: [
                {
                    model: User,
                    as: 'author',
                    attributes: ["id", "firstName", "email"]
                },

            ],
        }
        )
        if (recipes.length < 1) {
            return res.status(404).json(`Recipes not found`)
        }
        return res.status(200).json(recipes)
    }
    catch (err) {
        return res.status(500).json(`Internal server error`)
    }
}

export const createRecipe = async (req, res) => {
    const { title, img, ingredients, category } = req.body
    try {
        const newRecipe = await Recipe.create({
            title,
            img,
            ingredients,
            category,
            userID: req.token.id
        })
        return res.status(201).json(newRecipe)
    }

    catch (err) {
        return res.status(500).json(`Internal server error`)
    }
}

export const getRecipeByID = async (req, res, recipeID) => {
    console.log(recipeID)

    const { id } = req.params
    try {
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
        if (!recipe) {
            return res.status(404).json(`No recipe found with this ID`)
        }
        return res.status(200).json(recipe)

    }
    catch (err) {
        return res.status(500).json(`Internal server error`)
    }
}





export const updateRecipeByID = async (req, res) => {
    const { recipe } = req
    const { title, ingredients, img, category } = req.body
    const token = req.token
    if (token.id !== recipe.author.id) {
        return res.status(400).json(`You are not the author of the recipe`)
    }

    try {
        const updatedRecipe = await recipe.update({
            title,
            ingredients,
            img,
            category,
            userID: recipe.author.id
        }
        )
        await updatedRecipe.save()
        return res.status(200).json(updatedRecipe)
    }

    catch (err) {
        console.log(err)
        return res.status(500).json(`Internal server error`)
    }
}