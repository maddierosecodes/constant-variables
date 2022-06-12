import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header id="header">
      <h1>Spare Seats</h1>
      <nav>
        <Link to="/home">Home</Link>
        <Link to="/rides">Rides</Link>
        <Link to="/post">Post</Link>
      </nav>
    </header>
  );
}

// <Route path="/" element={<Splash />}></Route>
//           <Route path="/login" element={<Login />} />
//           <Route path="/sign-up" element={<SignUp />} />
//           <Route path="/home" element={<Homepage />} />
//           <Route path="/rides" element={<ListOfRides />} />
//           <Route
//             path="/additional-questions"
//             element={<AdditionalSignUp />}
//           ></Route>
//           <Route path="/post" element={<PostRide />}></Route>
//           <Route
//             path="/profile/:role/:userID"
//             element={<OtherUserProfilePage />}
//           />
//           <Route path="/rides/:type/:rideID" element={<SingleAdPage />} />
