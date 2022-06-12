import { toOutcode } from 'postcode';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/User';
import { fetchListings } from '../firebase/functions/read';

export default function ListOfRides() {
  const [listItems, setListItems] = useState([]);
  const { user } = useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {
    const collectionName = user.isDriver ? 'requests' : 'offers';
    fetchListings(collectionName).then((listings) => {
      setListItems(listings);
    });
  }, []);

  return (
    <div>
      <h2 className='title-text'>
        List of {user.isDriver ? 'Requests' : 'Offers'}
      </h2>

      {listItems.map((listing) => {
        return (
          <article
            className='ride-card mw5 center bg-white br3 pa3 pa4-ns mv3 ba b--black-10'
            key={listing.uid}
          >
            <h2 className='f4'>{listing.body}</h2>
            <hr className='mw3 bb bw1 b--black-10' />
            <p>
              Posted By:
              <Link
                className='f4 fw6 db purple no-underline underline-hover'
                to={`/profile/${user.isDriver ? 'passenger' : 'driver'}/${
                  listing.creatorId
                }`}
              >
                {listing.createdBy}
              </Link>
            </p>
            <p>
              Journey Start: {toOutcode(listing.postcodeStart)} Destination:{' '}
              {listing.destination}
            </p>
            <p>Leaving at: {new Date(listing.date * 1000).toLocaleString()}</p>
            <p>Posted: {new Date(listing.createdAt * 1000).toLocaleString()}</p>
            <div className='button-container'>
              <button
                className='card-button'
                onClick={() =>
                  navigate(
                    `/rides/${user.isDriver ? 'request' : 'offer'}/${
                      listing.uid
                    }`
                  )
                }
              >
                More Information
              </button>
              <button
                className='card-button'
                onClick={() =>
                  navigate(
                    `/profile/${user.isDriver ? 'passenger' : 'driver'}/${
                      listing.creatorId
                    }`
                  )
                }
              >
                View User Profile
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
}

//test data, remove once database connection set up
const offers = [
  {
    id: 1,
    passengers: 2,
    body: 'ff',
    createdBy: 'dd',
    date: Date.now(),
    destination: 'd77 8vv',
    postcodeStart: 'd72',
    title: 'hshshss',
  },
  {
    id: 2,
    passengers: 5,
    body: 'ffsdf',
    createdBy: 'sfdd',
    date: Date.now(),
    destination: 'g15 7gd',
    postcodeStart: 'h55',
    title: 'hshshsheheshss',
  },
  {
    id: 3,
    passengers: 3,
    body: 'ffsgheh',
    createdBy: 'heehehdd',
    date: Date.now(),
    destination: 'dd2 6dd',
    postcodeStart: 'd22',
    title: 'hshshsghsthsehs',
  },
];

const requests = [
  {
    id: 1,
    passengers: 6,
    body: 'fegasf',
    createdBy: 'sfgsdd',
    date: Date.now(),
    destination: 'rt4 4gf',
    postcodeStart: 'rt3',
    title: 'hshagargagreshss',
  },
  {
    id: 2,
    passengers: 5,
    body: 'ffagagasdf',
    createdBy: 'agagasfdd',
    date: Date.now(),
    destination: 'fe3 3re',
    postcodeStart: 'fg4',
    title: 'hagaaggagshshsheheshss',
  },
  {
    id: 3,
    passengers: 3,
    body: 'ffsgnhdnfdgheh',
    createdBy: 'hgfdnfgdfneehehdd',
    date: Date.now(),
    destination: 'ds4 3fd',
    postcodeStart: 'fd3',
    title: 'hshshsghsthsehdngfdngfdnfs',
  },
];
