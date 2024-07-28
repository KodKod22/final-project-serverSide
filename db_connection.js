import { config } from 'dotenv';
// import mysql from 'mysql2'
import { createConnection} from 'mysql2/promise'
config();
// const promise = mysql.promise;

let con = null;

async function createConnectionMySql() {
    try {
        con = await createConnection({
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

export const dbConnection = {
    createConnectionMySql,
    getConnection: () => {
        return con;
    } 
}
