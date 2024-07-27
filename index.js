require('dotenv').config();

const ms = require('./server/main');
const db = require('./db_connection');
db.dbConnection.createConnection();

const soldierRouter = require('./routers/soldier_router');
const app = require('./server/main').getApp();