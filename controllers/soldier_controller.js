import { dbConnection } from '../db_connection.js';
export const addSoldier = async(req, res) => {
    let db = dbConnection.getConnection();
    try {
        const { soldierID, name, role, rank, yearsInTheUnits, riflery, dateOfBirth , s_img } = req.body;
    
        console.log('Received data:', soldierID, name, role, rank, yearsInTheUnits, riflery, dateOfBirth, s_img);
    
        if (!soldierID || !name || !role || !rank || !yearsInTheUnits || !riflery || !dateOfBirth ) {
            throw new Error('Missing required fields');
        }

        const [result] = await db.execute(
            'INSERT INTO tbl_111_soldiers (soldierID, name, role, rank, yearsInTheUnits, riflery, dateOfBirth, s_img) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [soldierID, name, role, rank, yearsInTheUnits, riflery, dateOfBirth, s_img]
        );
    
        res.status(200).json({ message: 'Soldier added successfully' });
    } catch (error) {
        console.error('Error inserting user:', error);
        res.status(500).send(false);
    }
}

// exports.module = addSoldier;