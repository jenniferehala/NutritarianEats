const UserController = require("../controllers/user.controller");
const { authenticate } = require('../config/jwt.config');


module.exports = app => {

    app.post("/api/users/contact", UserController.contactUs);
    app.post("/api/users/register", UserController.registerUser);
    app.post("/api/users/login", UserController.login);
    app.get("/api/users/logout", UserController.logout);
    app.get("/api/users", authenticate, UserController.getAllUsers);
    app.get("/api/users/getloggedinuser", UserController.loggedInUser);
    app.delete("/api/users/:_id/delete", UserController.deleteUser);



}