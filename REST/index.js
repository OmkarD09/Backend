const express = require('express');
const app = express();
const port = 8080;
const path = require('path');

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


let posts = [
    { id: "1a", username: 'alice', content: 'Hello World!' },
    { id: "2b", username: 'bob', content: 'Express is great!' }
];

app.get('/posts', (req, res) => {
  res.render('index', { posts });
});

app.get("/posts/new", (req, res) => {
    res.render("new.ejs");
});

app.post('/posts', (req, res) => {
    let { username, content } = req.body;

    if (username && content) {
        posts.push({ username, content });
    }
    res.redirect('/posts');
});

app.get("/posts/:id", (req, res) => {
    let { id } = req.params;
    let post = posts.find(p => p.id === id);

    if (post) {
        res.render("show.ejs", { post });
    } else {
        res.status(404).send("Post not found");
    }
});
    
