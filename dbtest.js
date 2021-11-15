const newConnection = require('./DBConnection')

let conn = newConnection();
conn.connect();
conn.query("SELECT * FROM availability",(err,rows,feilds) => {
    if(err){
        console.log("error: " + err)
    }
    else{
        console.log(rows)
    }
})
conn.end();