import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/User";
import { Link } from "react-router-dom";
import profilePlaceholder from "../assets/images/profile-placeholder.png";
import { fetchListingsByUserID } from "../firebase/functions/read";
import RideCard from "./RideCard";

export default function Homepage() {
  const { user } = useContext(UserContext);

  const [userPosts, setUserPosts] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user.uid) {
      fetchListingsByUserID(user.isDriver, user.uid).then((listings) => {
        setUserPosts(listings);
        setIsLoading(false);
      });
    }
  }, [user]);

  if (isLoading) return <p>Loading</p>;
  return (
    <>
      <section id="profile-section">
        <nav>
          <Link
            className="f4 fw6 db purple no-underline underline-hover"
            to="/"
          >
            Back to homepage
          </Link>
        </nav>
        <header>
          <h2>Hello, {user.username}</h2>
        </header>
        <img id="profile-img" src={profilePlaceholder} alt="user profile" />
        <p>Your role is {user.role}</p>
        <p>You are currently offering rides from {user.postcode}</p>
        <p>You may post a ride or search for rides already posted.</p>
        <Link
          className="ride-link f4 fw6 db black link hover-purple underline-hover"
          to="/post"
        >
          Post a ride
        </Link>
        <Link
          className="ride-link f4 fw6 db black link hover-purple underline-hover"
          to="/rides"
        >
          View all rides
        </Link>
      </section>
      <section id="current-rides">
        <h2>Current rides</h2>
        {userPosts ? (
          userPosts.map((ride) => {
            return <RideCard ride={ride} />;
          })
        ) : (
          <p>No rides currently</p>
        )}
      </section>
    </>
  );
}
