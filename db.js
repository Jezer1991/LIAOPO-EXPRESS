const mysql = require("mysql2");

const db = mysql.createPool({
    host: 'roundhouse.proxy.rlwy.net',
    user: 'root',
    password: 'dADhfeCdDcEBc2fcEhf5BDggFH2ge3',
    database: 'railway',
    port: '17956'
});


module.exports = db;