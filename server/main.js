const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const multer = require('multer');
const port = process.env.PORT || 8081;
const soldierRouter= require('../routers/soldier_router');

app.use((req, res, next) => {
    res.set({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
        'Content-Type': 'application/json',
    });
    next();
});

const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: { fileSize: 300 * 1024 }, 
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(png)$/)) {
            return cb(new Error('Please upload a PNG image'));
        }
        cb(null, true);
    }
});

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(express.static('public'));

app.use('/api/soldiers', soldierRouter);

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

module.exports = {
    getApp: () => {
       if(!app)
        throw new Error ("Unable to find App proccess");
       return app;
    },
    upload
};