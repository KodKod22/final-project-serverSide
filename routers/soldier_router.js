const express = require('express');
const ms = require('../server/main');
const { addSoldier } = require('../controllers/soldier_controller');

const router = express.Router();

router.post('/api/soldiers/addSoldier', ms.upload.single('s_img'), addSoldier);

module.exports = router;
