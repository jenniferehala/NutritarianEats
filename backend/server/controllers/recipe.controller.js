const { Recipe } = require("../models/recipe.model");

module.exports.testResponse = (req, res) => {
    res.json({ message: "hey its me" });
}

module.exports.findAllRecipe = (req, res) => {
    Recipe.find({})
        .then(results => res.json({ results: results }))
        .catch(err => res.status(400).json({ message: "that didn't quite work.", err }));
}


module.exports.latestRecipe = (req, res) => {
    Recipe.find({}).sort({ _id: -1 }).limit(5)
        .then(results => res.json({ results: results }))
        .catch(err => res.status(400).json({ message: "that didn't quite work.", err }));
}

module.exports.allLatestRecipes = (req, res) => {
    Recipe.find({}).sort({ _id: -1 })
        .then(results => res.json({ results: results }))
        .catch(err => res.status(400).json({ message: "that didn't quite work.", err }));
}

module.exports.createRecipe = (req, res) => {
    req.body.rating = 0;
    Recipe.create(req.body)
        .then(newRecipes => res.json({ results: newRecipes }))
        .catch(err => res.status(400).json({ message: "that didn't work", err }))
}

module.exports.findOneRecipe = (req, res) => {
    Recipe.findOne({ _id: req.params._id })
        .then(results => res.json({ results: results }))
        .catch(err => res.status(400).json({ message: "that didn't quite work.", err }));
}


module.exports.deleteRecipe = (req, res) => {
    Recipe.deleteOne({ _id: req.params._id })
        .then(results => res.json({ results: results }))
        .catch(err => res.status(400).json({ message: "that didn't quite work.", err }));
}

module.exports.updateOneRecipe = (req, res) => {
    Recipe.updateOne({ _id: req.params._id }, req.body, { runValidators: true })
        // run update one you give it the query { _id: req.params._id } give it the information to change (req.body)
        //3rd parameter
        .then(results => res.json({ results: results }))
        .catch(err => res.status(400).json({ message: "that didn't quite work.", err }));
}

module.exports.upvoteRecipe = (req, res) => {
    Recipe.findOneAndUpdate({ _id: req.params._id }, { $inc: { rating: 1 } })
        .then(results => res.json({ results: results }))
        .catch(err => res.status(400).json({ message: "that didn't quite work.", err }));
}

// ***** SEARCH *** //

module.exports.searchRecipe = (req, res) => {
    const recName = req.params.term;
    Recipe.find({ $text: { $search: recName } })
        .then(results => res.json({ results: results }))
        .catch(err => res.status(400).json({ message: "that didn't quite work.", err }));
}

// Cuisine Routes

module.exports.findMainCuisine = (req, res) => {
    Recipe.aggregate([
        { $group: { _id: "$cuisine", image: { $first: "$cuisineImg" } } },
        { $project: { _id: 0, name: '$_id', image: 1 } }
    ]).limit(5)
        .then(results => res.json({ results: results }))
        .catch(err => res.status(400).json({ message: "that didn't quite work.", err }));
}


module.exports.findAllCuisine = (req, res) => {
    Recipe.aggregate([
        { $group: { _id: "$cuisine", image: { $first: "$cuisineImg" } } },
        { $project: { _id: 0, name: '$_id', image: 1 } }
    ])
        .then(results => res.json({ results: results }))
        .catch(err => res.status(400).json({ message: "that didn't quite work.", err }));
}

// module.exports.createCuisine = (req, res) => {
//     Cuisine.create(req.body)
//         .then(newCuisines =>
//             res.json({ results: newCuisines }))

//         .catch(err =>
//             res.status(400).json({ message: "that didn't work", err }))
// }


module.exports.findOneCuisine = (req, res) => {
    Recipe.find({ "cuisine": req.params.name })
        .then(results => res.json({ results: results }))
        .catch(err => res.status(400).json({ message: "that didn't quite work.", err }));
}

// module.exports.updateOneCuisine = (req, res) => {
//     Cuisine.updateOne({ _id: req.params._id }, req.body, { runValidators: true })
//         // run update one you give it the query { _id: req.params._id } give it the information to change (req.body)
//         //3rd parameter
//         .then(results => res.json({ results: results }))
//         .catch(err => res.status(400).json({ message: "that didn't quite work.", err }));
// }

// module.exports.deleteCuisine = (req, res) => {
//     Cuisine.deleteOne({ _id: req.params._id })
//         .then(results => res.json({ results: results }))
//         .catch(err => res.status(400).json({ message: "that didn't quite work.", err }));
// }
// Give it the query, we tell it to increase something $inc: increase what? {'score'} : 1}
//whats the query? whats the key you're increasing (score)?
// inc operator will increase a value
// 


// Recipe.update({},
//     {
//         "$set": {
//             "_id": ""
//         }
//     },
//     {
//         "multi": true,
//         "upsert": false
//     })



// async function insertDummyRecipeData() {
//     try {
//         await Recipe.insertMany([

//             {
//                 "title": "Chocolate Pecan Smoothie",
//                 "description": "This smoothie sounds decadent and tastes wonderful, but it is also packed with good-for-you, nutrient-dense ingredients.",
//                 "instructions": "Blend ingredients in a high-powered blender until smooth.",
//                 "serving": 2,
//                 "email": "jen@jen.com",
//                 "ingredientsList": [
//                     {
//                         "ingredient": "chopped kale",
//                         "quantity": 2,
//                         "unit": "cup(s)"
//                     },

//                     {
//                         "ingredient": "unsweetened soy, hemp or almond milk",
//                         "quantity": 0.5,
//                         "unit": "cup(s)"
//                     },

//                     {
//                         "ingredient": "pomegranate juice",
//                         "quantity": 0.5,
//                         "unit": "cup(s)"
//                     },

//                     {
//                         "ingredient": "unsweetened soy, hemp or almond milk",
//                         "quantity": 1,
//                         "unit": "cup(s)"
//                     },

//                     {
//                         "ingredient": "frozen cherries",
//                         "quantity": 2,
//                         "unit": "cup(s)"
//                     },

//                     {
//                         "ingredient": "banana",
//                         "quantity": 1,
//                         "unit": "none"
//                     },

//                     {
//                         "ingredient": "pecans",
//                         "quantity": 0.25,
//                         "unit": "cup(s)"
//                     },

//                     {
//                         "ingredient": "natural, unsweetened cocoa powder",
//                         "quantity": 3,
//                         "unit": "tablespoon(s)"
//                     },

//                     {
//                         "ingredient": "ground flax seeds",
//                         "quantity": 1,
//                         "unit": "tablespoon(s)"
//                     },
//                 ],
//                 "category": "Smoothies, Blended Salads and Juices",
//                 "cuisine": "American",
//                 "imgUrl": "https://www.drfuhrman.com/rollups/c394071fc4985fa4efc617dbd20f602209de6cc6025b42385e96197c7b6b1d83.jpg",
//                 "rating": 4,
//                 "comment": "",
//                 "source": "https://www.drfuhrman.com/recipes/553/chocolate-pecan-smoothie",
//                 "author": "www.DrFuhrman.com",
//                 "tags": [
//                     { "name": "Athletic/Higher caloric", "isChecked": true }
//                 ],
//                 "gbombs": [
//                     { "name": "Greens", "isChecked": true },
//                     // { "name": "Beans", "isChecked": true },
//                     // { "name": "Onions", "isChecked": true },
//                     // { "name": "Mushrooms", "isChecked": true },
//                     // { "name": "Berries", "isChecked": true },
//                     { "name": "Seeds", "isChecked": true },

//                 ]
//             },
            //             {
            //                 "title": "Thai Vegetable Curry",
            //                 "description": "No description",
            //                 "instructions": "Place the garlic, ginger, basil, cilantro, carrot juice, bell pepper, eggplant, green beans, mushrooms, bamboo shoots, crushed red pepper, curry powder, and 1 cup of the watercress in a wok or large skillet. Bring to a boil, cover, and simmer, stirring occasionally, until all the vegetables are tender. Mix in the peanut butter. Add the tofu, bring to a simmer, and toss until hot. Add the coconut milk and heat through. Top with the remaining 1 cup watercress. Garnish with basil or cilantro leaves, if desired. May be served over brown rice or quinoa.",
            //                 "serving": 6,
            //                 "email": "jen@jen.com",
            //                 "ingredientsList": [
            //                     {
            //                         "ingredient": "garlic, finely chopped",
            //                         "quantity": 4,
            //                         "unit": "clove(s)"
            //                     },

            //                     {
            //                         "ingredient": "finely chopped fresh ginger",
            //                         "quantity": 2,
            //                         "unit": "tablespoon(s)"
            //                     },

            //                     {
            //                         "ingredient": "chopped fresh basil",
            //                         "quantity": 2,
            //                         "unit": "tablespoon(s)"
            //                     },

            //                     {
            //                         "ingredient": "chopped fresh cilantro",
            //                         "quantity": 2,
            //                         "unit": "tablespoon(s)"
            //                     },

            //                     {
            //                         "ingredient": "Ccarrot juice (2 pounds carrots, juiced)",
            //                         "quantity": 2,
            //                         "unit": "cup(s)"
            //                     },

            //                     {
            //                         "ingredient": "red bell pepper, seeded and thinly sliced",
            //                         "quantity": 1,
            //                         "unit": "none"
            //                     },

            //                     {
            //                         "ingredient": "large eggplant, peeled, if desired, and cut into 1-inch cubes",
            //                         "quantity": 1,
            //                         "unit": "none"
            //                     },

            //                     {
            //                         "ingredient": "green beans, cut in 2-inch pieces",
            //                         "quantity": 2,
            //                         "unit": "dash"
            //                     },

            //                     {
            //                         "ingredient": "sliced shiitake mushrooms",
            //                         "quantity": 3,
            //                         "unit": "cup(s)"
            //                     },

            //                     {
            //                         "ingredient": "(8-ounce) can bamboo shoots, drained",
            //                         "quantity": 1,
            //                         "unit": "can(s)"
            //                     },
            //                     {
            //                         "ingredient": "crushed red pepper flakes, or adjusted to taste",
            //                         "quantity": 0.25,
            //                         "unit": "teaspoon(s)"
            //                     },
            //                     {
            //                         "ingredient": "garlic",
            //                         "quantity": 2,
            //                         "unit": "tablespoon(s)"
            //                     },
            //                     {
            //                         "ingredient": "curry powder",
            //                         "quantity": 1,
            //                         "unit": "teaspoon(s)"
            //                     },
            //                     {
            //                         "ingredient": "watercress leaves, divided",
            //                         "quantity": 2,
            //                         "unit": "cup(s)"
            //                     },
            //                     {
            //                         "ingredient": "unsalted, natural, chunky peanut butter",
            //                         "quantity": 3,
            //                         "unit": "tablespoon(s)"
            //                     },
            //                     {
            //                         "ingredient": "firm tofu, cut into ¼-inch-thick slices",
            //                         "quantity": 2,
            //                         "unit": "pound(s)"
            //                     },
            //                     {
            //                         "ingredient": "light coconut milk",
            //                         "quantity": 0.5,
            //                         "unit": "cup(s)"
            //                     },
            //                     {
            //                         "ingredient": "Basil or cilantro leaves, for garnish",
            //                         "quantity": 1,
            //                         "unit": "none"
            //                     },
            //                 ],
            //                 "category": "Main Dishes - Vegan",
            //                 "cuisine": "Thai",
            //                 "imgUrl": "https://www.drfuhrman.com/rollups/77618598628854a0c3a07b12fa10d9a6050b2a0c30e22af90cff9c522f4dd051.jpg",
            //                 "rating": 4,
            //                 "comment": "",
            //                 "source": "https://www.drfuhrman.com/recipes/372/thai-vegetable-curry",
            //                 "author": "www.DrFuhrman.com",
            //                 "tags": [
            //                     { "name": "Aggressive Weight Loss", "isChecked": true },
            //                     { "name": "Diabetes Reversal", "isChecked": true }
            //                 ],
            //                 "gbombs": [
            //                     { "name": "Greens", "isChecked": true },
            //                     { "name": "Beans", "isChecked": true },
            //                     { "name": "Onions", "isChecked": true },
            //                     // { "name": "Seeds", "isChecked": true },

            //                 ]
            //             },
            //             {
            //                 "title": "Bean Pasta and Vegetables with Thai Coconut Sauce",
            //                 "description": "Bean pastas are a great alternative way to get your daily serving of beans. In this flavor-packed dish, bean pasta and Asian vegetables are combined with a sauce made with coconut, lemon grass and ginger.",
            //                 "instructions": "Place coconut milk beverage, lemongrass, lime peel, and ginger in a saucepan. Bring to a boil, remove from heat, cover and let steep for 30 minutes. Mash lemongrass, lime peel, and ginger into mixture with a wooden spoon. Pour through a fine-mesh strainer to remove fibers. Add coconut milk to a high-powered blender along with shredded coconut, dates, lime juice, and cayenne pepper. Blend until smooth and creamy.In a large wok or skillet, heat water or white wine, add garlic, broccoli, carrots, and baby corn, and stir-fry for 2 minutes, adding more water as needed. Add mushrooms and bok choy and continue to cook until vegetables start to soften, about 4 minutes. Add coconut sauce, cover, and cook for 2 to 3 minutes until vegetables are crisp-tender.Meanwhile, cook spaghetti according to package directions.Serve pasta topped with vegetables and sauce. Sprinkle with lightly toasted nuts.",
            //                 "serving": 6,
            //                 "email": "jen@jen.com",
            //                 "ingredientsList": [
            //                     {
            //                         "ingredient": "coconut milk beverage",
            //                         "quantity": 2,
            //                         "unit": "cup(s)"
            //                     },

            //                     {
            //                         "ingredient": "(4-inch) stalks lemongrass, broken up into small pieces",
            //                         "quantity": 4,
            //                         "unit": "none"
            //                     },

            //                     {
            //                         "ingredient": "Peel of 1 organic lime, with pith removed",
            //                         "quantity": 1,
            //                         "unit": "none"
            //                     },

            //                     {
            //                         "ingredient": "1-inch piece ginger, peeled and minced",
            //                         "quantity": 1,
            //                         "unit": "none"
            //                     },

            //                     {
            //                         "ingredient": "unsweetened shredded coconut",
            //                         "quantity": 0.75,
            //                         "unit": "cup(s)"
            //                     },

            //                     {
            //                         "ingredient": "dates, pitted",
            //                         "quantity": 6,
            //                         "unit": "none"
            //                     },

            //                     {
            //                         "ingredient": "lime juice",
            //                         "quantity": 0.5,
            //                         "unit": "tablespoon(s)"
            //                     },

            //                     {
            //                         "ingredient": "cayenne pepper, or more to taste",
            //                         "quantity": 0.125,
            //                         "unit": "teaspoon(s)"
            //                     },

            //                     {
            //                         "ingredient": "water or white wine",
            //                         "quantity": 2,
            //                         "unit": "tablespoon(s)"
            //                     },

            //                     {
            //                         "ingredient": "garlic",
            //                         "quantity": 2,
            //                         "unit": "clove(s)"
            //                     },
            //                     {
            //                         "ingredient": "broccoli florets, cut into bite-size pieces",
            //                         "quantity": 3,
            //                         "unit": "cup(s)"
            //                     },
            //                     {
            //                         "ingredient": "carrots, sliced into 1/4-inch pieces",
            //                         "quantity": 0.5,
            //                         "unit": "cup(s)"
            //                     },
            //                     {
            //                         "ingredient": "baby corn ears",
            //                         "quantity": 8,
            //                         "unit": "ounce(s)"
            //                     },
            //                     {
            //                         "ingredient": "mushrooms, sliced",
            //                         "quantity": 10,
            //                         "unit": "ounce(s)"
            //                     },
            //                     {
            //                         "ingredient": "sliced bok choy",
            //                         "quantity": 3,
            //                         "unit": "cup(s)"
            //                     },
            //                     {
            //                         "ingredient": "1 (7 ounce) package black bean spaghetti",
            //                         "quantity": 1,
            //                         "unit": "ounce(s)"
            //                     },
            //                     {
            //                         "ingredient": "raw macadamia nuts, raw cashews, or raw Spanish peanuts, lightly toasted",
            //                         "quantity": 0.25,
            //                         "unit": "cup(s)"
            //                     },
            //                 ],
            //                 "category": "Main Dishes - Vegan",
            //                 "cuisine": "Thai",
            //                 "imgUrl": "https://www.drfuhrman.com/rollups/eb9c3a1e84ea0e3231e714684c45d5e5aef356d134a4aa1ab166e73416809914.jpg",
            //                 "rating": 5,
            //                 "comment": "",
            //                 "source": "https://likeabubblingbrook.com/vegan-thai-beans-curry/https://www.drfuhrman.com/recipes/2011/bean-pasta-and-vegetables-with-thai-coconut-sauce",
            //                 "author": "James Rohrbacher",
            //                 "tags": [
            //                     { "name": "Athletic/Higher caloric", "isChecked": true }
            //                 ],
            //                 "gbombs": [
            //                     { "name": "Greens", "isChecked": true },
            //                     { "name": "Beans", "isChecked": true },
            //                     { "name": "Onions", "isChecked": true },
            //                     { "name": "Mushrooms", "isChecked": true },

            //                 ]
            //             },

//         ])
//     }
//     catch (error) {
//         console.log('err', + error.response)
//     }
// }

// insertDummyRecipeData();


// async function insertDummyCuisineData() {
//     try {
//         await Cuisine.insertMany([
//             {
//                 "name": "American",
//                 "image": "American_food.jpg"
//             },
//             {
//                 "name": "Thai",
//                 "image": "Thai_food.jpg"
//             },
//             {
//                 "name": "Chinese",
//                 "image": "Chinese_food.jpg"
//             },
//             {
//                 "name": "Mexican",
//                 "image": "Mexican_food.jpg"
//             },
//             {
//                 "name": "Spanish",
//                 "image": "Spanish_food.jpg"
//             }
//         ])
//     }
//     catch (error) {
//     console.log('err', + error)
// }
// }

// insertDummyCuisineData();