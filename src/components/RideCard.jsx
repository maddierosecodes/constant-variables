import React from "react";
import { Link } from "react-router-dom";
import { acceptInterest, rejectInterest } from "../firebase/functions/write";
function RideCard({ ride, isOwn = false }) {
  const handleAccept = (person) => {
    const acceptWrite = () => {
      acceptInterest(person, ride.uid);
    };

    return acceptWrite;
  };
  const handleReject = (person) => {
    const rejectWrite = () => {
      rejectInterest(person, ride.uid);
    };

    return rejectWrite;
  };
  return (
    <article className="mw5 center bg-white br3 pa3 pa4-ns mv3 ba b--black-10">
      <div className="tc">
        <h2 className="f4">{ride.body}</h2>
        <hr className="mw3 bb bw1 b--black-10" />

        {!isOwn ? null : !ride.interestedUserIDs ? null : (
          <>
            <p>People Interested</p>
            {ride.interestedUserObjs.map((person) => {
              return (
                <span key={person.uid}>
                  <p>{person.username}</p>{" "}
                  <Link
                    to={`/profile/${
                      person.type === "request" ? "driver" : "passenger"
                    }/${person.uid}`}
                  >
                    View Profile
                  </Link>
                  <>
                    <button
                      type={"default"}
                      onClick={handleAccept(person, ride)}
                    >
                      Accept
                    </button>
                    <button
                      type={"default"}
                      onClick={handleReject(person, ride)}
                    >
                      Reject
                    </button>
                  </>
                  )
                </span>
              );
            })}
          </>
        )}

        {/* <button
          className="f6 link  br-pill ba ph3 pv2 mb2 dib purple"
          href="#0"
        >
          Cancel ride
        </button> */}
      </div>
      <p className="lh-copy measure center f6 black-70">2 passengers</p>
      <p className="lh-copy measure center f6 black-70">09:00am 02/07/2022</p>
    </article>
  );
}

export default RideCard;
