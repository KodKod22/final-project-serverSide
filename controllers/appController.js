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
            res.status(500).send(false);
        } finally {
            connection.end();
        }
    },

    async getTasks(req, res) {
        const { dbConnection } = require('../dbConnection');
        const connection = await dbConnection.createConnection();
        const soldierId = req.params.soldierId;

        if (!soldierId) {
            return res.status(400).send('Soldier ID is required');
        }

        try {
            const [tasks] = await connection.execute(
                `SELECT 
                    sim.id AS simulationID,
                    sim.simulationName,
                    sim.location,
                    sim.afvToRescue,
                    sim.RescueVehicle,
                    sim.participants,
                    sim.difficulty,
                    sim.date,
                    sim.simulationPic,
                    rec.video,
                    miss.Mission_id,
                    miss.soldier_id,
                    miss.simulation_id
                FROM tbl_111_simulations sim
                INNER JOIN tbl_111_simulationRecords rec ON sim.id = rec.simulationID
                INNER JOIN tbl_111_soldierMissions miss ON sim.id = miss.simulation_id
                WHERE miss.soldier_id = ?
                ORDER BY sim.id ASC`,
                [soldierId]
            );

            const formattedTasks = tasks.map(task => ({
                missionId: task.Mission_id,
                simulationID: task.simulationID,
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
            res.status(500).send('Error retrieving tasks');
        } finally {
            connection.end();
        }
    },

    async getFeedbackBySoldierID(req, res) {
        const { dbConnection } = require('../dbConnection');
        const connection = await dbConnection.createConnection();
        const { body } = req;

        try {
            const [rows] = await connection.execute(
                `SELECT 
                    simulationID,
                    simulationName,
                    soldierID,
                    finalGrade,
                    usingTools,
                    safety,
                    damageToTheAFV,
                    commanderFeedback
                 FROM tbl_111_simulationFeedback
                 WHERE soldierID = ?`,
                [body.soldierID]
            );

            if (rows.length === 0) {
                return res.status(404).send('No feedback found for the given soldier ID');
            }

            res.json(rows); 
        } catch (error) {
            res.status(500).send('Error retrieving feedback: ' + error.message);
        } finally {
            connection.end();
        }
    }
};
