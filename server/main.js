const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 8081;


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

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

module.exports = {
    getApp: () => {
       if(!app)
        throw new Error ("Unable to find App proccess");
       return app;
    }
};