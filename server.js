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
        app.use(express.static('public'))//allows public to use the public folder. static files folder
        app.use(bodyParser.json())//to parse json data
        app.listen(8000, ()=> console.log('listening on port 8000')) //sets server to listen on port, consoles that the port is active

        app.get('/', (req,res) => {
            quotesCollection.find().toArray()  //find all quotes and place into an array
                .then(results => {
                    console.log(results)
                    res.render('index.ejs',{quotes: results})//when browser contacts the server it is looking to GET information.  This will render index.ejs from the views folder. in index, results will be placed in the quotes variable.
                })
                .catch(error => console.error (error))
            })  

        app.post('/quotes', (req,res) => {
            quotesCollection.insertOne(req.body)
                .then(result => {
                    // console.log(result)
                    res.redirect('/')
                })
                .catch(error => console.error(error))
            })  //posts something to the database.

        app.put('/quotes', (req,res) => {
            quotesCollection.findOneAndUpdate(
                {name: 'Yoda'},
                {$set: {
                    name: req.body.name,
                    quote: req.body.quote
                }},
                {
                    upsert: true
                }
            )
            .then(result => {
                res.json('success')
            })
            .catch(error => console.error(error))
        })

        app.delete('/quotes', (req,res) => {
            quotesCollection.deleteOne({name: req.body.name})
            .then (result => {
                if (result.deletedCount === 0){
                    return res.json('No quote to delete')
                }
                res.json("Deleted Darth Vader's quote")
            })
            .catch (error => console.error (error))
        })
    })
    .catch(error => console.error(error))



