const express = require('express');
const app = express();
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');
const ejs = require('ejs');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});



const sessionOptions = {
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    
};


app.use(session(sessionOptions));
app.use(flash());


app.use((req, res, next) => {
    res.locals.success = req.flash('success', 'Welcome! You have successfully logged in.');
    res.locals.error = req.flash('error', 'An error occurred.');
    next();
});


app.get("/test", (req, res) => {
    res.send("Test route is working!");
});

app.get("/register", (req, res) => {
    let { name = "anonymous" } = req.query;
    req.session.name = name;
    res.send(`Session name set to ${name}`);
});

app.get("/greet", (req, res) => {
    let name = req.session.name || "Guest";
    res.render('flash.ejs', { name });

});

