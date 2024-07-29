require('dotenv').config();

const ms = require('./server/main');
ms.createServer();

const soldierRouter = require('./routers/soldier_router');