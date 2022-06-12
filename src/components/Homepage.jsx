import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/User";
import { Link } from "react-router-dom";
import profilePlaceholder from "../assets/images/profile-placeholder.png";
import {
  fetchAcceptedListingsByUserID,
  fetchListingsByUserID,
  fetchPendingListingsByUserID,
  fetchRejectedListingsByUserID,
} from "../firebase/functions/read";
import RideCard from "./RideCard";
import professionalHeadshot from "../assets/images/professionalHeadshot.jpeg";

export default function Homepage() {
  const { user } = useContext(UserContext);

  const [userPosts, setUserPosts] = useState([]);
  const [acceptedUserPosts, setAcceptedUserPosts] = useState([]);
  const [pendingUserPosts, setPendingUserPosts] = useState([]);
  const [rejectedUserPosts, setRejectedUserPosts] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user.uid) {
      fetchListingsByUserID(user.isDriver, user.uid).then((listings) => {
        listings.sort((a, b) => {
          if (a.interestedUserObjs.length > b.interestedUserObjs.length) {
            return -1;
          } else if (
            a.interestedUserObjs.length < b.interestedUserObjs.length
          ) {
            return 1;
          } else {
            return 0;
          }
        });
        setUserPosts(listings);
        setIsLoading(false);
      });
      fetchAcceptedListingsByUserID(user.isDriver, user.uid).then(
        (listings) => {
          setAcceptedUserPosts(listings);
          setIsLoading(false);
        }
      );
      fetchPendingListingsByUserID(user.isDriver, user.uid).then((listings) => {
        setPendingUserPosts(listings);
        setIsLoading(false);
      });
      fetchRejectedListingsByUserID(user.isDriver, user.uid).then(
        (listings) => {
          setRejectedUserPosts(listings);
          setIsLoading(false);
        }
      );
    }
  }, [user]);

  if (isLoading) return <p>Loading</p>;
  return (
    <>
      <section id="profile-section">
        <h2 className="title-text">Hello, {user.username}</h2>

        <img id="profile-img" src={professionalHeadshot} alt="user profile" />
        <p>Your role is {user.isDriver ? "Driver" : "Passenger"}</p>
        <p>
          You are currently offering rides from <br></br> {user.postcode}
        </p>
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
          View all available rides
        </Link>
      </section>
      <section id="current-rides">
        <h2>My Posted {user.isDriver ? "Offers" : "requests"}</h2>{" "}
        {/* our posts */}
        {userPosts ? (
          userPosts.map((ride) => {
            return <RideCard ride={ride} key={ride.uid} isOwn={true} />;
          })
        ) : (
          <p>No rides currently</p>
        )}
        <h2>{user.isDriver ? "Requests" : "Offers"} I've Responded To</h2>
        <h3 className="ride-subtitle">
          Accepted {user.isDriver ? "offers" : "requests"}
        </h3>
        {acceptedUserPosts ? (
          acceptedUserPosts.map((ride) => {
            return <RideCard ride={ride} key={ride.uid} />;
          })
        ) : (
          <p>No rides currently accepted</p>
        )}
        <h3 className="ride-subtitle">
          Pending {user.isDriver ? "offers" : "requests"}
        </h3>
        {pendingUserPosts ? (
          pendingUserPosts.map((ride) => {
            return <RideCard ride={ride} key={ride.uid} />;
          })
        ) : (
          <p>No rides currently pending</p>
        )}
        <h3 className="ride-subtitle">
          Rejected {user.isDriver ? "offers" : "requests"}
        </h3>
        {rejectedUserPosts ? (
          rejectedUserPosts.map((ride) => {
            return <RideCard ride={ride} key={ride.uid} />;
          })
        ) : (
          <p>No rides currently Rejected</p>
        )}
      </section>
    </>
  );
}
