import React, { useEffect, useState } from "react";
import axios from "axios";
import './UpdatePlace.css'

function UpdatePlace({placeToUpdate}) {
  const [formData, setFormData] = useState(placeToUpdate)
  useEffect(() => {
    // if(placeToUpdate){
      setFormData({...placeToUpdate});
    // }
  },[placeToUpdate])

  const handleChange = (e) => {
    const {name, value} = e.target;
    // setFormData({...formData, [name]:value})
    setFormData(prevState => ({
      ...prevState,
      [name] : value
    }));
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:3001/api/update/${placeToUpdate._id}`, formData)
      .then(result => {
        console.log(result, "updated place");
        // Add logic to handle successful update (e.g., show success message, redirect)
      })
      .catch(err => {
        console.log(err);
        // Add logic to handle error (e.g., show error message)
      });
  };
  return(
    <div className="update-place-container">
      <div>
        <h2>Update Place</h2>
        <form action="" onSubmit={handleSubmit}>
        <div className="form-group">
            <label htmlFor="placeName">Place Name</label>
            <input
              type="text"
              id="placeName"
              placeholder="Enter Place Name"
              className="form-control"
              value={formData.placeName || ' '}
              // value={formData.placeName || ''}
              // value={placeToUpdate.placeName}
              onChange={handleChange}
              // onChange={(e) => setFormData({ ...formData, placeName: e.target.value })} 
            />
          </div>
          <div className="form-group">
            <label htmlFor="location">Location</label>
            <input
              type="text"
              id="location"
              placeholder="Enter Location"
              className="form-control"
              value={formData.location || ''}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })} 
            />
          </div>
          <div className="form-group">
            <label htmlFor="primaryAttraction">Primary Attraction</label>
            <input
              type="text"
              id="primaryAttraction"
              placeholder="Enter Primary Attraction"
              className="form-control"
              value={formData.primaryAttraction || ''}
              onChange={(e) => setFormData({ ...formData, primaryAttraction: e.target.value })} 
            />
          </div>
          <div className="form-group">
            <label htmlFor="yearOfEstablishment">Year of Establishment</label>
            <input
              type="number"
              id="yearOfEstablishment"
              placeholder="Enter Year of Establishment"
              className="form-control"
              value={formData.yearOfEstablishment || ''}
              onChange={(e) => setFormData({ ...formData, yearOfEstablishment: e.target.value })} 
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              placeholder="Enter Description"
              className="form-control"
              value={formData.description || ''}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })} 
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="averageRating">Average Rating</label>
            <input
              type="number"
              id="averageRating"
              placeholder="Enter Average Rating"
              className="form-control"
              value={formData.averageRating || ''}
              onChange={(e) => setFormData({ ...formData, averageRating: e.target.value })} 
            />
          </div>
          <div className="form-group">
            <label htmlFor="visitorCount">Visitor Count</label>
            <input
              type="text"
              id="visitorCount"
              placeholder="Enter Visitor Count"
              className="form-control"
              value={formData.visitorCount || ''}
              onChange={(e) => setFormData({ ...formData, visitorCount: e.target.value })} 
            />
          </div>
          <div className="form-group">
            <label htmlFor="nearbyAccommodations">Nearby Accommodations</label>
            <input
              type="text"
              id="nearbyAccommodations"
              placeholder="Enter Nearby Accommodations"
              className="form-control"
              value={formData.nearbyAccommodations || ''}
              onChange={(e) => setFormData({ ...formData, nearbyAccommodations: e.target.value })} 
            />
          </div>
          <div className="form-group">
            <label htmlFor="nearbyRestaurants">Nearby Restaurants</label>
            <input
              type="text"
              id="nearbyRestaurants"
              placeholder="Enter Nearby Restaurants"
              className="form-control"
              value={formData.nearbyRestaurants || ''}
              onChange={(e) => setFormData({ ...formData, nearbyRestaurants: e.target.value })} 
            />
          </div>
          <div className="form-group">
            <label htmlFor="suitableWeather">Suitable Weather</label>
            <input
              type="text"
              id="suitableWeather"
              placeholder="Enter Suitable Weather"
              className="form-control"
              value={formData.suitableWeather || ''}
              onChange={(e) => setFormData({ ...formData, suitableWeather: e.target.value })} 
            />
          </div>
          <div className="form-group">
            <label htmlFor="keyFeatures">Key Features</label>
            <input
              type="text"
              id="keyFeatures"
              placeholder="Enter Key Features"
              className="form-control"
              value={formData.keyFeatures || ''}
              onChange={(e) => setFormData({ ...formData, keyFeatures: e.target.value })} 
            />
          </div>
          <div className="form-group">
            <label htmlFor="totalAmountCollectionPerDay">Total Amount Collection Per Day</label>
            <input
              type="text"
              id="totalAmountCollectionPerDay"
              placeholder="Enter Total Amount Collection Per Day"
              className="form-control"
              value={formData.totalAmountCollectionPerDay || ''}
              onChange={(e) => setFormData({ ...formData, totalAmountCollectionPerDay: e.target.value })} 
            />
          </div>
          <button className="btn btn-primary">Update</button>
        </form>
      </div>
    </div>
  )
}

export default UpdatePlace;
