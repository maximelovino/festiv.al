require('dotenv').config({ path: "keys.env" })
const sql = require('mysql');
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;

const mySQLOptions = {
	host: 'localhost',
	port: 3306,
	user: DB_USER,
	password: DB_PASSWORD,
	database: 'festiv',
};

const connection = sql.createConnection(mySQLOptions);