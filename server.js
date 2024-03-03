const express = require('express')  //require express and build the server
const app = express()

const bodyParser = require('body-parser') //used to parse input (post) data

const MongoClient = require('mongodb').MongoClient //used to access the MongoDB database


app.use(bodyParser.urlencoded({extended: true})) //command to use body-parser. Must be before handlers

app.listen(8000, ()=> console.log('listening on port 8000')) //sets server to listen on port, consoles that the port is active

app.get('/', (req,res) => {
    res.sendFile(__dirname + '/index.html')
})  //when browser contacts the server it is looking to GET information.  This gets the index.htm file from the current directory.

app.post('/quotes', (req,res) => {
    console.log(req.body)
})  //posts something to the server.

MongoClient.connect('mongodb+srv://swopimp:<password>@cluster0.nptjtym.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', (err,client) => {
    if(err) return console.error(err)
    console.log('Connected to Database')
})