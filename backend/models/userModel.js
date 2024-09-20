const mongoose = require('mongoose');


let userSchema = new mongoose.Schema({
    name: String,
    username: String,
    email: String,
    password: String,
    date: {
        type: Date,
        default: Date.now
    },
    isBlockend: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('User', userSchema);