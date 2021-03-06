import './App.css';
import { useEffect, useState } from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import { UserContext } from './contexts/User';
import Login from './components/Login';
import Header from './components/Header';
import Homepage from './components/Homepage';
import ListOfRides from './components/ListOfRides';
import SignUp from './components/SignUp';
import AdditionalSignUp from './components/AdditionalSignUp';
import Splash from './components/Splash';
import PostRide from './components/PostRide';
import OtherUserProfilePage from './components/OtherUserProfilePage';
import SingleAdPage from './components/SingleAdPage';

function App() {
  const [user, setUser] = useState({
    username: 'Ira Martinez',
    role: 'driver',
    postcode: 'm1',
    isLoggedIn: false,
    email: 'ira.martinez@gmail.com',
  });

  useEffect(() => {
    if (user.isLoggedIn) {
      const userDataString = localStorage.getItem('userData');
      const userData = JSON.parse(userDataString);
      setUser(userData);
    }
  }, [user]);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <main className='App'>
        <Header />

        <Routes>
          <Route path='/' element={<Splash />}></Route>
          <Route path='/login' element={<Login />} />
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/home' element={<Homepage />} />
          <Route path='/rides' element={<ListOfRides />} />
          <Route
            path='/additional-questions'
            element={<AdditionalSignUp />}
          ></Route>
          <Route path='/post' element={<PostRide />}></Route>
          <Route
            path='/profile/:role/:userID'
            element={<OtherUserProfilePage />}
          />
          <Route path='/rides/:type/:rideID' element={<SingleAdPage />} />
        </Routes>
      </main>
    </UserContext.Provider>
  );
}

export default App;
