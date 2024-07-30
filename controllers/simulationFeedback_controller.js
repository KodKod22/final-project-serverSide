exports.simulationFeedbackController = {
    async addSimulationFeedback(req, res) {
        const {dbConnection} = require('../dbConnection');
        const connection = await dbConnection.createConnection();
        const { body } = req;
        console.log(body)
        try {
            const result = await connection.query(
                `INSERT INTO tbl_111_simulationFeedback(simulationName, soldierName, finalGrade, usingTools, safety, damageToTheAFV, commanderFeedback) 
                 VALUES (?, ?, ?, ?, ?, ?, ?)`,
                [body.simulationName, body.soldierName, body.finalGrade, body.usingTools, body.safety, body.damageToTheAFV, body.commanderFeedback]
            );
            res.status(201).json({ success: true });
        } catch (error) {
            console.error('Error inserting user:', error);
            res.status(500).send(false);
        }
    }
}