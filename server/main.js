import express from 'express';
const app = express();
import bodyParser from 'body-parser';
const port = process.env.PORT || 8081;
import  router  from '../routers/soldier_router.js';


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

app.post('/api/soldiers', router);

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

export const getApp = () => {
    if(!app)
        throw new Error ("Unable to find App proccess");
    return app;
};

