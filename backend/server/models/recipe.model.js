const mongoose = require("mongoose")

const CuisineSchema = new mongoose.Schema({

    // _id: { type: String },


    name: {
        type: String,
        required: [2, "Need name for cuisine"],
        ref: 'Recipe',
        // enum: ['Indian', 'American', 'Thai', 'Mexican', 'Spanish', 'Chinese'],

    },
    image: {
        type: String,
        required: [2, "you need an image"]

    }

}, { timestamps: true });

const Cuisine = mongoose.model("Cuisine", CuisineSchema);
// module.exports.saveCuisine = function (newCuisine, callback) {
//     newCuisine.save(callback);
// };


const RecipeSchema = new mongoose.Schema({

    title: {

        type: String,
        required: [2, "Need title for Recipe!"]
    },

    description: {
        type: String,
        required: [2, "Need description!"]
    },

    instructions: {
        type: String,
        required: [2, "Need instructions!"]
    },

    serving: {
        type: Number,
        min: [1, "you need at least one serving!"]
    },

    email: {
        type: String,
        required: [2, "Need email!"]

    },

    ingredientsList:
        [
            {
                ingredient: {
                    type: String,
                },
                quantity: {
                    type: Number,
                },
                unit: {
                    type: String,
                    enum: ["none", "block(s)", "bushel(s)", "clove(s)", "can(s)", "drop(s)", "smidgen", "pinch", "dash", "teaspoon(s)", "tablespoon(s)", "fl oz(s)", "ounce(s)", "cup(s)", "pint(s)", "quart(s)", "gallon(s)", "pound(s)", "milliliter(s)", "liter(s)"]

                },
            }
        ],


    category: {
        type: String,
        required: [true, "This category field is required!"],
        minLength: [2, "you need at least 2 characters!"],
        enum: ['Breakfast', 'Burgers, Pizza, Wraps and Chips', 'Desserts', 'Main Dishes - Vegan', 'Non-Vegan', 'Dressings, Dips and Sauces', 'Salads', 'Smoothies, Blended Salads and Juices', 'Soups and Stews']
    },

    cuisine: {
        type: String,
        required: [true, "This cuisine field is required!"],
        minLength: [2, "you need at least 2 characters!"],
        enum: ['Indian', 'American', 'Thai', 'Mexican', 'Spanish', 'Chinese'],
        ref: 'Cuisine'
    },

    imgUrl: {
        type: String,
        required: [2, "You need an image!"]
    },

    rating: {
        type: Number,
        required: [2, "You need a number!"],
    },

    comment: {
        type: String,
    },

    source: {
        type: String,
        required: [2, 'This source field is required']
    },

    author: {
        type: String,
        required: [2, 'This source field is required']
    },

    tags:
        [
            {
                name: {
                    type: String
                },

                isChecked: {
                    type: Boolean
                }
            },
        ],


    gbombs:
        [
            {
                name: {
                    type: String
                },

                isChecked: {
                    type: Boolean
                }
            },
        ],

}, { timestamps: true });



const Recipe = mongoose.model("Recipe", RecipeSchema);

module.exports = {
    Cuisine: Cuisine,
    Recipe: Recipe
}


// pass in a string so mongoose has some info about the name of
// of our collection which is "Recipe", and we are going to pass over the schema "RecipeSchema"


//means any file that imports this, like the controller is going to import it, we will definitely have access to our collection