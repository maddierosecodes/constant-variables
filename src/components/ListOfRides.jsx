import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ListOfRides() {
const [listItems, setListItems] = useState([]);
const [isDriver, setIsDriver] = useState(false); // for testing, probably not needed once userContext set up. 

const navigate = useNavigate()

  // if(isDriver) fetch from requests collection, else fetch from offers collection
  useEffect(() => {
      // once listing acceptance status set up only want to return listings not accepted
    if (isDriver) {
        setListItems(requests)
    } else {
        setListItems(offers)
    }
  }, [isDriver]); // for testing, remove dependency once userContext set up. 

function acceptListing(listingID) {
    console.log(listingID);
    // to add accept listing funtionailty once database connection set up
}

  return (
    <div>
      <h2>List Of {isDriver ? 'Requests' : 'Offers'}</h2>
      <button onClick={() => setIsDriver(!isDriver)}>Driver to {`${!isDriver}`}</button>{/* <--- for testing, remove once userContext set up */}
      <ul>
        {listItems.map((listing) => {
          return (
            <li className="ride-card" key={listing.id}>
              <p>{listing.title}</p>
              <p>Posted By: {listing.createdBy}</p>
              <p>
                Journey Start: {listing.postcodeStart} Destination:{" "}
                {listing.postcodeDestination}
              </p>
              <p>Posted: {new Date(listing.date).toLocaleString()}</p>
              <button onClick={() => acceptListing(listing.id)}>Accept {isDriver ? 'Request' : 'Offer'}</button>
              <button onClick={() => navigate(`/profile/${isDriver ? 'passenger' : 'driver' }/${listing.createdBy}`)} >View User Profile</button>
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
      postcodeDestination: "d77 8vv",
      postcodeStart: "d72",
      title: "hshshss",
    },
    {
      id: 2,
      passengers: 5,
      body: "ffsdf",
      createdBy: "sfdd",
      date: Date.now(),
      postcodeDestination: "g15 7gd",
      postcodeStart: "h55",
      title: "hshshsheheshss",
    },
    {
      id: 3,
      passengers: 3,
      body: "ffsgheh",
      createdBy: "heehehdd",
      date: Date.now(),
      postcodeDestination: "dd2 6dd",
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
      postcodeDestination: "rt4 4gf",
      postcodeStart: "rt3",
      title: "hshagargagreshss",
    },
    {
      id: 2,
      passengers: 5,
      body: "ffagagasdf",
      createdBy: "agagasfdd",
      date: Date.now(),
      postcodeDestination: "fe3 3re",
      postcodeStart: "fg4",
      title: "hagaaggagshshsheheshss",
    },
    {
      id: 3,
      passengers: 3,
      body: "ffsgnhdnfdgheh",
      createdBy: "hgfdnfgdfneehehdd",
      date: Date.now(),
      postcodeDestination: "ds4 3fd",
      postcodeStart: "fd3",
      title: "hshshsghsthsehdngfdngfdnfs",
    },
  ];
  