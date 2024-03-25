import './App.css';
import Entity from './Components/Entity';
import LandingPage from './Components/LandingPage';
import data from './data.json';
import { Routes, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Places from './Components/Places';
import CreatePlace from './Components/CreatePlace';
import UpdatePlace from './Components/UpdatePlace';
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [placeToUpdate, setPlaceToUpdate] =  useState(null)
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
  }, []);

  const handleUpdate = (entityId) => {
    const place = entities.find(entity => entity._id === entityId)
    setPlaceToUpdate(place)
  }
  return (
    <div className="container">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to='/'>Beautiful Places</Link>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to='/'>Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to='/entities'>All Entities</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to='/create'>Create Place</Link>
              </li>
              {/* <li className="nav-item">
                <Link className="nav-link" to='/update'>Update Place</Link>
              </li> */}
            </ul>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/entities' element={<Entity handleUpdate={handleUpdate} />} />
        <Route path='/create' element={<CreatePlace />} />
        <Route path='/update' element={<UpdatePlace placeToUpdate={placeToUpdate} />} />
      </Routes>
    </div>
  );
}

export default App;

