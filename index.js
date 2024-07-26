require('dotenv').config();

const ms = require('./server/main');

ms.createServer();

const soldierRouter = require('./routers/soldier_router');

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});