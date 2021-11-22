const mysql = require('mysql');

function newConnection(){
    let conn = mysql.createConnection({
        host: '34.136.74.158',
        port:'3306',
        user: 'root',
        password: 'Minus12345',
        database: 'lab3'
    })
    return conn;
}

module.exports = newConnection;
