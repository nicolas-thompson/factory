const express = require('express');

const bakeryRoutes = require('./routes/bakery');

const app = express();

app.use(express.json());
app.use(express.urlencoded());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use('/bakery', bakeryRoutes);

app.listen(8080);