const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

router.get('/users', (req, res) => {
    const filePath = path.join(__dirname, '../data/user.json');
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            res.status(500).json({ message: 'Error reading file' });
            return;
        }
        res.json(JSON.parse(data));
    });
});

module.exports = router;
