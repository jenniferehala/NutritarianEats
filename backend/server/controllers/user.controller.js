const { User } = require("../models/user.model");
const nodemailer = require("nodemailer");

// ******* CONTACT ROUTE *******//

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


module.exports.contactUs = (req, res) => {
    console.log(req.body)
    User.create(req.body)

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
