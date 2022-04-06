const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const IngredientSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    amount: {
        type: String,
        required: true,
    }
});

const Ingredient = mongoose.model('Ingredient', IngredientSchema);

const CocktailSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    title: {
        type: String,
        required: true
    },
    image: {
        type: null | String,
    },
    recipe: {
        type: String,
        required: true
    },
    isPublished: {
        type: Boolean,
        default: false,
        required: true
    },
    ingredients: {
        type: [Ingredient],
        required: true
    }
});

const Cocktail = mongoose.model('Cocktail', CocktailSchema);

module.exports = Cocktail;