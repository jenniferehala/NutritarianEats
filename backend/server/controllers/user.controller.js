const { User } = require("../models/user.model");
const Message = require("../models/message.model");
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

//******* MESSAGE ROUTE *******//

module.exports.contactUs = (req, res) => {
    console.log('message body', req.body)
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
    console.log('req.body', req.body);
    const user = await User.findOne({ email: req.body.email })
    if (user === null) {
        return res.json({ error: "User Not Found" });
    }
    console.log(req.body.password)
    const correctPassword = await bcrypt.compare(req.body.password, user.password)
    if (!correctPassword) {
        return res.json({ error: "Not correct password" })
    }

    const userToken = jwt.sign({
        id: user._id
    }, process.env.SECRET_KEY);
    res
        .cookie("userToken", userToken, process.env.SECRET_KEY, {
            httpOnly: true
        })
        .json({ msg: 'success' })

}

// ******* REGISTER ROUTE *******//


module.exports.registerUser = (req, res) => {
    console.log("register user: ", req.body)
    User.find({ email: req.body.email })   //nested promise
        .then(userWithEmail => {
            console.log("response when finding user: ", userWithEmail)
            if (userWithEmail.length === 0) {
                // console.log(req.body)
                User.create(req.body)
                    .then(user => {
                        const userToken = jwt.sign({
                            id: user._id
                        }, process.env.SECRET_KEY);
                        res
                            .cookie("usertoken", userToken, process.env.SECRET_KEY, {
                                httpOnly: true
                            })
                            .json({ msg: "successfully created user", user: user });
                    })
                    .catch(err => res.json(err))
            } else {
                res.json({ errors: { email: { message: "Email is taken!" } } })
            }
        })
        .catch(err => console.log("errr!  ", err))
};

// ******* LOGOUT ROUTE *******//

module.exports.logout = (req, res) => {
    console.log("this backend worked")
    res.clearCookie('userToken');
    res.sendStatus(200);
};

// ******* LOGGED IN ROUTE *******//

module.exports.loggedInUser = (req, res) => {
    // use the info stored in cookie to get id of user
    const decodedJWT = jwt.decode(req.cookies.userToken, { complete: true })

    // decodedJWT.payload.id
    User.findOne({ _id: decodedJWT.payload.id })
        .then(foundUser => {
            res.json({ result: foundUser })
        })
        .catch(err => {
            res.json(err)
        })
}


// ******* USER DELETE ROUTE *******//

module.exports.deleteUser = (req, res) => {
    User.deleteOne({ _id: req.params._id })
        .then(results => res.json({ results: results }))
        .catch(err => res.status(400).json({ message: "that didn't quite work.", err }));
};
