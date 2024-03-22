import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Places() {
  const [places, setPlaces] = useState([{
    placeName: 'Eiffel Tower',
    location: ['Paris', 'France'],
    primaryAttraction: 'Iconic landmark and symbol of Paris',
    yearOfEstablishment: 1889,
    description: "The Eiffel Tower is a wrought-iron lattice tower on the Champ de Mars in Paris, France. It is named after the engineer Gustave Eiffel, whose company designed and built the tower as the entrance arch for the 1889 World's Fair. It has become both a global cultural icon of France and one of the most recognizable structures in the world.",
    averageRating: 'Varies based on visitor experiences;',
    visitorCount: 'Millions of visitors annually (pre-pandemic)',
    nearbyAccommodations: 'Various hotels and accommodations are available in the surrounding areas of Paris.',
    nearbyRestaurants: 'Numerous restaurants and cafes are located nearby, offering a variety of cuisine options.',
    suitableWeather: 'The Eiffel Tower can be visited year-round, but spring and summer months tend to offer more favorable weather conditions.',
    keyFeatures: 'Stunning panoramic views of Paris from the top, intricate lattice ironwork design, illuminated at night with thousands of twinkling lights.',
    totalAmountCollectionPerDay: 'Revenue from ticket sales, souvenir shops, and restaurants contribute to the total collection per day.'

  }])
  return (
    <div className=' vh-150 bg-primary justify-content-center align-items-center'>
      <div className='w-50 bg-white rounded p-3'>
        <Link to='/create' className='btn btn-success'>Add +</Link>
        <table className='table'>
          <thead>
            <tr>
              <th>Place Name</th>
              <th>Location</th>
              <th>Primary Attraction</th>
              <th>Year of Establishment</th>
              <th>Description</th>
              <th>Average Rating</th>
              <th>Visitor Count</th>
              <th>Nearby Accommodations</th>
              <th>Nearby Restaurants</th>
              <th>Suitable Weather</th>
              <th>Key Features</th>
              <th>Total Amount Collection Per Day</th>
            </tr>
          </thead>
          <tbody>
            {
              places.map((place) => {
                return <tr>
                  <td>{place.placeName}</td>
                    <td>{place.location}</td>
                    <td>{place.primaryAttraction}</td>
                    <td>{place.yearOfEstablishment}</td>
                    <td>{place.description}</td>
                    <td>{place.averageRating}</td>
                    <td>{place.visitorCount}</td>
                    <td>{place.nearbyAccommodations}</td>
                    <td>{place.nearbyRestaurants}</td>
                    <td>{place.suitableWeather}</td>
                    <td>{place.keyFeatures}</td>
                    <td>{place.totalAmountCollectionPerDay}</td>
                    <td>
                      <Link to='/update' className='btn btn-success'>Update</Link>
                      <button>Delete</button>
                    </td>

                </tr>
              })
            }
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Places;
