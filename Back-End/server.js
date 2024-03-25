require('dotenv').config(); 

console.log('Hello');

const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./Config/dbConn'); 
const PlaceModel = require('./Schema'); 
const placeRoute = require('./routes');
const cors = require('cors')

connectDB();

const app = express();

app.use(express.json());
app.use(cors({
    origin:'http://localhost:5173'
}))

// Routes
app.get('/', (req, res) => {
    res.send('Hello NODE API');
});

app.use("/api", placeRoute)

app.get('/ping', (req, res) => {
    res.send('Hello Ping');
});

app.get('/places', async (req, res) => {
    try {
        const places = await PlaceModel.find();
        res.json(places);
    } catch (error) {
        console.error('Error fetching places:',error);
        res.status(500).json({error: 'Internal Server Error'});
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('An error occurred:',err);
    res.status(500).json({error:'Something went wrong!'});
});

const port = process.env.PORT || 3001;

// Start the server
app.listen(port, () => {
    console.log(`Node API app is running on port ${port}`);
});





