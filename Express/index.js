const express = require('express');
const app = express();
const port = 3000 

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


app.get('/', (req, res) => {
    res.send({
        message: 'Hello from Express server!',
    });
});
app.get('/time', (req, res) => {
    res.send({
        message: 'Current server time',
        timestamp: new Date()
    });
});
app.get('/status', (req, res) => {
    res.send({
        status: 'Server is running smoothly',
        uptime: process.uptime()
    });
});

app.get('/echo', (req, res) => {
    const queryParams = req.query;
    res.send({
        message: 'Echoing query parameters',
        query: queryParams
    });
});

app.get('/user/:id', (req, res) => {
    const userId = req.params.id;
    res.send({
        message: `User ID: ${userId}`
    });
});


app.get("/:username/:id", (req, res) => {

    const { username, id } = req.params;
    res.send({
        message: `Username: ${username}, ID: ${id}`
    });
});

app.get("/search", (req, res) => {
    let {q} = req.query;  
    if (!q) {
        res.send("<h1>No search query provided</h1>");
    }
    res.send(`<h1>Searching for: ${q}</h1>`);


});

// Catch-all 404 handler for any request that doesn't match a route
app.use((req, res) => {
    res.status(404).send({ message: "Route not found" });
});
// app.use((req, res) => {
//     console.log(`Received request`);
//     console.dir(res);
//     // res.send({
//     //     message: 'Hello from Express server!',
//     //     timestamp: new Date()
//     // });
// });
