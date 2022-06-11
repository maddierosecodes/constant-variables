import './App.css';
import { useState } from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import { UserContext } from './contexts/User';
import Login from './components/Login';
import Header from './components/Header';
import Homepage from './components/Homepage';
import ListOfRides from './components/ListOfRides';

function App() {
  const [user, setUser] = useState({
    username: 'Ira Martinez',
    role: 'driver',
    postcode: 'm1',
  });
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <div className='App'>
        <Header />
        <p>
          <Link to='/login'>Log in here</Link>
        </p>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/login' element={<Login />} />
          <Route path='/home' element={<Homepage />} />
          <Route path='/rides' element={<ListOfRides />} />
        </Routes>
      </div>
    </UserContext.Provider>
  );
}

export default App;
