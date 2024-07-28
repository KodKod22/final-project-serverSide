const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 8081;
const { soldier_router } = require('../routers/soldier_router');

app.use((req, res, next) => {
    res.set({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
        'Content-Type': 'application/json',
    });
    next();
});

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(express.static('public'));

app.post('/api/soldiers', soldier_router);

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

const getApp = () => {
    if(!app)
        throw new Error ("Unable to find App proccess");
    return app;
};

exports.module = getApp;