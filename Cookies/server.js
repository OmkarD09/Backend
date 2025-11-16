const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 3000;

app.use(cookieParser(""));



app.get('/set-cookie', (req, res) => {
    res.cookie('username', 'john_doe', { maxAge: 900000, httpOnly: true });
    res.send('Cookie has been set');
});


app.get('/get-cookie', (req, res) => {
    const username = req.cookies.username;
    res.send(`Username: ${username}`);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});