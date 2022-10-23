const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required:true,
        minLength:8
    },
    isLoggedIn:{
        type: Boolean,
        default: false
    }
})
//'user' collection in the database
const user = mongoose.model('user', userSchema);

module.exports = user;