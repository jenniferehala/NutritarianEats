const express = require("express");
const cors = require("cors");
const app = express();
const port = 8000;

// const fileUpload = require('express-fileUpload');
// app.use(fileUpload());

const session = require('express-session');
const cookieParser = require('cookie-parser'); // so that server can understand the cookie info coming in from client (browser)
// const flash = require('express-flash');


app.use(cookieParser());
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
require('dotenv').config();



app.use(express.json(), express.urlencoded({ extended: true }));
// app.use('/uploads', express.static('uploads'));
app.use(session({
    secret: 'NutritarianBlogSecureSession',
    saveUninitialized: true,
    resave: true
}))
// const flash = require('connect-flash');

// app.use(require(flash()));


require("./server/routes/recipe.routes")(app);
require("./server/routes/user.routes")(app);

require("./server/config/mongoose.config");




app.listen(port, () => console.log(`running on port ${port} is a new way to be!`))


