const express = require('express');
const Joi = require('joi');
const {PlaceModel} = require("./Schema")
const {Router} = require("express")
const placeRoute = express.Router()
const {UserModel} = require('./UserSchema');


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
    totalAmountCollectionPerDay: Joi.string().required()
})

placeRoute.use(express.json());

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await UserModel.findOne({ username, password });

        if (!user) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        // Set username in cookie
        res.cookie('username', username, { httpOnly: true });
        res.status(200).json({ message: 'Login successful', user });
    } catch (err) {
        console.error('Error logging in:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Logout endpoint
router.post('/logout', (req, res) => {
    // Clear username cookie
    res.clearCookie('username');
    res.status(200).json({ message: 'Logout successful' });
});

placeRoute.post("/create", validatePlace ,async (req, res) => {
    // res.json({msg:"Data posted successfully..!!!"})
try {
   const prod =  await PlaceModel.create(req.body)
   const {_id} = prod;
  res.status(200).send({msg: "Data created successfully", prod,_id})   
} catch (error) {
    res.status(500).json({errMsg:"Invalid post request", error})
}
})


placeRoute.get("/read", async (req, res) => {
    // res.json({msg:"get request successful"})
    try {
        const data = await PlaceModel.find()
        res.status(200).send({msg:"Data received",data})
    } catch (error) {
        res.status(500).json({errMsg:"Invalid get request", error})
    }
})

// update a place
placeRoute.put("/update/:id", async (req, res) => {
    // res.json({msg:"put request successful"})
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