import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import profilePlaceholder from "../assets/images/profile-placeholder.png";

export default function ProfilePage() {
  const { userID } = useParams();
  const [profileInfo, setProfileInfo] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setProfileInfo(passengers[userID]);
    setIsLoading(false);
  }, []);

  if (isLoading) return <p>loading...</p>;

  return (
    <div>
      {" "}
      <Link
        className="f4 fw6 db purple no-underline underline-hover"
        to="/rides"
      >
        Back to all rides
      </Link>
      <h2>{profileInfo.username}'s Profile</h2>
      <img id="profile-img" src={profilePlaceholder} alt="user profile" />
      <h3>{profileInfo.firstName}</h3>
      <p>{profileInfo.profile}</p>
      <p>{profileInfo.firstName}'s role is passenger</p>
      <p>
        {profileInfo.firstName} is currently requiring rides from{" "}
        {profileInfo.postcode}
      </p>
      <p>Gender: {profileInfo.gender}</p>
      <p>Age Group: {profileInfo.ageGroup}</p>
      <p>Language(s):</p>
    </div>
  );
}

//test data, remove once database connection set up
const passengers = {
  sfgsdd: {
    id: 1,
    username: "sfgsdd",

    acceptedOffers: ["exampleOffer"],
    ageGroup: "18-29",
    firstName: "Lucy",
    gender: "female",
    isDriver: false,
    lastName: "Smith",
    postcode: "M2",
    profile: "Give us a lift",
    requests: ["exampleRequest"],
  },
  agagasfdd: {
    id: 2,
    username: "agagasfdd",

    acceptedOffers: ["exampleOffer"],
    ageGroup: "18-29",
    firstName: "Lucy",
    gender: "female",
    isDriver: false,
    lastName: "Smith",
    postcode: "M2",
    profile: "Give us a lift",
    requests: ["exampleRequest"],
  },
  hgfdnfgdfneehehdd: {
    id: 3,
    username: "hgfdnfgdfneehehdd",

    acceptedOffers: ["exampleOffer"],
    ageGroup: "18-29",
    firstName: "Lucy",
    gender: "female",
    isDriver: false,
    lastName: "Smith",
    postcode: "M2",
    profile: "Give us a lift",
    requests: ["exampleRequest"],
  },
};
