const mysql = require("mysql2");
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');
const currentPath = path.join(__dirname);
const basePath = currentPath + '/.env';
console.log(basePath);

const finalPath = fs.existsSync(basePath) ? basePath : null;
const fileEnv = dotenv.config({ path: finalPath }).parsed;
const envKeys = Object.keys(fileEnv).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(fileEnv[next]);
    return prev;
}, {});

const db = mysql.createPool({
    host: envKeys['process.env.REACT_APP_HOST_BBDD'].replaceAll("\"",""),
    user: envKeys['process.env.REACT_APP_USER_BBDD'].replaceAll("\"",""),
    password: envKeys['process.env.REACT_APP_PASSWORD_BBDD'].replaceAll("\"",""),
    database: envKeys['process.env.REACT_APP_DATABASE_BBDD'].replaceAll("\"",""),
    port: envKeys['process.env.REACT_APP_PORT_BBDD'].replaceAll("\"","")
});


module.exports = db;