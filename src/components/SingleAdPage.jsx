import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchSingleListing } from "../firebase/functions/read";

export default function SingleAdPage() {
  const { type, rideID } = useParams();
  useEffect(() => {
    fetchSingleListing(rideID, type);
  }, []);

  return <div>SingleAdPage</div>;
}
