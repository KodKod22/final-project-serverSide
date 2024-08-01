exports.dbConnection = {
    async createConnection() {
        const mysql = require('mysql2/promise');

        console.log(process.env.DB_HOST);
        console.log( process.env.DB_USERNAME);
        console.log(process.env.DB_PASSWORD);
        console.log(process.env.DB_NAME);
        const connection = await mysql.createConnection({
        host : process.env.DB_HOST,
        user : process.env.DB_USERNAME,
        password : process.env.DB_PASSWORD,
        database : process.env.DB_NAME
        });
        return connection;
    }
}