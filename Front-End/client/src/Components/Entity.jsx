import React from 'react';
import './Entity.css'
import { useState, useEffect } from 'react';
import axios from 'axios';

// function Entity(props) {
//   return (
//     <div>
//         <img src="https://imachupicchu.com/wp-content/uploads/imachu-picchu.jpg" alt="place-img" className='place-img' />
//         <h1>Place Name: {props.placeName}</h1>
//         <h2>Location : {props.location}</h2>
//         <h3>Primary Attraction: {props.primaryAttraction}</h3>
//         <h4>Year of Establishment: {props.yearOfEstablishment}</h4>
//         <p>Description: {props.description}</p>
//         <p>Average Rating: {props.averageRating}</p>
//         <p>Visitor Count: {props.visitorCount}</p>
//     </div>
//   );
// }

function Entity() {
  const [entities, setEntities] = useState([]);

  useEffect(() => {
    // Fetch entities from the server
    axios.get('http://localhost:3001/api/read')
      .then(response => {
        console.log(response.data)
        setEntities(response.data.data); // Set the entities in the state
      })
      .catch(error => {
        console.log('Error fetching entities:', error);
      });
  }, []); // Empty dependency array ensures useEffect runs only once after component mount

  return (
    <div>
      <h1>All Entities</h1>
      <ul>
        {entities.map(entity => (
          <li key={entity._id} className="entity-item">
          <h2>{entity.placeName}</h2>
          <p>Location: {entity.location}</p>
          <p>Primary Attraction: {entity.primaryAttraction}</p>
          <p>Description: {entity.description}</p>
          <p>Average Rating: {entity.averageRating}</p>
          <p>Visitor Count: {entity.visitorCount}</p>
          <p>Nearby Accomodations:</p> 
          <ul>
            {entity.nearbyAccommodations.map((accommodation, index) => (
              <li key={index}>{accommodation}</li>
            ))}
          </ul>
        </li>
          
        ))}
      </ul>
    </div>
  );
}

export default Entity;
