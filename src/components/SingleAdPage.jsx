import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchSingleListing } from "../firebase/functions/read";
import { toOutcode } from "postcode";
import { registerInterest } from "../firebase/functions/write";
import { UserContext } from "../contexts/User";

export default function SingleAdPage() {
  const { type, rideID } = useParams();
  const [listingInfo, setListingInfo] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const { user } = useContext(UserContext);
  const handleInterest = (e) => {
    e.preventDefault();
    registerInterest(rideID, user.uid, user.username, type);
  };

  useEffect(() => {
    fetchSingleListing(rideID, type).then((info) => {
      console.log(info, "<<<<");
      setListingInfo(info);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return <p>Loading</p>;
  }
  const {
    body,
    posted,
    createdBy,
    creatorId,
    date,
    destination,
    email,
    passengers,
    postcodeStart,
    statusAccepted,
    uid,
  } = listingInfo;
  return (
    <div>
      <Link
        className="f4 fw6 db purple no-underline underline-hover"
        to="/rides"
      >
        Back to all rides
      </Link>
      <p>{body}</p>
      <p>Passengers: {passengers}</p>
      <p>{createdBy}</p>
      <p>Posted: {new Date(posted * 1000).toLocaleString()}</p>
      <p>Date and time: {new Date(date * 1000).toLocaleString()}</p>
      <p>
        Start: {postcodeStart ? toOutcode(postcodeStart) : null} Destination:{" "}
        {destination}
      </p>
      <p>Contact: {email}</p>
      {statusAccepted && <p>Listing fulfilled!</p>}
      <button onClick={handleInterest}>Register Interest</button>
    </div>
  );
}
