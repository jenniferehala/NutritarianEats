const { User } = require("../models/user.model");
const { Message } = require("../models/user.model");
const nodemailer = require("nodemailer");


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

// ******* USER LOGIN ROUTE *******//

module.exports.getAllUsers = (req, res) => {
    User.find()
        .then(allUsers => {
            res.json({ results: allUsers })
        })
        .catch(err => {
            res.json({ error: err })
        })
};

module.exports.createUser = (req, res) => {
    User.create(req.body)
        .then(user => {
            res.json({ msg: "success!", user: user });
        })
        .catch(err => res.json(err));
};

// ******* USER DELETE ROUTE *******//

module.exports.deleteUser = (req, res) => {
    User.deleteOne({ _id: req.params._id })
        .then(results => res.json({ results: results }))
        .catch(err => res.status(400).json({ message: "that didn't quite work.", err }));
};


