import {Router} from 'express'
import { createRecipe, getAllRecipes, getRecipeByID, updateRecipeByID } from '../controllers/recipeController.js'
import { checkIfUserExist } from '../middlewares/checkIfUserExist.js'
import { checkIfRecipeExist } from '../middlewares/checkIfRecipeExist.js'
const recipesRouter = Router()


// Get all recipes
recipesRouter.get(`/recipes`, getAllRecipes)
// Get a recipe by it's ID
recipesRouter.get(`/recipe/:id`, getRecipeByID)
// Create a new recipe
recipesRouter.post(`/recipe`,checkIfUserExist, createRecipe)
// Update a recipe by it's ID
recipesRouter.put(`/recipe/:id`,checkIfRecipeExist, updateRecipeByID)

export default recipesRouter