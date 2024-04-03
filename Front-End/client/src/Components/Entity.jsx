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
      });
  }, []);

  useEffect(() => {
    // Fetch all entities
    axios.get('http://localhost:3001/api/read')
      .then(response => {
        console.log(response.data);
        setEntities(response.data.data.map(entity => ({
          ...entity,
          createdBy: entity.createdBy || 'Unknown' // Set createdBy to 'Unknown' if it's not defined
        })));
      })
      .catch(error => {
        console.log('Error fetching entities:', error);
      });
  }, []);

  const onDelete = (id) => {
    axios.delete(`http://localhost:3001/api/delete/${id}`)
      .then(response => {
        console.log(response.data);
        setEntities(entities.filter(entity => entity._id !== id));
      })
      .catch(error => {
        console.log('Error deleting entity:', error);
      });
  };

  const handleUpdateEntity = (id) => {
    setEntityToUpdate(id);
    const entityToUpdate = entities.find(entity => entity._id === id);
    console.log('Details of entity to update:', entityToUpdate);
  };

  return (
    <div>
      <select value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)}>
        <option value="AllUsers">All Users</option>
        {users.map(user => (
          <option key={user._id} value={user.username}>{user.username}</option>
        ))}
      </select>

      <div>
        <h1>All Entities</h1>
        <ul>
          {selectedUser === 'AllUsers' ?
            entities.map(entity => (
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
            )) :
            entities
              .filter(entity => entity.createdBy === selectedUser)
              .map(entity => (
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
              ))
          }
        </ul>
      </div>
    </div>
  );
}

export default Entity;


