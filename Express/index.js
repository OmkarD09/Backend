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
