import './App.css';
import { useState, useContext } from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import Login from './components/Login';
import { UserContext } from './contexts/User';

function App() {
  const [user, setUser] = useState({
    username: 'Ira Martinez',
  });
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <div className='App'>
        <header className='App-header'>
          <h1>Project name</h1>
        </header>
        <p>
          <Link to='/login'>Login here</Link>
        </p>
        <Routes>
          <Route path='/login' element={<Login />} />
        </Routes>
      </div>
    </UserContext.Provider>
  );
}

export default App;
