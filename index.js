const express = require('express')
const app = express()
const path = require('path')
const newConnection = require('./DBConnection')
var bodyParser = require('body-parser')
const { urlencoded } = require('body-parser')

app.use(express.static(path.join(__dirname,'./client/build')))

var jsonParser = bodyParser.json()
 
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.get('*', (req, res) => {                       
    res.sendFile(path.resolve(__dirname, './client/build', 'index.html'));                               
  });


app.get('/api/getOtherUsers', (request,response) => {
    let conn = newConnection();
    conn.connect();
    conn.query("SELECT * FROM timeslots",(err,rows,feilds) => {
        if(err){
            response.send("error: " + err)
        }
        else{
            response.json(rows)
        }
    })
    conn.end();
})

app.get('/api/availability', (request,response) => {
    let conn = newConnection();
    conn.connect();
    conn.query("SELECT * FROM availability;",(err,rows,feilds) => {
        if(err){
            response.send("error: " + err)
        }
        else{
            response.json(rows)
        }
    })
    conn.end();
})

app.post('/api/setAvailable', jsonParser, (request,response) => {
    let conn = newConnection();
    conn.connect();
    let data = request.body;
    console.log(data)
    let string = "INSERT INTO availability VALUES (";
    
    for(let i = 0; i < 10; i ++){
        string += data[i];
        if(i != 9){
            string +=",";
        } 
    }

    conn.query("DELETE FROM availability", (error,rows,fields) => {
        console.log(error);
    })

    conn.query(string + ");", (error,rows,fields) => {
        console.log(error);
    })
    conn.end();
})

app.post('/api/newTimeSlot', jsonParser, (request,response) => {
    let conn = newConnection();
    conn.connect();

    let data = request.body;
    let string = "INSERT INTO timeslots VALUES (";
    
    for(let i = 0; i < 11; i ++){
        string += ("'"+data[i]+"'");
        if(i != 10){
            string +=",";
        } 
    }
    conn.query(string + ");", (error,rows,fields) => {
        console.log(error);
        response.send(error)
    })
    
    conn.end();
    
})

app.post('/api/login', jsonParser, (request,response) => {
    console.log(request.body);
    let userName = request.body.usr;
    let password = request.body.password;
    let message;
    if(userName === 'admin' && password == '123'){
        message = 'good';
    }
    else{
        message = 'invalid';
    }
    response.send(message)
})

app.listen(80);