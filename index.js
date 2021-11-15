const e = require('express')
const express = require('express')
const app = express()
const path = require('path')
const newConnection = require('./DBConnection')

app.use(express.static('client/build', ))

app.get('/api/timeSlots', (request,response) => {
    let conn = newConnection();
    conn.connect();
    conn.query("SELECT * FROM timeslots",(err,rows,feilds) => {
        if(err){
            response.send("error: " + err)
        }
        else{
            response.send(rows)
        }
    })
    conn.end();
})

app.get('/api/availability', (request,response) => {
    let conn = newConnection();
    conn.connect();
    conn.query("SELECT * FROM availability",(err,rows,feilds) => {
        if(err){
            response.send("error: " + err)
        }
        else{
            response.send(rows)
        }
    })
    conn.end();
})


app.post('/api/newTimeSlot', (request,response) => {
    let conn = newConnection();
    conn.connect();
    let data = request.body.values;
    let string = "INSERT INTO timeslots VALUES (";
    
    for(let i = 0; i <= 10; i ++){
        string += values[i];
        if(i != 10){
            string +=",";
        } 
    }
    conn.query(string + ");", (error,rows,fields) => {
        console.log(error);
    })
    conn.end();
})

app.post('/api/setAvailability', (request,response) => {
    let conn = newConnection();
    conn.connect();
    let data = request.body.values;
    
    let string = "INSERT INTO availability VALUES (";
    
    for(let i = 0; i < 10; i ++){
        string += data[i];
        if(i != 9){
            string +=",";
        } 
    }
    console.log(string + ");")
    conn.query(string + ");", (error,rows,fields) => {
        console.log(error);
    })
    conn.end()
})


app.post('/api/login', (request,response) => {
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

app.listen(2000);