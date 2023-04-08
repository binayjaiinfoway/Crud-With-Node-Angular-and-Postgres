const Client = require('pg').Client;
require('dotenv').config()
const dbconfig = {
    host: process.env.host,
    port: process.env.port,
    user: process.env.user,
    password: process.env.password,
    database: process.env.DBNAME
};
function getNewClient() {
    return new Client(dbconfig);
}
module.exports = {getNewClient}; 