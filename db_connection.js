require('dotenv').config();
const mysql = require('mysql2/promise');

let con = null;

async function createConnection() {
    try {
        con = await mysql.createConnection({
            host: process.env.DB_HOST || '148.66.138.145',
            user: process.env.DB_USERNAME || 'dbusrShnkr24',
            password: process.env.DB_PASSWORD || 'studDBpwWeb2!',
            database: process.env.DB_NAME || 'dbShnkr24stud'
        });
        console.log("[DB] successfully entered the Database.");
    }catch(err){
        console.log("Failed to connect to DB");
        throw err;
    }
}

exports.dbConnection = {
    createConnection,
    getConnection: () => {
        return con;
    }
};