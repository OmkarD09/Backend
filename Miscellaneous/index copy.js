const express = require('express');
const app = express();
const port = 3000;
const path = require('path');

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

app.get('/user/:id', (req, res) => {
    const { id } = req.params;
    res.send(`User ID: ${id}`);
});

app.po