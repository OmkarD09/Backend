const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const Chat = require('./models/chats.js');
const methodOverride = require('method-override');
const ExpressErrors = require('./ExpressErrors');



const app = express();
const port = 3000;

app.set("views", path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
 
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));




async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/fakewhatsappDB');
}

main().then(() => {
    console.log("Connected to MongoDB successfully!");
}).catch(err => console.log(err));


app.use(express.static(path.join(__dirname, 'public')));


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

app.get('/', (req, res) => {
    res.send('Welcome to the MongoDB and Express.js Application!');
    
});

function asyncWrap(fn){
    return function(req, res, next){
        fn(req, res, next).catch(err => next(err));
    }
}



// let chat1 = new chatModule.Chat({
//     from: "Alice",
//     to: "Bob",
//     message: "Hello, Bob! How are you?",
//     created_at: new Date()
// });

// chat1.save().then(() => {
//     console.log("Chat saved successfully!");
// }).catch(err => {
//     console.log("Error saving chat:", err);
// });

app.get('/chats', asyncWrap(async (req, res, next) => {
            let chats = await Chat.find({});
            console.log(chats);
            res.render("index.ejs", { chats });
}));

app.get('/chats/new', (req, res) => {
    res.render("newchat.ejs");
});

app.post('/chats', asyncWrap(async (req, res, next) => {    
    let newChat = new Chat({
        from: req.body.from,
        to: req.body.to,
        message: req.body.message,
        created_at: new Date()
    });

    await newChat.save();
    res.redirect('/chats');
}));

// Show Route - To display a single chat
app.get("/chats/:id", asyncWrap(async (req, res, next) => {
        
    let chat = await Chat.findById(req.params.id);
    if (!chat) {
        // Handle case where chat is not found
        next(new ExpressErrors("Chat not found", 404));
    }
    res.render("show.ejs", { chat });
    } ));

// 404 Not Found handler
// This should be right before your error handler
app.use((req, res, next) => {
    next(new ExpressErrors("Page Not Found", 404));
});

const handleValidationErr = err => {
    console.log("Validation Error Occured");
    return err;
}

app.use((err, req, res, next) => {
    console.log(err.name);
    if (err.name === "ValidationError") err = handleValidationErr(err);
    next(err);
});

app.use((err, req, res, next) => {
    // Use the status code from the error, or default to 500
    const { statusCode = 500, message = "Something went wrong!" } = err;
    console.log("Errorrrrrr");
    res.status(statusCode).send(message);
});

// Edit Route - To show the form for editing a chat
app.get("/chats/:id/edit", asyncWrap(async (req, res, next) => {
    let chat = await Chat.findById(req.params.id);
    res.render("edit.ejs", { chat });
}));

// Update Route - To save the changes after editing
app.put("/chats/:id", asyncWrap(async (req, res, next) => {
    let { id } = req.params;
    await Chat.findByIdAndUpdate(id, { ...req.body }, { runValidators: true, new: true });
    res.redirect("/chats");
}));

app.delete("/chats/:id", asyncWrap(async (req, res, next) => {
   let { id } = req.params;
   await Chat.findByIdAndDelete(id);
    res.redirect("/chats");
}));