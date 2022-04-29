const UserController = require("../controllers/user.controller");

module.exports = app => {

    app.post("/api/recipes/contact", UserController.contactUs);
    app.post("/api/users/register", UserController.registerUser);
    app.post("/api/users/logout", UserController.logoutUser);
    app.get("/api/users", UserController.getAllUsers);
    app.delete("/api/users/:_id/delete", UserController.deleteUser);


}