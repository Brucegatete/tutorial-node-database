/*
When we run this file, the server will listen on http://localhost:7555 for POST requests to 
/createUser and pass those requests to the store file. The server will then respond with a 
200 status code (200 is the code that every HTTP server uses to say that the request was successful).
*/

const express = require('express')
const bodyParser = require('body-parser')

const store = require('./store')

const app = express()
app.use(express.static('public'))
app.use(bodyParser.json())
app.post('/createUser', (req, res) => {
    store
    .createUser({
        username: req.body.username,
        password: req.body.password
    })
    .then(() => res.sendStatus(200))
})

app.listen(7555, () => {
    console.log('Server running on http://localhost:7555')
})
