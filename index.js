require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 8081;
const simulationData = require('./data/simulation.json');
const { operatorRouter } = require('./routers/operatorRouter');
const { soldierRouter } = require('./routers/soldier_router');
const { simulationFeedbackRouter } = require('./routers/simulationFeedback_router');
const userRouter = require('./routers/userRouter');
const {appRouter}=require('./routers/appRouter');

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
app.use(express.urlencoded({ extended: true }));
app.use('/client/images', express.static(`${__dirname}/images`));
app.get('/simulation', (req, res) => {
    res.json(simulationData);
});

app.use('/api/post', operatorRouter);
app.use('/api/soldiers', soldierRouter);
app.use('/api/simulationFeedback', simulationFeedbackRouter);
app.use('/api', userRouter);
app.use('/api/app',appRouter)

app.use((req, res) => {
    res.status(400).send('Something is broken');
});

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
