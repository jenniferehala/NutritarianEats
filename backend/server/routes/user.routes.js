const UserController = require("../controllers/user.controller");

module.exports = app => {

    app.post("/api/recipes/contact", UserController.contactUs);

}