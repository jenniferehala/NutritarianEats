const UserController = require("../controllers/user.controller");

module.exports = app => {

    app.post("/api/recipes/contact", UserController.contactUs);
    app.post("/api/users/create", UserController.createUser);
    app.get("/api/users", UserController.getAllUsers);
    app.delete("/api/users/:_id/delete", UserController.deleteUser);


}