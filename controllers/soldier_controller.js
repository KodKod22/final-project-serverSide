

exports.soldierController = {
    async addSoldier(req, res) {
        const {dbConnection} = require('../dbConnection');
        const connection = await dbConnection.createConnection();
        const { body } = req;
        try {
            const [result] = await connection.execute(
                `INSERT INTO tbl_111_soldiers(soldierID, name, role, rank, yearsInTheUnits, riflery, dateOfBirth, s_img) 
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
                [body.soldierID, body.name, body.role, body.rank, body.yearsInTheUnits, body.riflery, body.dateOfBirth, body.s_img]
            );
            res.status(201).json({ success: true });
        } catch (error) {
            console.error('Error inserting user:', error);
            res.status(500).send(false);
        }
    },
    async getSoldiers(req, res){
        const {dbConnection} = require('../dbConnection');
        const connection = await dbConnection.createConnection();
        try {
            const [rows] = await connection.execute(`SELECT * FROM tbl_111_soldiers;`);
            res.status(200).json(rows);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching roles' });
        }
    },
    async deleteSoldier(req, res){
        const {dbConnection} = require('../dbConnection');
        const connection = await dbConnection.createConnection();
        const { body } = req;
        console.log(`delete id ${body['soldier_id']}`)
        try {
            const rows = await connection.execute(`DELETE FROM tbl_111_soldiers WHERE soldierID = ?;`, [body['soldier_id']]);
            res.status(201).json({ success: true , operation: 'delete', id: body['soldier_id']});
        } catch (error) {
            res.status(500).json({ message: `Error deleting soldier id:${body['soldier_id']}`, id: body['soldier_id'] });
        }
    },
    async getRoles(req,res){
        const {dbConnection} = require('../dbConnection');
        const connection = await dbConnection.createConnection();
        try {
            const [rows] = await connection.execute(`SELECT DISTINCT role FROM tbl_111_soldiers`);
            res.status(201).json(rows);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching roles' });
        }
    }
}

