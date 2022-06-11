import React, { useState } from "react";

function PostRide() {
  const initialForm = {
    passengers: 0,
    destination: "",
    date: "",
    time: "",
    email: "",
    postcode: "",
  };

  const { advert, setAdvert } = useState(initialForm);
  const handleSubmit = (e) => {
    e.preventDefault();
    //function to post the form
  };
  return (
    <div>
      <h2>Post</h2>
      <form>
        <label htmlFor="passengers">Passengers</label>
        <input
          type="number"
          placeholder="How many people?"
          id="passengers"
        ></input>

        <label htmlFor="destination">Destination</label>
        <input
          type="number"
          placeholder="Where are you going?"
          id="destination"
        ></input>

        <label htmlFor="date">Date</label>
        <input type="date" id="date"></input>

        <label htmlFor="time">Time</label>
        <input type="time" id="date"></input>

        <label htmlFor="email">Email</label>
        <input type="email" id="email"></input>

        <label htmlFor="postcode">Postcode</label>
        <input type="text" id="postcode"></input>

        <button type="submit" onClick={handleSubmit}>
          Post
        </button>
      </form>
    </div>
  );
}

export default PostRide;
