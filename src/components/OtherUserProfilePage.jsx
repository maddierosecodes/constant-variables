import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import profilePlaceholder from "../assets/images/profile-placeholder.png";
import { getOtherProfile } from "../firebase/functions/read";
import { toOutcode } from "postcode";

export default function ProfilePage() {
  const { role, userID } = useParams();
  const [profileInfo, setProfileInfo] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  console.log(role);

  useEffect(() => {
    getOtherProfile(userID, role).then((userInfo) => {
      console.log(userInfo);
      setProfileInfo(userInfo);
      setIsLoading(false);
    });
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
      <p>
        Rating:{" "}Î
        {profileInfo.rating ? `${profileInfo.rating}/5` : "not yet rated"}
      </p>
      <p>{profileInfo.profile}</p>
      <p>
        {profileInfo.firstName}'s role is{" "}
        {profileInfo.isDriver ? "driver" : "passenger"}
      </p>
      <p>
        {profileInfo.firstName} is currently{" "}
        {profileInfo.isDriver ? "offering" : "requesting"} rides from{" "}
        {toOutcode(profileInfo.postcode)}
      </p>
      <p>Gender: {profileInfo.gender}</p>
      <p>Age Group: {profileInfo.ageGroup}</p>
      <p>Language(s): {profileInfo.languages.map((x) => x + " ")}</p>
      {profileInfo.isDriver && (
        <ul>
          Background Checks:{" "}
          <li>
            {profileInfo.backgroundCheck.dbs
              ? "DBS checked ✅"
              : "DBS not checked ❌"}
          </li>{" "}
          <li>
            {" "}
            {profileInfo.backgroundCheck.licensed
              ? "License checked ✅"
              : "License not checked ❌"}
          </li>
        </ul>
      )}
      <p>Contact: {profileInfo.email}</p>
      {/* driver reviews component */}
    </div>
  );
}

//test data, remove once database connection set up
// const drivers = {
//   dd: {
//     id: 1,
//     username: "dd",

//     acceptedRequests: ["exampleRequest"],
//     ageGroup: "18-29",
//     backgroundCheck: { dbs: true, licensed: true },
//     carReg: "AB12 CDE",
//     firstName: "Geoff",
//     gender: "male",
//     isDriver: true,
//     lastName: "Smith",
//     offers: ["exampleOffer"],
//     postcode: "M1",
//     profile: "I like to drive places",
//     rating: 5,
//   },
//   sfdd: {
//     id: 2,
//     username: "sfdd",

//     acceptedRequests: ["exampleRequest"],
//     ageGroup: "18-29",
//     backgroundChecks: { dbs: true, licensed: true },
//     carReg: "AB12 CDE",
//     firstName: "Geoff",
//     gender: "male",
//     isDriver: true,
//     lastName: "Smith",
//     offers: ["exampleOffer"],
//     postcode: "M1",
//     profile: "I like to drive places",
//     rating: 5,
//   },
//   heehehdd: {
//     id: 3,
//     username: "heehehdd",

//     acceptedRequests: ["exampleRequest"],
//     ageGroup: "18-29",
//     backgroundChecks: { dbs: true, licensed: true },
//     carReg: "AB12 CDE",
//     firstName: "Geoff",
//     gender: "male",
//     isDriver: true,
//     lastName: "Smith",
//     offers: ["exampleOffer"],
//     postcode: "M1",
//     profile: "I like to drive places",
//     rating: 5,
//   },
// };
