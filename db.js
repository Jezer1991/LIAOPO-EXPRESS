const mysql = require("mysql2");

const db = mysql.createPool({
    host: process.env.DB_HOST || 'roundhouse.proxy.rlwy.net',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'dADhfeCdDcEBc2fcEhf5BDggFH2ge3-3',
    database: process.env.DB_DATABASE || 'railway',
    port: process.env.DB_PORT || 17956
});

console.log(process.env.DB_PORT);

module.exports = db;
