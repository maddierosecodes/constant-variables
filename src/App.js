import './App.css';
import { useState } from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import { UserContext } from './contexts/User';
import Login from './components/Login';
import Header from './components/Header';
import Homepage from './components/Homepage';
import ListOfRides from './components/ListOfRides';
import SignUp from './components/SignUp';
import AdditionalSignUp from './components/AdditionalSignUp';

function App() {
  const [user, setUser] = useState({
    username: 'Ira Martinez',
    role: 'driver',
    postcode: 'm1',
    isLoggedIn: false,
    email: 'ira.martinez@gmail.com',
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
          <Link
            className='f4 fw6 db purple no-underline underline-hover'
            to='/sign-up'
          >
            {user.isLoggedIn ? '' : 'Sign up here'}
          </Link>
        </nav>

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
        </Routes>
      </main>
    </UserContext.Provider>
  );
}

export default App;
