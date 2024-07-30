exports.authMiddleware = {
    async getSoldierID(req, res, next) {
        const {dbConnection} = require('../dbConnection');
        const connection = await dbConnection.createConnection();
        const { soldierName } = req.body; 
       
        const [soldierIdRow] = await connection.execute(
            `SELECT soldierID FROM tbl_111_soldiers WHERE name = ?`,
            [soldierName]
        );
        
        req.user = soldierIdRow[0].soldierID;
     
        next();
    }
}