const db = require('../db_connection');

exports.simulationFeedback_controller = {
    async addSimulationFeedback(req, res) {
        const { body } = req;
        console.log(body)
        try {
            const result = await db.pQuery(
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