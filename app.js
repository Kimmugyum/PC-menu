const express = require('express')
const app = express()
var mysql = require('mysql');
const port = 3000

var db = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password: '1234',
    database:'assignment'
});

db.connect();
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.get('/menu', function(req, res){
    db.query(`SELECT * FROM catagori`, function(error, result)
    {
        if(error)
        {
            console.log(error)
        }
        console.log(result)
        res.json(result)
    })
})

app.get('/food/:id', function(req, res){
    var number = req.params.id
    db.query(`SELECT * FROM food where menu = ?`,[number], function(error, result)
    {
        if(error)
        {
            console.log(error)
        }
        console.log(result)
        res.json(result)
    })
})

app.get('/foodpicture/:name', function(req, res){
    var foodnames = req.params.name
    db.query(`SELECT * FROM food WHERE NAME LIKE ?`,["%"+foodnames+"%"], function(error, result)
    {
        if(error)
        {
            console.log(error)
        }
        console.log(result)
        res.json(result)
    })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))