import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import profilePlaceholder from "../assets/images/profile-placeholder.png";

export default function ProfilePage() {
  const { userID } = useParams();
  const [profileInfo, setProfileInfo] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setProfileInfo(drivers[userID]);
    setIsLoading(false);
  }, []);

  if(isLoading) return <p>loading...</p>


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
      <p>Rating: {profileInfo.rating}/5</p>
      <p>{profileInfo.profile}</p>
      <p>{profileInfo.firstName}'s role is driver</p>
      <p>
        {profileInfo.firstName} is currently offering rides from{" "}
        {profileInfo.postcode}
      </p>
      <p>Gender: {profileInfo.gender}</p>
      <p>Age Group: {profileInfo.ageGroup}</p>
      <p>Language(s):</p>
      <ul>
        Background Checks:{" "}
        <li>
          {profileInfo.backgroundChecks.dbs
            ? "DBS checked ✅"
            : "DBS not checked ❌"}
        </li>{" "}
        <li>
          {" "}
          {profileInfo.backgroundChecks.licensed
            ? "License checked ✅"
            : "License not checked ❌"}
        </li>
      </ul>
      {/* driver reviews component */}
    </div>
  );
}

//test data, remove once database connection set up
const drivers = {
  dd: {
    id: 1,
    username: "dd",

    acceptedRequests: ["exampleRequest"],
    ageGroup: "18-29",
    backgroundChecks: { dbs: true, licensed: true },
    carReg: "AB12 CDE",
    firstName: "Geoff",
    gender: "male",
    isDriver: true,
    lastName: "Smith",
    offers: ["exampleOffer"],
    postcode: "M1",
    profile: "I like to drive places",
    rating: 5,
  },
  sfdd: {
    id: 2,
    username: "sfdd",

    acceptedRequests: ["exampleRequest"],
    ageGroup: "18-29",
    backgroundChecks: { dbs: true, licensed: true },
    carReg: "AB12 CDE",
    firstName: "Geoff",
    gender: "male",
    isDriver: true,
    lastName: "Smith",
    offers: ["exampleOffer"],
    postcode: "M1",
    profile: "I like to drive places",
    rating: 5,
  },
  heehehdd: {
    id: 3,
    username: "heehehdd",

    acceptedRequests: ["exampleRequest"],
    ageGroup: "18-29",
    backgroundChecks: { dbs: true, licensed: true },
    carReg: "AB12 CDE",
    firstName: "Geoff",
    gender: "male",
    isDriver: true,
    lastName: "Smith",
    offers: ["exampleOffer"],
    postcode: "M1",
    profile: "I like to drive places",
    rating: 5,
  },
};
