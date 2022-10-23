const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs');
const app = express();

//di ko alam para saan to
const methodOverride = require('method-override');
const user = require('./models/user');
const listing = require('./models/listing');

app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'ejs');

app.use(express.static('public'));

mongoose.connect('mongodb://localhost:27017/airbnb')
    .then(() => {
        console.log("Connected to Database Airbnb");
    })
    .catch(err => {
        console.log("Error");
        console.log(err);
    })

//di ko alam kung para saan to
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));

//----------------------------------------------------ROUTES-------------------
//--------------------GET REQUESTS--------------------------
//index/landing page
app.get('/', async(req,res)=>{
    const acc = await user.findOne({isLoggedIn:true});
    const listings = await listing.find();
    res.render('index',{listings, acc});
});

//SIGN IN FORM
app.get('/signin',(req,res)=>{
    res.render('signin');
});

//SIGN UP FORM
app.get('/signup',(req,res)=>{
    res.render('signup');
});

//LOGOUT - redirect
app.get('/logout', async(req,res)=>{
    const toggler = await user.findOneAndUpdate({isLoggedIn: true},  {$set: {isLoggedIn: false}}, {runValidators: true, new: true});
    console.log(toggler);
    res.redirect('/');
});

//VIEW LISTING
app.get('/listing/:uid', async(req,res,next)=>{
    const {uid} = req.params;
    const acc = await user.findOne({isLoggedIn: true});
    const place = await listing.findById(uid);
    res.render('listing', {place, acc});
})

//------------------POST REQUESTS---------------------------

//LOGIN
app.post('/signin', async (req,res)=>{
    const data = await user.find({username:`${req.body.username}`},{password: `${req.body.password}`})
    if(data.length!=0){
        const toggler = await user.findOneAndUpdate({username: `${req.body.username}`},{isLoggedIn: true},{runValidators:true, new: true});
        res.redirect('/');
    }else{
        res.send('Invalid Credentials');
    }
});

//SIGN UP
app.post('/signup', async (req, res) => {
    const newUser = new user(req.body);
    await newUser.save();
    console.log(newUser);
    res.redirect('/signin');
});

//ADD LISTING - redirect
app.post('/', async(req,res)=>{
    const newList = new listing(req.body);
    const acc = await user.findOne({isLoggedIn:true});
    await newList.save();
    res.redirect('/');
    const username = await listing.findOneAndUpdate({name:`${req.body.name}`},{username:`${acc.name}`},{runValidators: true, new: true})
});

// DELETE LISTING -redirect
app.delete('/landing/:uid', async(req,res,next)=>{
    const {uid} = req.params;
    const deletePlace = await listing.findByIdAndDelete(uid);
    res.redirect('/');
});

//PORT
app.listen(3000,()=>{
    console.log('Server Running on port 3000');
});






