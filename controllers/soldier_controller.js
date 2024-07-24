exports.soldier_controller = {
    async addSoldier(req, res) {
        const { dbConnection } = require('../db_connection');
        const connection = await dbConnection.createConnection();
        const { body } = req;
        try {
            const result = await connection.execute(
                `INSERT INTO tbl_111_soldiers(s_id, soldier_name, s_role, s_rank, years_in_unit, riflery, date_of_birth, s_img) 
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
                [body.s_id, body.soldier_name, body.s_role, body.s_rank, body.years_in_unit, body.riflery, body.date_of_birth, body.s_img]
            );
    
            connection.end();
            res.status(201).json({ success: true, accessCode });
        } catch (error) {
            console.error('Error inserting user:', error);
            res.status(500).send(false);
        }
    }
}