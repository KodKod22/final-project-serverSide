import  dotenv  from 'dotenv';
import { createConnection} from 'mysql2/promise'
dotenv.config();

console.log(process.env.DB_HOST);
console.log(process.env.DB_USERNAME);
console.log(process.env.DB_PASSWORD);
console.log(process.env.DB_NAME);
let con = null;

async function createConnectionMySql() {
    try {
        con = await createConnection({
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

export const dbConnection = {
    createConnectionMySql,
    getConnection: () => {
        return con;
    } 
}
