import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './CreatePlace.css';
import Cookies from 'js-cookie'

function CreatePlace() {
  const [placeName, setPlaceName] = useState("");
  const [location, setLocation] = useState("");
  const [primaryAttraction, setPrimaryAttraction] = useState("");
  const [yearOfEstablishment, setYearOfEstablishment] = useState("");
  const [description, setDescription] = useState("");
  const [averageRating, setAverageRating] = useState("");
  const [visitorCount, setVisitorCount] = useState("");
  const [nearbyAccommodations, setNearbyAccommodations] = useState([]);
  const [nearbyRestaurants, setNearbyRestaurants] = useState([]);
  const [suitableWeather, setSuitableWeather] = useState("");
  const [keyFeatures, setKeyFeatures] = useState([]);
  const [totalAmountCollectionPerDay, setTotalAmountCollectionPerDay] =
    useState("");
  const [createdBy, setCreatedBy] = useState('');
  const navigate = useNavigate()

  // const Submit = (e) => {
  //   e.preventDefault();
  //   axios.post(`http://localhost:3001/api/create`,{
  //   placeName,
  //   location,
  //   primaryAttraction,
  //   yearOfEstablishment,
  //   description,
  //   averageRating,
  //   visitorCount,
  //   nearbyAccommodations,
  //   nearbyRestaurants,
  //   suitableWeather,
  //   keyFeatures,
  //   totalAmountCollectionPerDay})
  //   .then(result => console.log(result,"created place"))
  //   .catch(err => console.log(err))
  // }

  const getUserInfo = () => {
    const userInfo = localStorage.getItem('userInfo');
    if(userInfo){
      const {username} = JSON.parse(userInfo);
      setCreatedBy(username);
    }
  }

  useEffect(() => {
    getUserInfo();
  },[])

  const Submit = (e) => {
    e.preventDefault();
    const requestBody = {
      placeName,
      location,
      primaryAttraction,
      yearOfEstablishment,
      description,
      averageRating,
      visitorCount,
      nearbyAccommodations,
      nearbyRestaurants,
      suitableWeather,
      keyFeatures,
      totalAmountCollectionPerDay
    };
    console.log('Request Body:', requestBody); // Log request body
    const token = Cookies.get('token');
    if(!token){
      console.error('JWT token not found.');
      return;
    }
    axios.post(`http://localhost:3001/api/create`, requestBody, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(result => {
        console.log(result, "created place");
        navigate('/')
      })
      .catch(err => console.log(err))
  }

  return (
    <div className="create-place-container">
  <div className="form-container">
    <h2>Add Place</h2>
    <form onSubmit={Submit}>
      <div className="form-group">
        <label htmlFor="placeName">Place Name</label>
        <input
          type="text"
          id="placeName"
          name="placeName"
          placeholder="Enter Place Name"
          className="form-control"
          value={placeName}
          onChange={(e) => setPlaceName(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="location">Location</label>
        <input
          type="text"
          id="location"
          name="location"
          placeholder="Enter Location"
          className="form-control"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="primaryAttraction">Primary Attraction</label>
        <input
          type="text"
          id="primaryAttraction"
          name="primaryAttraction"
          placeholder="Enter Primary Attraction"
          className="form-control"
          value={primaryAttraction}
          onChange={(e) => setPrimaryAttraction(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="yearOfEstablishment">Year of Establishment</label>
        <input
          type="number"
          id="yearOfEstablishment"
          name="yearOfEstablishment"
          placeholder="Enter Year of Establishment"
          className="form-control"
          value={yearOfEstablishment}
          onChange={(e) => setYearOfEstablishment(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          placeholder="Enter Description"
          className="form-control"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>
      <div className="form-group">
        <label htmlFor="averageRating">Average Rating</label>
        <input
          type="number"
          id="averageRating"
          name="averageRating"
          placeholder="Enter Average Rating"
          className="form-control"
          value={averageRating}
          onChange={(e) => setAverageRating(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="visitorCount">Visitor Count</label>
        <input
          type="text"
          id="visitorCount"
          name="visitorCount"
          placeholder="Enter Visitor Count"
          className="form-control"
          value={visitorCount}
          onChange={(e) => setVisitorCount(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="nearbyAccommodations">Nearby Accommodations</label>
        <input
          type="text"
          id="nearbyAccommodations"
          name="nearbyAccomodations"
          placeholder="Enter Nearby Accommodations"
          className="form-control"
          value={nearbyAccommodations}
          onChange={(e) => setNearbyAccommodations([e.target.value])}
        />
      </div>
      <div className="form-group">
        <label htmlFor="nearbyRestaurants">Nearby Restaurants</label>
        <input
          type="text"
          id="nearbyRestaurants"
          name="nearbyRestaurants"
          placeholder="Enter Nearby Restaurants"
          className="form-control"
          value={nearbyRestaurants}
          onChange={(e) => setNearbyRestaurants([e.target.value])}
        />
      </div>
      <div className="form-group">
        <label htmlFor="suitableWeather">Suitable Weather</label>
        <input
          type="text"
          id="suitableWeather"
          name="suitableWeather"
          placeholder="Enter Suitable Weather"
          className="form-control"
          value={suitableWeather}
          onChange={(e) => setSuitableWeather(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="keyFeatures">Key Features</label>
        <input
          type="text"
          id="keyFeatures"
          name="keyFeatures"
          placeholder="Enter Key Features"
          className="form-control"
          value={keyFeatures}
          onChange={(e) => setKeyFeatures([e.target.value])}
        />
      </div>
      <div className="form-group">
        <label htmlFor="totalAmountCollectionPerDay">Total Amount Collection Per Day</label>
        <input
          type="text"
          id="totalAmountCollectionPerDay"
          name="totalAmountCollectionPerDay"
          placeholder="Enter Total Amount Collection Per Day"
          className="form-control"
          value={totalAmountCollectionPerDay}
          onChange={(e) => setTotalAmountCollectionPerDay(e.target.value)}
        />
      </div>
      <button className="btn btn-success">Submit</button>
    </form>
  </div>
    </div>

  );
}

export default CreatePlace;
