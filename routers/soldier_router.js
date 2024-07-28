const ms = require('../server/main');
const { addSoldier } = require('../controllers/soldier_controller');

ms.getApp().post('/addSoldier', addSoldier);