require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 8081;
const simulationData = require('./data/simulation.json');
const { operatorRouter } = require('./routers/operatorRouter.js');

app.use((req, res, next) => {
    res.set({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
    'Access-Control-Allow-Methods': "GET, POST, PUT, DELETE",
    'Content-Type': 'application/json'
    });
    next();
});
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get("/simulation",(req,res)=>{
    res.json(simulationData);
});

app.use('/api/post',operatorRouter);

app.use((req,res)=>{
    res.status(400).send("Something is broken");
});

app.listen(port);
console.log(`listening on port ${port}`);