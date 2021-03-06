const RecipeController = require("../controllers/recipe.controller");

module.exports = app => {

    app.get("/api/recipes/findAll", RecipeController.findAllRecipe);
    app.get("/api/recipes/latest", RecipeController.latestRecipe);
    app.get("/api/recipes/explore/random", RecipeController.randomRecipe);
    app.get("/api/recipes/explore/latestRecipes", RecipeController.allLatestRecipes);
    app.get("/api/recipes/:_id", RecipeController.findOneRecipe);
    app.post("/api/recipes/create", RecipeController.createRecipe);
    app.delete("/api/recipes/:_id/delete", RecipeController.deleteRecipe);
    app.patch("/api/recipes/:_id/edit", RecipeController.updateOneRecipe);

    // Get Search Route
    app.get("/api/recipes/searchRecipes/:searchTerm", RecipeController.searchRecipe);

    // Cuisine Routes
    app.get("/api/recipes/cuisine/findMainCuisine", RecipeController.findMainCuisine);
    app.get("/api/recipes/cuisine/findAllCuisine", RecipeController.findAllCuisine);
    app.get("/api/recipes/cuisine/:name", RecipeController.findOneCuisine);



};
