const { dbConnection } = require('../db_connection');

async function addSoldier(req, res) {
    let db = dbConnection.getConnection();
    try {
        const { soldierID, name, role, rank, yearsInTheUnits, riflery, dateOfBirth } = req.body;
        const s_img = req.file;
    
        console.log('Received data:', { soldierID, name, role, rank, yearsInTheUnits, riflery, dateOfBirth, s_img });
    
        if (!soldierID || !name || !role || !rank || !yearsInTheUnits || !riflery || !dateOfBirth || !s_img) {
            throw new Error('Missing required fields');
        }

        const [result] = await db.execute(
            'INSERT INTO soldiers (soldierID, name, role, rank, yearsInTheUnits, riflery, dateOfBirth, s_img) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [soldierID, name, role, rank, yearsInTheUnits, riflery, dateOfBirth, s_img.buffer]
        );
    
        res.status(200).json({ message: 'Soldier added successfully' });
    } catch (error) {
        console.error('Error inserting user:', error);
        res.status(500).send(false);
    }
}

module.exports = {
    addSoldier
};