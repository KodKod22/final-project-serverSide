require('dotenv').config();
const mysql = require('mysql2/promise');

let con = null;

async function createConnection() {
    try {
        con = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD ,
            database: process.env.DB_NAME 
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