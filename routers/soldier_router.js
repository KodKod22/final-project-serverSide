const express = require('express');
const { upload } = require('../server/main');
const { addSoldier } = require('../controllers/soldier_controller');

const router = express.Router();

router.post('addSoldier', upload.single('s_img'), addSoldier);

module.exports = router;
