import React from "react";

function RideCard({ ride }) {
  return (
    <article className="mw5 center bg-white br3 pa3 pa4-ns mv3 ba b--black-10">
      <div className="tc">
        <h2 className="f4">{ride.body}</h2>
        <hr className="mw3 bb bw1 b--black-10" />

        {ride.interested ? (
          <>
            <p>People Interested</p>
            {ride.interested.map((person) => {
              return (
                <span>
                  <p>{person.username}</p>
                  <button type={"default"}>Accept</button>
                  <button type={"default"}>Reject</button>
                </span>
              );
            })}
          </>
        ) : null}

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
