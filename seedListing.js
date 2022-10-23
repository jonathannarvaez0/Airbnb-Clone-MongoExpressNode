const mongoose = require("mongoose");

const Listing = require('./models/listing');

mongoose.connect('mongodb://localhost:27017/airbnb')
    .then(() => {
        console.log("Connection Open");
    })
    .catch(err => {
        console.log("Error");
        console.log(err);
    })

const seedListing = [
    {
        name: 'Manila Condo',
        username: 'Jonathan Narvaez',
        shortDesc:'2 bedrooms',
        detailedDesc:'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laudantium blanditiis in quae dolor eum itaque.',
        address: '452 Cristobal Street, Sampaloc, Manila, 1008 Metro Manila',
        date:'2022-10-16',
        image:'https://images.unsplash.com/photo-1553444836-bc6c8d340ba7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80'
    },
    {
        name: 'Makati Condo',
        username: 'Jonathan Narvaez',
        shortDesc:'4 bedrooms',
        detailedDesc:'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laudantium blanditiis in quae dolor eum itaque.',
        address: 'Washington St, cor Dela Rosa Street, Makati, 1230',
        date:'2022-10-16',
        image:'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
    }
]


Listing.insertMany(seedListing)
    .then(res => {
        console.log(res);
    })
    .catch(e => {
        console.log(e);
    })
