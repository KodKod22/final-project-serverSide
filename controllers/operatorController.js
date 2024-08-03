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
    
    async deleteSimulations(req,res) {
        const {dbConnection} = require('../dbConnection');
        const connection = await dbConnection.createConnection();
        const {SimulationId,simulationName} = req.body;
        
        
        const [checkMission] = await connection.execute(`select simulation_id from tbl_111_soldierMissions where simulation_id = ?`,[SimulationId]);
        
        if (checkMission.length > 0) {
           await connection.execute(`DELETE FROM tbl_111_soldierMissions WHERE simulation_id=? `,[SimulationId]);
    
        }
        console.log(SimulationId);
        const [result] = await connection.execute(`DELETE FROM tbl_111_simulations WHERE id=? and simulationName = ?`,[SimulationId,simulationName]);
       
        if (result.affectedRows === 0) {
            res.status(404).json({ message: 'Simulation not found' });
        } else {
            res.status(200).json({ message: 'Simulation deleted successfully' });
        }
    }, 
    async getSimulationsRecords(req,res){
        const {dbConnection} = require('../dbConnection');
        const connection = await dbConnection.createConnection();
        const [rows] = await connection.execute(`
            SELECT 
                sim.id,
                sim.simulationID,
                sim.date,
                sim.video,
                sir.simulationName,
                sir.location,
                sir.afvToRescue,
                sir.RescueVehicle,
                sir.difficulty,
                s1.name AS CommanderName,
                s2.name AS DriverName,
                s3.name AS SafetyOfficerName,
                s4.name AS TeamMember1Name,
                s5.name AS TeamMember2Name,
                s6.name AS TeamMember3Name
            FROM 
                tbl_111_simulationRecords sim
            INNER JOIN 
                tbl_111_simulations sir ON sir.id = sim.simulationID
            INNER JOIN 
                tbl_111_soldiers s1 ON sim.commanderID = s1.soldierID
            INNER JOIN 
                tbl_111_soldiers s2 ON sim.driverID = s2.soldierID
            INNER JOIN 
                tbl_111_soldiers s3 ON sim.safetyOfficerID = s3.soldierID
            LEFT JOIN 
                tbl_111_soldiers s4 ON sim.teamMember1ID = s4.soldierID
            LEFT JOIN 
                tbl_111_soldiers s5 ON sim.teamMember2ID = s5.soldierID
            LEFT JOIN 
                tbl_111_soldiers s6 ON sim.teamMember3ID = s6.soldierID`);
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
    async insertSoldierMission(req,res){
      
        const { soldierName,  simulationID} = req.body;
        const {dbConnection} = require('../dbConnection');
        const connection = await dbConnection.createConnection();
        const [soldierIdCheck] = await connection.execute(
            `SELECT soldierID FROM tbl_111_soldiers WHERE name = ?`,
            [soldierName]
        );
        const [simulationCheck] = await connection.execute(
            `SELECT id FROM tbl_111_simulations WHERE id = ?`,
            [simulationID]
        );

        if (simulationCheck.length === 0) {
            res.status(404).json({ error: 'Simulation not found' });
            await connection.end();
            return;
        }

        if (soldierIdCheck.length === 0) {
            res.status(404).json({ error: 'Soldier not found' });
            await connection.end();
            return;
        } 
        const simulationId = simulationCheck[0].id;
        const soldierId = soldierIdCheck[0].soldierID;

        
        const [result] = await connection.execute(
            `INSERT INTO tbl_111_soldierMissions (simulation_id, soldier_id) VALUES (?, ?)`,
            [simulationId, soldierId]
        );

        res.status(201).json({ success: true, result });
        await connection.end();
    },
    async updateSimulations(req,res){
        const {dbConnection} = require('../dbConnection');
        const connection = await dbConnection.createConnection();
        const {body} = req;

            if (body.simulation) {
                const [simulationResult] = await connection.execute(
                    `UPDATE tbl_111_simulations SET simulationName = ? where id = ?`,[body.simulation,body.id]);     
            }
            else if (body.AfvToRescue) {
                const [AfvToRescueResult] = await connection.execute(
                    `UPDATE tbl_111_simulations SET afvToRescue = ? where id = ?`,[ body.AfvToRescue,body.id]); 
            }
            else if (body.RescueVehicle) {
                const [RescueVehicleResult] = await connection.execute(
                    `UPDATE tbl_111_simulations SET RescueVehicle = ? where id = ?`,[body.RescueVehicle,body.id]);
            }else if (body.Participants) {
                const [ParticipantsResult] = await connection.execute(
                    `UPDATE tbl_111_simulations SET participants = ? where id = ?`,[body.Participants,body.id]);
            }else if (body.Location) {
                const [LocationResult] = await connection.execute(
                `UPDATE tbl_111_simulations SET location = ? WHERE id = ?`,
                [body.Location, body.id]);
            }
            res.status(200).json({ success: true});
            await connection.end();
    },
    async getSimulation(req,res){
        const {dbConnection} = require('../dbConnection');
        const connection = await dbConnection.createConnection();
        const {body} = req;
        const [rows]= await connection.execute(`select * from tbl_111_simulations where id = ?`,[body.simulationId]);

        const formattedRows = rows.map(row => {
            if (row.date && row.date instanceof Date) {
                row.date = row.date.toISOString().split('T')[0];
            }
            return row;
        });

        res.json(rows);
        connection.end()
        
        return formattedRows; 
    }
    
}