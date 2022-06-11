import logo from './logo.svg';
import './App.css';
import db from './firebase';
import { seedUsers, seedListings } from './dummy-data/seed';
import { useEffect } from 'react';
import { drivers } from './dummy-data/local-data/seed-data/drivers';
import { passengers } from './dummy-data/local-data/seed-data/passengers';

function App() {

    seedUsers(drivers, 'app/users/drivers');
    seedUsers(passengers, 'app/users/passengers');


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer">
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
