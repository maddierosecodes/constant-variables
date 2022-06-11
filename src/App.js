import "./App.css";
import { useState, useContext } from "react";
import { Route, Routes, Link } from "react-router-dom";
import { UserContext } from "./contexts/User";
import Login from "./components/Login";
import Header from "./components/Header";
import Homepage from "./components/Homepage";
import PostRide from "./components/PostRide";

function App() {
  const [user, setUser] = useState({
    username: "Ira Martinez",
    role: "driver",
    postcode: "m1",
    email: "ira.martinez@gmail.com",
  });
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <div className="App">
        <Header />
        <p>
          <Link to="/login">Log in here</Link>
        </p>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Homepage />} />
          <Route path="/post" element={<PostRide />} />
        </Routes>
      </div>
    </UserContext.Provider>
  );
}

export default App;
