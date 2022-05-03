const mongoose = require("mongoose")


const MessageSchema = new mongoose.Schema({
    email: {
        type: String
    },
    name: {
        type: String
    },
    message: {
        type: String
    },
    message: {
        type: String
    }
}, { timestamps: true });

const Message = mongoose.model("Message", MessageSchema);
module.exports = Message;
