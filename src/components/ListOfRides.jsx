import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchListings } from "../firebase/functions/read";

export default function ListOfRides() {
  const [listItems, setListItems] = useState([]);
  const [isDriver, setIsDriver] = useState(true); // for testing, probably not needed once userContext set up.

  const navigate = useNavigate();

  useEffect(() => {
    console.log("hi");
    const collectionName = isDriver ? "requests" : "offers";
    fetchListings(collectionName).then((listings) => {
      setListItems(listings);
    });
  }, [isDriver]); // for testing, remove dependency once userContext set up.

  function acceptListing(listingID) {
    console.log(listingID);
    // to add accept listing funtionailty once database connection set up
  }

  return (
    <div>
      <h2>List of {isDriver ? "Requests" : "Offers"}</h2>
      <button onClick={() => setIsDriver(!isDriver)}>
        Driver to {`${!isDriver}`}
      </button>
      {/* <--- for testing, remove once userContext set up */}
      <ul>
        {listItems.map((listing) => {
          return (
            <li className="ride-card" key={listing.uid}>
              <p>{listing.title}</p>
              <p>
                Posted By:
                <Link
                  to={`/profile/${isDriver ? "passenger" : "driver"}/${
                    listing.uid
                  }`}
                >
                  {listing.createdBy}
                </Link>
              </p>
              <p>
                Journey Start: {listing.postcodeStart} Destination:{" "}
                {listing.destination}
              </p>
              <p>
                Posted: {new Date(listing.createdAt * 1000).toLocaleString()}
              </p>
              <p>
                Date and time: {new Date(listing.date * 1000).toLocaleString()}
              </p>
              <button onClick={() => acceptListing(listing.id)}>
                Accept {isDriver ? "Request" : "Offer"}
              </button>
              <button
                onClick={() =>
                  navigate(
                    `/profile/${isDriver ? "passenger" : "driver"}/${
                      listing.uid
                    }`
                  )
                }
              >
                View User Profile
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

//test data, remove once database connection set up
const offers = [
  {
    id: 1,
    passengers: 2,
    body: "ff",
    createdBy: "dd",
    date: Date.now(),
    destination: "d77 8vv",
    postcodeStart: "d72",
    title: "hshshss",
  },
  {
    id: 2,
    passengers: 5,
    body: "ffsdf",
    createdBy: "sfdd",
    date: Date.now(),
    destination: "g15 7gd",
    postcodeStart: "h55",
    title: "hshshsheheshss",
  },
  {
    id: 3,
    passengers: 3,
    body: "ffsgheh",
    createdBy: "heehehdd",
    date: Date.now(),
    destination: "dd2 6dd",
    postcodeStart: "d22",
    title: "hshshsghsthsehs",
  },
];

const requests = [
  {
    id: 1,
    passengers: 6,
    body: "fegasf",
    createdBy: "sfgsdd",
    date: Date.now(),
    destination: "rt4 4gf",
    postcodeStart: "rt3",
    title: "hshagargagreshss",
  },
  {
    id: 2,
    passengers: 5,
    body: "ffagagasdf",
    createdBy: "agagasfdd",
    date: Date.now(),
    destination: "fe3 3re",
    postcodeStart: "fg4",
    title: "hagaaggagshshsheheshss",
  },
  {
    id: 3,
    passengers: 3,
    body: "ffsgnhdnfdgheh",
    createdBy: "hgfdnfgdfneehehdd",
    date: Date.now(),
    destination: "ds4 3fd",
    postcodeStart: "fd3",
    title: "hshshsghsthsehdngfdngfdnfs",
  },
];
