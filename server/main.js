const express = require('express');
const http = require('http');
const app = express();
const port = process.env.PORT || 8081;
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

var server;

module.exports = {
    createServer: () => {
        server = http.createServer(app);
        return server;
    },
    getApp: () => {
       if(!app)
        throw new Error ("Unable to find App proccess");
    
       return app;
    }
}