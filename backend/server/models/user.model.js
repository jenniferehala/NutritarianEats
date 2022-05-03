const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "First name is required"]
    },
    lastName: {
        type: String,
        required: [true, "Last name is required"]

    },
    email: {
        type: String,
        required: [true, "Email is required"],
        validate: {
            validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
            message: "Please enter a valid email"
        }

    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [3, 'Password must be 3 characters or longer']

    },
}, { timestamps: true });

// add this after UserSchema is defined
UserSchema.virtual('confirmPassword')
    .get(() => this._confirmPassword)
    .set(value => this._confirmPassword = value);
// create a virtual field called "confirm" that is used just to validate the password matches confirm ---> 
// the getter and setter above are just creating temporary fields for _confirm


// before (pre) running the other validations on the model, validate the user objects password matches
//if they don't match, this.invalidate() will create validation error message
UserSchema.pre('validate', function (next) {
    if (this.password !== this.confirmPassword) {
        this.invalidate('confirmPassword', 'Password must match confirm password');
    }
    next(); // after the above process is done, go to next usual step
});


//before saving user to the db (this means we have passed the validations), hash the users password (encrypt it)
UserSchema.pre('save', function (next) {
    bcrypt.hash(this.password, 10)
        .then(hash => {
            this.password = hash;
            next();
        });
});



const MessageSchema = new mongoose.Schema({
    email: {
        type: String
    },
    name: {
        type: String
    },
    message: {
        type: String
    }
}, { timestamps: true });


const User = mongoose.model("User", UserSchema);
// const Message = mongoose.model("Message", MessageSchema);
// const Message = mongoose.model("Message", MessageSchema);

module.exports = { User: User }
// module.exports = User;
// module.exports = Message;
