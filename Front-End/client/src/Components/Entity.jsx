// import React from 'react';
// import './Entity.css'
// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import UpdatePlace from './UpdatePlace';
// import { Link } from 'react-router-dom';

// // function Entity(props) {
// //   return (
// //     <div>
// //         <img src="https://imachupicchu.com/wp-content/uploads/imachu-picchu.jpg" alt="place-img" className='place-img' />
// //         <h1>Place Name: {props.placeName}</h1>
// //         <h2>Location : {props.location}</h2>
// //         <h3>Primary Attraction: {props.primaryAttraction}</h3>
// //         <h4>Year of Establishment: {props.yearOfEstablishment}</h4>
// //         <p>Description: {props.description}</p>
// //         <p>Average Rating: {props.averageRating}</p>
// //         <p>Visitor Count: {props.visitorCount}</p>
// //     </div>
// //   );
// // }

// function Entity({handleUpdate}) {
//   const [entities, setEntities] = useState([]);
//   const [entityToUpdate, setEntityToUpdate] = useState(null);
//   const [users, setUsers] = useState([]);
//   const [selectedUser, setSelectedUser] = useState('')

//   useEffect(() => {
//     axios.get(`http://localhost:3001/admin/users`)
//       .then(response => {
//         setUsers(response.data);
//       })
//       .catch(error => {
//         console.log('Error fetching users:', error);
//       })
//   },[])
//   useEffect(() => {
//     // Fetch entities from the server
//     axios.get('http://localhost:3001/api/read')
//       .then(response => {
//         console.log(response.data)
//         setEntities(response.data.data); // Set the entities in the state
//       })
//       .catch(error => {
//         console.log('Error fetching entities:', error);
//       });
//   }, []); // Empty dependency array ensures useEffect runs only once after component mount

//   const onDelete = (id) => {
//     axios.delete(`http://localhost:3001/api/delete/${id}`)
//     .then(response => {
//       console.log(response.data);
//       setEntities(entities.filter(entity => entity._id !== id));
//     })
//     .catch(error => {
//       console.log('Error deleting entity:', error);
//     })
//   }

//   const handleUpdateEntity = (id) => {
//     setEntityToUpdate(id);
//     const entityToUpdate = entities.find(entity => entity._id === id)
//     console.log('Details of entity to update:', entityToUpdate);
//   }
//   return (
//     <div>
//       {entityToUpdate ? ( // Render UpdatePlace component if entityToUpdate is not null
//         <UpdatePlace 
//             placeToUpdate={entities.find(entity => entity._id === entityToUpdate)}
//             handleUpdateEntity = {() => setEntityToUpdate(null)}
//              />
//       ) : (
//         <div>
//           <h1>All Entities</h1>
//           <ul>
//             {entities.map(entity => (
//               <li key={entity._id} className="entity-item">
//                 <h2>{entity.placeName}</h2>
//                 <p>Location: {entity.location}</p>
//                 <p>Primary Attraction: {entity.primaryAttraction}</p>
//                 <p>Description: {entity.description}</p>
//                 <p>Average Rating: {entity.averageRating}</p>
//                 <p>Visitor Count: {entity.visitorCount}</p>
//                 <p>Nearby Accomodations:</p> 
//                 <ul>
//                   {entity.nearbyAccommodations.map((accommodation, index) => (
//                     <li key={index}>{accommodation}</li>
//                   ))}
//                 </ul>
//                 <div className="button-container">
//                   {/* Update button */}
//                   <button className="update-button" onClick={() => handleUpdate(entity._id)}>
//                     <Link to='/update'>Update</Link>

//                   </button>
//                   {/* Delete button */}
//                   <button className="delete-button" onClick={() => onDelete(entity._id)}>Delete</button>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );

// }

// export default Entity;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import UpdatePlace from './UpdatePlace';

function Entity({ handleUpdate }) {
  const [entities, setEntities] = useState([]);
  const [entityToUpdate, setEntityToUpdate] = useState(null);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');

  // Fetch all users
  useEffect(() => {
    axios.get('http://localhost:3001/admin/users')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.log('Error fetching users:', error);
      })
  },[])

  useEffect(() => {
    // Fetch entities based on selected user if a user is selected
    if (selectedUser && selectedUser !=='AllUsers') {
      axios.get(`http://localhost:3001/api/entities/${selectedUser}`)
        .then(response => {
          setEntities(response.data.data);
        })
        .catch(error => {
          console.log('Error fetching entities:', error);
        });
    } else {
      // Fetch all entities if no user is selected
      axios.get('http://localhost:3001/api/read')
        .then(response => {
          console.log(response.data);
          setEntities(response.data.data);
        })
        .catch(error => {
          console.log('Error fetching entities:', error);
        });
    }
  }, [selectedUser]);

  const onDelete = (id) => {
    axios.delete(`http://localhost:3001/api/delete/${id}`)
      .then(response => {
        console.log(response.data);
        setEntities(entities.filter(entity => entity._id !== id));
      })
      .catch(error => {
        console.log('Error deleting entity:', error);
      })
  }

  const handleUpdateEntity = (id) => {
    setEntityToUpdate(id);
    const entityToUpdate = entities.find(entity => entity._id === id)
    console.log('Details of entity to update:', entityToUpdate);
  }

  return (
    <div>
      <select value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)}>
        <option value="AllUsers">All Users</option>
        {users.map(user => (
          <option key={user._id} value={user._id}>{user.username}</option>
        ))}
      </select>

      {entityToUpdate ? (
        <UpdatePlace 
          placeToUpdate={entities.find(entity => entity._id === entityToUpdate)}
          handleUpdateEntity={() => setEntityToUpdate(null)}
        />
      ) : (
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
                <p>Nearby Accommodations:</p> 
                <ul>
                  {entity.nearbyAccommodations.map((accommodation, index) => (
                    <li key={index}>{accommodation}</li>
                  ))}
                </ul>
                <div className="button-container">
                  <button className="update-button" onClick={() => handleUpdateEntity(entity._id)}>
                    <Link to='/update'>Update</Link>
                  </button>
                  <button className="delete-button" onClick={() => onDelete(entity._id)}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Entity;
