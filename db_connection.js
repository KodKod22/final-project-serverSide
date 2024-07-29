require('dotenv').config();
const mysql = require('mysql2/promise');

let con = null;

async function initialize() {
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

async function pQuery(databaseQuery, params) {
    if(!con)
        while(!con)
            await initialize();

    try {
        const rows = await con.execute(databaseQuery, params);
        return rows[0];
    } catch(error){
        if(error['codeno'] !== 1062){
            throw error;
        }
    }
}

module.exports = {
    initialize,
    pQuery
};