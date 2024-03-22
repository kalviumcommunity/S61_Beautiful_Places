import React from "react";
import './UpdatePlace.css'

function UpdatePlace() {
  return (
    <div className="update-place-container">
      <div className="form-container">
        <h2>Update Place</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="placeName">Place Name</label>
            <input
              type="text"
              id="placeName"
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
              placeholder="Enter Nearby Accommodations"
              className="form-control"
              value={nearbyAccommodations}
              onChange={(e) => setNearbyAccommodations(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="nearbyRestaurants">Nearby Restaurants</label>
            <input
              type="text"
              id="nearbyRestaurants"
              placeholder="Enter Nearby Restaurants"
              className="form-control"
              value={nearbyRestaurants}
              onChange={(e) => setNearbyRestaurants(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="suitableWeather">Suitable Weather</label>
            <input
              type="text"
              id="suitableWeather"
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
              placeholder="Enter Key Features"
              className="form-control"
              value={keyFeatures}
              onChange={(e) => setKeyFeatures(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="totalAmountCollectionPerDay">
              Total Amount Collection Per Day
            </label>
            <input
              type="text"
              id="totalAmountCollectionPerDay"
              placeholder="Enter Total Amount Collection Per Day"
              className="form-control"
              value={totalAmountCollectionPerDay}
              onChange={(e) => setTotalAmountCollectionPerDay(e.target.value)}
            />
          </div>
          <button className="btn btn-primary">Update</button>
        </form>
      </div>
    </div>
  );
}

export default UpdatePlace;
