exports.userController = {
    async getUser(req, res) {
        const { dbConnection } = require('../dbConnection');
        const connection = await dbConnection.createConnection();
        const userName = req.body.name;
        const userPassword = req.body.password;
    
        try {
            const [rows] = await connection.execute(
                'SELECT * FROM tbl_111_usersType WHERE user_name = ? AND user_password = ?',
                [userName, userPassword]
            );
    
            connection.end();
    
            if (rows.length === 0) {
                return res.status(401).json({ error: 'Invalid username or password' });
            } else {
                return res.json(rows[0]);
            }
        } catch (error) {
            console.error('Database error:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    },
}