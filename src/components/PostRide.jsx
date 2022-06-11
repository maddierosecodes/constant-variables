import React, { useEffect, useState } from "react";

function PostRide() {
  const initialForm = {
    passengers: 0,
    destination: "",
    dateTime: "",
    email: "",
    postcode: "",
  };

  const [advert, setAdvert] = useState(initialForm);

  const handleSubmit = (e) => {
    e.preventDefault();
    //function to post the form
  };

  const handleChange = (key) => {
    const changeAdvertState = (e) => {
      setAdvert((currentAdvert) => {
        const copy = { ...currentAdvert };
        copy[key] = e.target.value;
        return copy;
      });
    };
    return changeAdvertState;
  };
  return (
    <div>
      <h2>Post</h2>
      <form>
        <label htmlFor="passengers">Passengers</label>
        <input
          value={advert.passengers}
          onChange={handleChange("passengers")}
          type="number"
          placeholder="How many people?"
          id="passengers"
          required={true}
        ></input>

        <label htmlFor="destination">Destination</label>
        <input
          value={advert.destination}
          onChange={handleChange("destination")}
          type="text"
          placeholder="What is the full postcode?"
          id="destination"
          required={true}
        ></input>

        <label htmlFor="dateTime">Date and Time</label>
        <input
          type="dateTime-local"
          id="date"
          value={advert.dateTime}
          onChange={handleChange("dateTime")}
          required={true}
        ></input>

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={advert.email}
          onChange={handleChange("email")}
          required={true}
        ></input>

        <label htmlFor="postcode">Postcode</label>
        <input
          type="text"
          id="postcode"
          value={advert.postcode}
          onChange={handleChange("postcode")}
          required={true}
        ></input>

        <button type="submit" onClick={handleSubmit}>
          Post
        </button>
      </form>
    </div>
  );
}

export default PostRide;
