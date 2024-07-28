const ms = require('../server/main');
const { addSoldier } = require('../controllers/soldier_controller');

const app = ms.getApp();

app.post('/addSoldier', addSoldier);