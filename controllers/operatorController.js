exports.operatorController = {
    async getSimulations(req,res) {
        const {dbConnection} = require('../dbConnection');
        const connection = await dbConnection.createConnection();
        const [rows]= await connection.execute(`select * from tbl_111_simulations`);

        const formattedRows = rows.map(row => {
            if (row.date && row.date instanceof Date) {
                row.date = row.date.toISOString().split('T')[0];
            }
            return row;
        });

        res.json(rows);
        connection.end()
        
        return formattedRows; 
    },
    async getUser(req,res) {
        const {dbConnection} = require('../dbConnection');
        const connection = await dbConnection.createConnection();
        const userName = req.body.name;
        const userPassword = req.body.password;
        const [rows] = await connection.execute(
            'SELECT * FROM tbl_111_usersType WHERE user_name = ? AND user_password = ?',
            [userName, userPassword]
        );

        if (rows.length === 0) {
            res.status(401).json({ error: 'Invalid username or password' });
        } else {
            connection.end();
            res.json(rows[0]);
        }
    }

}