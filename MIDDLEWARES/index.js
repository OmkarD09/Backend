const express = require('express');
const app = express();
const port = 3000;
const ExpressErrors = require('./ExpressErrors'); // Custom Error class

app.get('/', (req, res) => {
    res.send('Hello World!');
});

// A route to demonstrate triggering an error
app.get("/err", (req, res) => {
  // This will cause a ReferenceError because 'abcd' is not defined
  abcd = abcd; 
});

// Middleware to demonstrate passing a custom error
const checkAdmin = (req, res, next) => {
    const { isAdmin } = req.query;
    if (isAdmin === 'true') {
        return next();
    }
    // Pass a custom error to the error-handling middleware
    throw new ExpressErrors("Admin access required", 403);
};

app.get('/admin', checkAdmin, (req, res) => {
    res.send("Welcome, Admin!");
});


// 404 Not Found handler
// This should be right before your error handler
app.use((req, res, next) => {
    next(new ExpressErrors("Page Not Found", 404));
});

/**
 * Custom Error-Handling Middleware.
 * This middleware catches all errors passed to next() and unhandled synchronous errors.
 * It must have 4 parameters: (err, req, res, next).
 */
app.use((err, req, res, next) => {
  // Use the status code from the error, or default to 500
  const { statusCode = 500, message = "Something went wrong!" } = err;
  console.log("Errorrrrrr");
  res.status(statusCode).send(message);
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});