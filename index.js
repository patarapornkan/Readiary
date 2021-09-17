if (process.env.NODE_ENV !=="production") {
    require('dotenv').config();
}

const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const ejs = require('ejs');
const ejsMate = require('ejs-mate');
const ExpressError = require('./utils/ExpressError');
const Joi = require('joi');
const catchAsync = require('./utils/catchAsync');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');

const Record = require('./models/record');
const { validateRecord, isLoggedIn, validateSetting } = require('./middleware')
const { calculateTotalTime, calculateTimeRemain, calculateTotalNum, calculateNumRemain } = require('./utils/helpChart');

const User = require('./models/user');
const Setting = require('./models/setting');

const recordRoutes = require('./routes/records');
const settingRoutes = require('./routes/settings');
const userRoutes = require('./routes/users');

mongoose.connect('mongodb://localhost:27017/readiary', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=> {
        console.log("MONGO CONNECTION OPEN!!!");
    })
    .catch(err => {
        console.log("MONGO OH NO ERROR!!!");
        console.log(err);
    })

app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.use(express.urlencoded({extended:true}));

const sessionOptions = {
    secret: 'thisshouldbeabettersecret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7, //one week
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}
app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req, res, next)=> {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})

app.use('/records', recordRoutes);
app.use('/setting', settingRoutes);
app.use('/', userRoutes);

app.get('/', (req, res)=> {
    res.render('welcome')
})

app.all('*', (req, res, next)=> {
    next(new ExpressError("Page Not Found", 404))
})

app.use((err, req, res, next) => {
    if(!err.statusCode) err.statusCode=500;
    if(!err.message) err.message='Oh No, something went wrong';
    res.status(err.statusCode).render('error', { err });
})

app.listen(3000, ()=> {
    console.log("APP IS LISTENING ON PORT 3000")
})