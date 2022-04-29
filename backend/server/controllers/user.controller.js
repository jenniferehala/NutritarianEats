const { User } = require("../models/user.model");
const { Message } = require("../models/user.model");
const nodemailer = require("nodemailer");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const contactEmail = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: "jennifer.ehala@gmail.com",
        pass: "Charlie7",
    },
});

contactEmail.verify((error) => {
    if (error) {
        console.log(error);
    } else {
        console.log("Ready to Send");
    }
});

// ******* MESSAGE ROUTE *******//

module.exports.contactUs = (req, res) => {
    Message.create(req.body)
        .then(newUser => {
            res.json({ results: newUser })
            const name = req.body.name;
            const email = req.body.email;
            const message = req.body.message;
            const mail = {
                from: name,
                to: "jennifer.ehala@gmail.com",
                subject: "Contact Form Submission",
                html: `<p>Name: ${name}</p>
                <p>Email: ${email}</p>
                <p>Message: ${message}</p>`,
            };
            contactEmail.sendMail(mail, (error) => {
                if (error) {
                    res.json({ status: "ERROR" });
                } else {
                    res.json({ status: "Message Sent" });
                }
            });
        })
        .catch(err => res.status(400).json({ message: "that didn't work", err }))
};

// ******* USER ROUTES *******//

module.exports.getAllUsers = (req, res) => {
    User.find()
        .then(allUsers => {
            res.json({ results: allUsers })
        })
        .catch(err => {
            res.json({ error: err })
        })
};


// ******* LOGIN ROUTE *******//

module.exports.login = async (req, res) => {
    const user = await User.findOne({ email: req.body.email });

    if (user === null) {
        // email not found in users collection
        return res.sendStatus(400);
    }

    // if we made it this far, we found a user with this email address
    // let's compare the supplied password to the hashed password in the database
    const correctPassword = await bcrypt.compare(req.body.password, user.password);

    if (!correctPassword) {
        // password wasn't a match!
        return res.sendStatus(400);
    }

    // if we made it this far, the password was correct
    const userToken = jwt.sign({
        id: user._id
    }, process.env.SECRET_KEY);

    // note that the response object allows chained calls to cookie and json
    res
        .cookie("usertoken", userToken, secret, {
            httpOnly: true
        })
        .json({ msg: "success!" });
};

// ******* REGISTER ROUTE *******//


module.exports.registerUser = (req, res) => {
    User.create(req.body)
        .then(user => {
            const userToken = jwt.sign({
                id: user._id
            }, process.env.SECRET_KEY);

            res
                .cookie("usertoken", userToken, process.env.SECRET_KEY, {
                    httpOnly: true
                })
                .json({ msg: "success!", user: user });
        })
        .catch(err => res.json(err));
};

// ******* LOGOUT ROUTE *******//

module.exports.logoutUser = (req, res) => {
    res.clearCookie('usertoken');
    res.sendStatus(200);
};

// ******* USER DELETE ROUTE *******//

module.exports.deleteUser = (req, res) => {
    User.deleteOne({ _id: req.params._id })
        .then(results => res.json({ results: results }))
        .catch(err => res.status(400).json({ message: "that didn't quite work.", err }));
};


