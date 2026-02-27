// const mysql = require('mysql2');
// require('dotenv').config();

// const pool = mysql.createPool({
//     host: process.env.DB_HOST || 'localhost',
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
// });

// module.exports = pool.promise();

const mysql = require('mysql2');
require('dotenv').config();

// Section E: Structured Connection Setup using a Pool
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    waitForConnections: true,
    connectionLimit: 10, // Reusable connections
    queueLimit: 0
});

// Export the promise-based version for use with async/await
const promisePool = pool.promise();

console.log("✅ Database Connection Pool Initialized");

module.exports = promisePool;