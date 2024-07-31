

exports.soldierController = {
    async addSoldier(req, res) {
        const {dbConnection} = require('../dbConnection');
        const connection = await dbConnection.createConnection();
        const { body } = req;
        console.log(body)
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

    async getRoles(req,res){
        const {dbConnection} = require('../dbConnection');
        const connection = await dbConnection.createConnection();
        try {
            const [rows]= await connection.execute(`SELECT DISTINCT role FROM tbl_111_soldiers`);
            console.log(rows);
            res.json(rows);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching roles' });
        }
    }
}

