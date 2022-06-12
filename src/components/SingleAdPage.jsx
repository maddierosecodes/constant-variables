import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchSingleListing } from "../firebase/functions/read";
import { toOutcode } from "postcode";

export default function SingleAdPage() {
  const { type, rideID } = useParams();
  const [listingInfo, setListingInfo] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchSingleListing(rideID, type).then((info) => {
      setListingInfo(info);
      setIsLoading(false);
    });
  }, []);
  const {
    body,
    createdAt,
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
      <p>Posted: {new Date(createdAt * 1000).toLocaleString()}</p>
      <p>Date and time: {new Date(date * 1000).toLocaleString()}</p>
      <p>
        Start: {toOutcode(postcodeStart)} Destination: {destination}
      </p>
      <p>Contact: {email}</p>
      {statusAccepted && <p>Listing fulfilled!</p>}
    </div>
  );
}
