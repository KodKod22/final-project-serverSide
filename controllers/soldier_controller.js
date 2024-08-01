

exports.soldierController = {
    async addSoldier(req, res) {
        const {dbConnection} = require('../dbConnection');
        const connection = await dbConnection.createConnection();
        const { body } = req;
        try {
            const [result] = await connection.execute(
                `INSERT INTO tbl_111_soldiers(soldierID, name, role, rank, yearsInTheUnits, riflery, dateOfBirth, s_img) 
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
                [body.soldierID, body.name, body.role, body.rank, body.yearsInTheUnits, body.riflery, body.dateOfBirth, body.s_img]
            );
            res.status(201).json({ success: true });
        } catch (error) {
            console.error('Error inserting user:', error);
            res.status(500).send(false);
        }
    },
    async getSoldiers(req, res){
        const {dbConnection} = require('../dbConnection');
        const connection = await dbConnection.createConnection();
        try {
            const [rows] = await connection.execute(`SELECT * FROM tbl_111_soldiers;`);
            res.status(200).json(rows);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching roles' });
        }
    },
    async deleteSoldier(req, res){
        const {dbConnection} = require('../dbConnection');
        const connection = await dbConnection.createConnection();
        const { body } = req;
        try {
            const [missionsRows] = await connection.execute(`DELETE FROM tbl_111_soldierMissions WHERE soldier_id = ?;`, [body['soldier_id']]);
            const [simRows] = await connection.execute(`DELETE FROM tbl_111_simulationFeedback WHERE soldierID = ?;`, [body['soldier_id']]);
            const [rows] = await connection.execute(`DELETE FROM tbl_111_soldiers WHERE soldierID = ?;`, [body['soldier_id']]);
            if(rows['affectedRows'] === 1)
                res.status(201).json({ success: true , operation: 'delete', id: body['soldier_id']});
            else
                res.status(201).json({ success: false , operation: 'delete', id: body['soldier_id'] , message: 'soldier is required to complete his tasks'});
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: `Error deleting soldier id:${body['soldier_id']}`, id: body['soldier_id'] });
        }
    },
    async getRoles(req,res){
        const {dbConnection} = require('../dbConnection');
        const connection = await dbConnection.createConnection();
        try {
            const [rows] = await connection.execute(`SELECT DISTINCT role FROM tbl_111_soldiers`);
            res.status(201).json(rows);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching roles' });
        }
    },
    async getSoldiersProfile(req,res){
        const {dbConnection} = require('../dbConnection');
        const connection = await dbConnection.createConnection();
        const { body } = req;
        try{
            const [row] = await connection.execute(`SELECT * FROM tbl_111_soldiers WHERE soldierID = ?;`, [body['soldier_id']]);
            res.status(201).json(row);
        }catch(error){
            res.status(500).json({ message: `Error fetching soldier id:${body['soldier_id']}`, id: body['soldier_id'] });
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
    }
}

