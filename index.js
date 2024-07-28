// require('dotenv').config();
import { config } from 'dotenv';


import {getApp} from './server/main.js';
import {dbConnection} from './db_connection.js'

// const ms = require('./server/main');
// const db = require('./db_connection');
dbConnection.createConnectionMySql();

import router from './routers/soldier_router.js'
// const soldierRouter = require('./routers/soldier_router');
