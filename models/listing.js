const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String
    },
    shortDesc: {
        type: String,
        required:true
    },
    detailedDesc: {
        type: String,
        required:true
    },
    address:{
        type: String,
        required:true
    },
    image:{
        type:String,
        require:true
    },
    date:{
        type: Date,
        require:true
    }
})
//'user' collection in the database
const listing = mongoose.model('listing', listingSchema);

module.exports = listing;