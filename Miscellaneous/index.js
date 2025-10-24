const express = require('express');
const app = express();
const port = 8080;
const path = require('path');

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/register', (req, res) => {
   let {username, password} = req.query;
   console.log(`GET request received with username: ${username} and password: ${password}`);
   res.send(`standard GET response username is ${username} password is ${password}`);
});

app.post('/register', (req, res) => {
   let {username, password} = req.body;
   console.log(`POST request received with username: ${username} and password: ${password}`);
   res.send(`standard POST response username is ${username} password is ${password}`);
});
