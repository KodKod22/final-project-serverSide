const ms = require('../server/main');

const { soldier_controller } = require('../controllers/soldier_controller');

ms.getApp().post('/api/soldiers/addSoldier', soldier_controller.addSoldier);