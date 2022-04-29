const express = require("express");
const app = express();
const port = 8000;
const cors = require("cors");
const bodyParser = require('body-parser');
const fileUpload = require('express-fileUpload');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const nodemailer = require("nodemailer");

require('dotenv').config();

console.log("SECRET_KEY : " + process.env.SECRET_KEY)
app.use(cors());


require("./server/config/mongoose.config");

app.use(express.json(), express.urlencoded({ extended: true }),);


app.use('/uploads', express.static('uploads'));
app.use(cookieParser('NutritarianBlogSecure'));
app.use(session({
    secret: 'NutritarianBlocSecureSession',
    saveUninitialized: true,
    resave: true
}))
app.use(fileUpload());

require("./server/routes/recipe.routes")(app);
require("./server/routes/user.routes")(app);

app.listen(port, () => console.log(`running on port ${port} is a new way to be!`))


