const RecipeController = require("../controllers/recipe.controller");
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {

        cb(null, file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
        cb(null, true)
    } else {
        cb(null, false);
    }
}
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});


module.exports = app => {
    app.get("/api/recipes/findAll", RecipeController.findAllRecipe);
    app.get("/api/recipes/latest", RecipeController.latestRecipe);
    app.get("/api/recipes/explore/random", RecipeController.randomRecipe);
    app.get("/api/recipes/explore/latestRecipes", RecipeController.allLatestRecipes);
    app.post("/api/recipes/create", upload.fields([{ name: 'cuisineImg', maxCount: 1 }, { name: 'imgUrl', maxCount: 1 }]), RecipeController.createRecipe);
    app.get("/api/recipes/:_id", RecipeController.findOneRecipe);
    app.delete("/api/recipes/:_id/delete", RecipeController.deleteRecipe);
    app.patch("/api/recipes/:_id/edit", RecipeController.updateOneRecipe);
    app.patch("/api/recipes/:_id/upvote", RecipeController.upvoteRecipe);

    // Get Search Route
    app.get("/api/recipes/searchRecipes/:searchTerm", RecipeController.searchRecipe);

    // Cuisine Routes
    app.get("/api/recipes/cuisine/findMainCuisine", RecipeController.findMainCuisine);
    app.get("/api/recipes/cuisine/findAllCuisine", RecipeController.findAllCuisine);
    app.get("/api/recipes/cuisine/:name", RecipeController.findOneCuisine);

}
