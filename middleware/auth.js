exports.authMiddleware = {
    async getSoldierID(req, res, next) {
        const {dbConnection} = require('../dbConnection');
        const connection = await dbConnection.createConnection();
        const { body } = req;
        const [soldierIdRow] = await connection.execute(
            `SELECT soldierID FROM tbl_111_soldiers WHERE name = ?`,
            [body.soldierName]
        );
        if (!soldierIdRow) {
            res.status(404).json({ error: 'Soldier not found' });
            await connection.end();
            return;
        } 
        req.user = soldierIdRow[0];
        
        next();
    }
}