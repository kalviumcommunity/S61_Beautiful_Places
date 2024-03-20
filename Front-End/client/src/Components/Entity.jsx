import React from 'react';
import './Entity.css'

function Entity(props) {
  return (
    <div>
        <img src="https://imachupicchu.com/wp-content/uploads/imachu-picchu.jpg" alt="place-img" className='place-img' />
        <h1>Place Name: {props.placeName}</h1>
        <h2>Location : {props.location}</h2>
        <h3>Primary Attraction: {props.primaryAttraction}</h3>
        <h4>Year of Establishment: {props.yearOfEstablishment}</h4>
        <p>Description: {props.description}</p>
        <p>Average Rating: {props.averageRating}</p>
        <p>Visitor Count: {props.visitorCount}</p>
    </div>
  );
}

export default Entity;
