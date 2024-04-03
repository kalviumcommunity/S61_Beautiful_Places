const express = require('express');
const Joi = require('joi');
const {PlaceModel} = require("./Schema")
const {Router} = require("express")
const placeRoute = express.Router()
const UserModel = require('./UserSchema');
const jwt = require('jsonwebtoken');
const authMiddleware = require('./authMiddleware')


// Define Joi schema for validation
const placeValidationSchema = Joi.object({
    placeName: Joi.string().required(),
    location: Joi.string().required(),
    primaryAttraction: Joi.string().required(),
    yearOfEstablishment: Joi.string(),
    description: Joi.string().required(),
    averageRating: Joi.number().required(),
    visitorCount: Joi.string().required(),
    nearbyAccommodations: Joi.array().items(Joi.string()).required(),
    nearbyRestaurants: Joi.array().items(Joi.string()).required(),
    suitableWeather: Joi.string().required(),
    keyFeatures: Joi.array().items(Joi.string()).required(),
    totalAmountCollectionPerDay: Joi.string().required(),
    createdBy: Joi.string().required()
})

placeRoute.use(express.json());

placeRoute.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await UserModel.findOne({ username, password });

        if (!user) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn:'1h' });

        // Set token in cookie
        res.cookie('token', token, { httpOnly: true });
        res.status(200).json({ message: 'Login successful', user });
    } catch (err) {
        console.error('Error logging in:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Logout endpoint
placeRoute.post('/logout', (req, res) => {
    // Clear username cookie
    res.clearCookie('username');
    res.status(200).json({ message: 'Logout successful' });
});

// placeRoute.post("/create", validatePlace ,async (req, res) => {
//     // res.json({msg:"Data posted successfully..!!!"})
// try {
//     const placeData = {
//         ...req.body,
//         created_by: req.user._id
//     }
//    const prod =  await PlaceModel.create(placeData)
//    const {_id} = prod;
//   res.status(200).send({msg: "Data created successfully", prod,_id})   
//   res.status(201).json({ message: 'Place created successfully', place });
// } catch (error) {
//     res.status(500).json({errMsg:"Invalid post request", error})
// }
// })
// Create place endpoint
// placeRoute.post("/create", authMiddleware, async (req, res) => {
//     try {
//         const newPlace = await PlaceModel.create({
//             // Other properties...
//             created_by: req.user._id // Assigning the ID of the authenticated user to created_by
//         });

//         res.status(201).json({ message: "Place created successfully", newPlace });
//     } catch (error) {
//         console.error("Error creating place:", error);
//         res.status(500).json({ error: "Internal server error" });
//     }
// });

placeRoute.post('/create', async (req, res) => {
    try {
        const newPlace = await PlaceModel.create(req.body);
        res.status(201).json({ message: "Place created successfully", newPlace });
    } catch (error) {
        console.error("Error creating place:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});


placeRoute.get("/read", async (req, res) => {
    // res.json({msg:"get request successful"})
    try {
        const data = await PlaceModel.find()
        res.status(200).send({msg:"Data received",data})
    } catch (error) {
        res.status(500).json({errMsg:"Invalid get request", error})
    }
})

placeRoute.get('/entities', async (req, res) => {
    try{
        const entities = await PlaceModel.find();
        res.status(200).json({data: entities});
    }catch(error){
        console.error('Error fetching entities', error);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

// update a place
placeRoute.put("/update/:id", async (req, res) => {
    try {
        const { id } = req.params;
    
        const place = await PlaceModel.findByIdAndUpdate(id, req.body);
    
        if (!place) {
          return res.status(404).json({ message: "place not found" });
        }
    
        const updatedPlace = await PlaceModel.findByIdAndUpdate(id);
        res.status(200).json(updatedPlace);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }

  });

// delete a place
placeRoute.delete("/delete/:id", async (req, res) => {
    // res.json({msg:"delete request successful"})
    try {
        const deletedPlace = await PlaceModel.findByIdAndDelete(req.params.id);
        if (!deletedPlace) {
            return res.status(404).json({ errMsg: "Place not found" });
        }
        res.status(200).json({ msg: "Place deleted successfully", deletedPlace });
    } catch (error) {
        res.status(500).json({ errMsg: "Invalid delete request", error });
    }
});

function validatePlace(req, res, next){
    const {error} = placeValidationSchema.validate(req.body);
    if(error){
        return res.status(400).json({message: error.details[0].message});
    }
    next();
}

module.exports = placeRoute