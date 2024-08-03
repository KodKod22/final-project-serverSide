require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const port = process.env.PORT || 8081;
const simulationData = require('./data/simulation.json');

const categoryData = require('./data/categories.json');
const requestData = require('./data/requests.json');
const { operatorRouter } = require('./routers/operatorRouter.js');
const { soldierRouter } = require('./routers/soldier_router.js');
const { simulationFeedbackRouter } = require('./routers/simulationFeedback_router.js');
//const {userRouter} = require('./routers/userRouter.js');
const {appRouter} = require('./routers/appRouter.js');

app.use((req, res, next) => {
    res.set({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
        'Content-Type': 'application/json'
    });
    next();
});

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/client/images', express.static(`${__dirname}/images`));


app.use('/api/post',operatorRouter);
app.use('/api/soldiers',soldierRouter);
app.use('/api/simulationFeedback',simulationFeedbackRouter);
//app.use('/api', userRouter);
app.use('/api/app',appRouter)
app.get("/simulation",(req,res)=>{
    res.json(simulationData);
});
app.get("/categories", (req, res) => { 
    res.json(categoryData);
});
app.get("/requests", (req, res) => { 
    res.json(requestData);
});
app.use((req,res)=>{
    res.status(400).send("Something is broken");
});


app.listen(port);
console.log(`listening on port ${port}`);

