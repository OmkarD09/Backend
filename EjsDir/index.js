const express = require('express');
const app = express();
const port = 3000;
const path = require('path');

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


app.use(express.static(path.join(__dirname, "public/css")));
app.use(express.static(path.join(__dirname, "public/js")));
app.set('view engine', 'ejs'); 

app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
  res.render('home.ejs');
});

app.get('/rolldice', (req, res) => {
    const randomNumber = Math.floor(Math.random() * 6) + 1;
    res.render('rolldice.ejs', { randomNumber });
  });

app.get("/ig/:username", (req, res) => {
    const instaData = require("./data.json");
    const { username } = req.params;
    const data = instaData[username];
    console.log(data);
    if(data){
        res.render('instagram.ejs', {data});
    }else{
        res.render('error.ejs');
    }
    // const followers = ["adam", "bob", "charlie", "david", "eva"];
    // const { username } = req.params;
    // res.render('instagram.ejs', { username, followers });
});

