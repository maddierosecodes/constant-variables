import './App.css';
import { useState, useContext } from 'react';
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
    isLoggedIn: false,
  });
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <main className='App'>
        <Header />

        <nav>
          <Link
            className='f4 fw6 db purple no-underline underline-hover'
            to='/login'
          >
            {user.isLoggedIn ? '' : 'Log in here'}
          </Link>
        </nav>

        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/home' element={<Homepage />} />
          <Route path='/rides' element={<ListOfRides />} />
        </Routes>
      </main>
    </UserContext.Provider>
  );
}

export default App;
