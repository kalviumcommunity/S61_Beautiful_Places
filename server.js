require('dotenv').config();  // load environment variables from .env file

console.log('Hello')
const express = require('express')
const app = express()

// Middleware to parse JSON bodies
app.use(express.json());

// routes
app.get('/',(req,res) => {
    res.send('Hello NODE API')
})
app.get('/ping',(req,res) => {
    res.send('Hello Ping')
})

// Error handling middleware
app.use((err,req,res,next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
})

const port = process.env.PORT || 3001
app.listen(port, () => {
    console.log('Node API app is running on port 3001')
})


