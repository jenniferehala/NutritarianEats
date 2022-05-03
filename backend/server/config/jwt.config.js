const jwt = require("jsonwebtoken");


module.exports.authenticate = (req, res, next) => {
    jwt.verify(req.cookies.usertoken, process.env.SECRET_KEY, (err, payload) => {
        console.log(err)
        if (err) {
            // res.status(401).json({ verified: false });
            res.redirect("/")
        } else {
            return next();
        }
    });
}