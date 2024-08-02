exports.appController = {
    async addFeedback(req, res) {
        const { dbConnection } = require('../dbConnection');
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

    async getTasks(req, res) {
        const { dbConnection } = require('../dbConnection');
        const connection = await dbConnection.createConnection();

        try {
            const [tasks] = await connection.execute(
                `SELECT 
                    sim.id, sim.simulationName, sim.location, sim.afvToRescue, sim.RescueVehicle,
                    sim.participants, sim.difficulty, sim.date, sim.simulationPic,
                    rec.video
                FROM tbl_111_simulations sim
                INNER JOIN tbl_111_simulationRecords rec ON sim.id = rec.simulationID
                ORDER BY sim.id ASC`
            );

            const formattedTasks = tasks.map(task => ({
                simulationID: task.id,
                simulationName: task.simulationName,
                location: task.location,
                afvToRescue: task.afvToRescue,
                RescueVehicle: task.RescueVehicle,
                participants: task.participants,
                difficulty: task.difficulty,
                date: task.date.toISOString().split('T')[0], 
                simulationPic: task.simulationPic,
                video: task.video
            }));

            res.status(200).json(formattedTasks);
        } catch (error) {
            console.error('Error retrieving tasks:', error);
            res.status(500).send('Error retrieving tasks');
        } finally {
            connection.end();
        }
    },
    
    async getSimulationFeedback(req, res) {
        const { dbConnection } = require('../dbConnection');
        const connection = await dbConnection.createConnection();
        const { body } = req;

        try {
            const [rows] = await connection.execute(
                `SELECT simulationName, usingTools, safety, damageToTheAFV, commanderFeedback 
                 FROM tbl_111_simulationFeedback 
                 WHERE simulationID = ?`, 
                 [body.simulationID]
            );

            const formattedRows = rows.map(row => ({
                simulationName: row.simulationName,
                usingTools: row.usingTools,
                safety: row.safety,
                damageToTheAFV: row.damageToTheAFV,
                commanderFeedback: row.commanderFeedback
            }));

            res.json(formattedRows);
        } catch (error) {
            console.error('Error retrieving simulation feedback:', error);
            res.status(500).send(false);
        } finally {
            connection.end(); 
        }
    }
};
