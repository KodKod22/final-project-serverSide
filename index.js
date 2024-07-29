require('dotenv').config();

const db = require('./db_connection');
const ms = require('./server/main');

ms.createServer();
db.initialize();

const soldierRouter = require('./routers/soldier_router');