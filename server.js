const express = require('express')  //require express and build the server
const app = express()

const bodyParser = require('body-parser') //used to parse input (post) data

const MongoClient = require('mongodb').MongoClient //used to access the MongoDB database
const connectionString = 'mongodb+srv://swopimp:kuTCAYDoE3adTDoR@cluster0.1rrxk54.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

MongoClient.connect(connectionString)
    .then(client => {
        console.log('Connected to Database')
        const db = client.db('star-wars-quotes')
        const quotesCollection = db.collection('quotes')

        app.set('view engine', 'ejs')
        app.use(bodyParser.urlencoded({extended: true})) //command to use body-parser. Must be before handlers

        app.listen(8000, ()=> console.log('listening on port 8000')) //sets server to listen on port, consoles that the port is active

        app.get('/', (req,res) => {
            quotesCollection.find().toArray()  //find all quotes and place into an array
                .then(results => {
                    console.log(results)
                    res.render('index.ejs',{quotes: results})//when browser contacts the server it is looking to GET information.  This will render index.ejs from the views folder.
                })
                .catch(error => console.error (error))
            })  

        app.post('/quotes', (req,res) => {
            quotesCollection.insertOne(req.body)
                .then(result => {
                    console.log(result)
                    res.redirect('/')
                })
                .catch(error => console.error(error))
            })  //posts something to the database.
    })
    .catch(error => console.error(error))



