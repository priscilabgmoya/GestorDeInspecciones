import mysql from 'promise-mysql';
import config from '../config';


const pool = mysql.createConnection({
    host: config.host         , 
    user: config.user        , 
    password: config.password     ,
    database: config.database     ,
    connectionLimit: 5,
});


const getConnection = ()=>{
    return pool;
}
module.exports = {
    getConnection
};