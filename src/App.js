import './App.css';
import { useState } from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import { UserContext } from './contexts/User';
import Login from './components/Login';
import Header from './components/Header';
import Homepage from './components/Homepage';
import ListOfRides from './components/ListOfRides';
import DriverProfilePage from './components/DriverProfilePage';
import PassengerProfilePage from './components/PassengerProfilePage';
import DriverReview from './components/DriverProfile';
import PostRide from "./components/PostRide";


function App() {
  const [user, setUser] = useState({
    username: 'Ira Martinez',
    role: 'driver',
    postcode: 'm1',
    isLoggedIn: false,
    email: "ira.martinez@gmail.com"
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

          <Route path='/profile/driver/:userID' element={<DriverProfilePage />} />
          <Route path='/profile/passenger/:userID' element={<PassengerProfilePage />} />

            <Route path="/post" element={<PostRide />} />

        </Routes>
      </main>
    </UserContext.Provider>
  );
}

export default App;
