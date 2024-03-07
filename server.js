console.log('Hello')
const express = require('express')
const app = express()

// routes
app.get('/',(req,res) => {
    res.send('Hello NODE API')
})
app.get('/ping',(req,res) => {
    res.send('Hello Ping')
})
app.listen(3001, () => {
    console.log('Node API app is running on port 3000')
})


