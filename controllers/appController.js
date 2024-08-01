exports.appController = {
    async addFeedback(req, res) {
        const {dbConnection} = require('../dbConnection');
        const connection = await dbConnection.createConnection();
        const { body } = req;
        try {
            const [result] = await connection.execute(
                `INSERT INTO tbl_111_feedbackfromsoldier(soldierID, answer1, answer2, answer3, answer4, answer5) 
                 VALUES (?, ?, ?, ?, ?, ?)`,
                [body.soldierID, body.answer1, body.answer2, body.answer3, body.answer4, body.answer5]
            );
            res.status(201).json({ success: true, feedbackID: result.insertId });
        } catch (error) {
            console.error('Error inserting feedback:', error);
            res.status(500).send(false);
        } finally {
            connection.end(); 
        }
    },
    
}