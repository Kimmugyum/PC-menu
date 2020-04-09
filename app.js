const express = require('express')
const app = express()
const port = 3000

const db = require('./config/dbconn');
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

app.get('/food/search/:name', function(req, res){
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