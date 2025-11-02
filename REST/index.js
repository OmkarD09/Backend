const express = require('express');
const app = express();
const port = 8080;
const path = require('path');
const methodOverride = require('method-override');
const {v4 : uuidv4} = require('uuid');


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


let posts = [
    { id: uuidv4(), username: 'alice', content: 'Hello World!' },
    { id: uuidv4(), username: 'bob', content: 'Express is great!' }
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
        posts.push({ id: uuidv4(), username, content });
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

app.get("/posts/:id/edit", (req, res) => {
    let { id } = req.params;
    let post = posts.find(p => p.id === id);
    if (post) {
        res.render("edit.ejs", { post });
    } else {
        res.status(404).send("Post not found");
    }
});

app.patch("/posts/:id", (req, res) => {
    let { id } = req.params;
    let { content } = req.body;
    let post = posts.find(p => p.id === id);
    if (post) {
        post.content = content;
        res.redirect(`/posts`);
    } else {
        res.status(404).send("Post not found");
    }
});


app.delete("/posts/:id", (req, res) => {
    let { id } = req.params;
    posts = posts.filter(p => p.id !== id);
    res.redirect("/posts");
});