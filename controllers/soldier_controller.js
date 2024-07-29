const db = require('../db_connection');

exports.soldier_controller = {
    async addSoldier(req, res) {
        const { body } = req;
        try {
            const result = await db.pQuery(
                `INSERT INTO tbl_111_soldiers(soldierID, name, role, rank, yearsInTheUnits, riflery, dateOfBirth, s_img) 
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
                [body.s_id, body.soldier_name, body.s_role, body.s_rank, body.years_in_unit, body.riflery, body.date_of_birth, body.s_img]
            );
            res.status(201).json({ success: true });
        } catch (error) {
            console.error('Error inserting user:', error);
            res.status(500).send(false);
        }
    }
}