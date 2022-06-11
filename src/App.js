import logo from './logo.svg';
import './App.css';
import db from './firebase';
import { seedUsers, seedListings } from './dummy-data/seed';

function App() {
  seedListings([{ test: 'test' }], 'app/listings/requests');
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
