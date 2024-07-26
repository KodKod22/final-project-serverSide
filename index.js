require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 8081;
const soldierRouter = require('./routers/soldier_router');
const bodyParser = require('body-parser');

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

app.use('/api/soldiers', soldierRouter);

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});