import './App.css';
import Entity from './Components/Entity';
import LandingPage from './Components/LandingPage';
import data from './data.json';
import { Routes, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Places from './Components/Places';
import CreatePlace from './Components/CreatePlace';
import UpdatePlace from './Components/UpdatePlace';

function App() {
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
              <li className="nav-item">
                <Link className="nav-link" to='/update'>Update Place</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/entities' element={<Entity />} />
        <Route path='/places' element={<Places />} />
        <Route path='/create' element={<CreatePlace />} />
        <Route path='/update' element={<UpdatePlace />} />
      </Routes>
    </div>
  );
}

export default App;

