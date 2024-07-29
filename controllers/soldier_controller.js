const db = require('../db_connection');

exports.soldier_controller = {
    async addSoldier(req, res) {
        const { body } = req;
        console.log(body)
        try {
            const result = await db.pQuery(
                `INSERT INTO tbl_111_soldiers(soldierID, name, role, rank, yearsInTheUnits, riflery, dateOfBirth, s_img) 
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
                [body.soldierID, body.name, body.role, body.rank, body.yearsInTheUnits, body.riflery, body.dateOfBirth, body.s_img]
            );
            res.status(201).json({ success: true });
        } catch (error) {
            console.error('Error inserting user:', error);
            res.status(500).send(false);
        }
    }
}