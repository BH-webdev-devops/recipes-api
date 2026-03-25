import User from './User.js'
import Recipe from './Recipe.js'


export const applyAssociations = () => {
    User.hasMany(Recipe, {
        foreignKey : 'userID',
        as : 'recipes',
        onDelete : 'CASCADE',
        onUpdate : 'CASCADE'
    }),
    Recipe.belongsTo(User, {
        foreignKey : 'userID',
        as : 'author',
        onDelete : 'CASCADE',
        onUpdate : 'CASCADE'
    })
}

export {User, Recipe}