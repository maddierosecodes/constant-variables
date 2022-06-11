import React, { useContext, useState, useEffect } from "react";
import { isValid as isValidPostcode, toOutcode } from "postcode";
import { UserContext } from "../contexts/User";

function PostRide() {
  const initialForm = {
    passengers: 0,
    destination: "",
    dateTime: "",
    email: "",
    postcode: "",
  };
  const initialValidStates = {
    passengers: "pending",
    destination: "pending",
    dateTime: "pending",
    email: "pending",
    postcode: "pending",
  };

  const [advert, setAdvert] = useState(initialForm);
  const [validStates, setValidStates] = useState(initialValidStates);

  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      setAdvert((currentAdvert) => {
        const copy = { ...currentAdvert };
        copy.email = user.email;
        return copy;
      });
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const copyAdvert = { ...advert, postcode: toOutcode(advert.postcode) };
    //function to post the form
    console.log(copyAdvert);
  };

  const handleChange = (key) => {
    const changeAdvertState = (e) => {
      setAdvert((currentAdvert) => {
        const copy = { ...currentAdvert };
        const newValue =
          key === "passengers" ? Number(e.target.value) : e.target.value;
        copy[key] = newValue;
        return copy;
      });
    };
    return changeAdvertState;
  };

  const validateInput = (key) => {
    const validateInputByKey = () => {
      console.log(key);
      setValidStates((currentValidStates) => {
        const copyStates = { ...currentValidStates };

        if (key === "passengers") {
          if (advert.passengers > 0 && advert.passengers < 7) {
            copyStates.passengers = "true";
          } else {
            copyStates.passengers = "false";
          }
        }

        if (key === "dateTime") {
          if (new Date(advert.dateTime) > Date.now()) {
            copyStates.dateTime = "true";
          } else {
            copyStates.dateTime = "false";
          }
        }

        if (key === "destination" || key === "postcode") {
          if (isValidPostcode(advert.destination)) {
            copyStates[key] = "true";
          } else {
            copyStates[key] = "false";
          }
        }

        if (key === "email") {
          const emailRegex =
            /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
          if (emailRegex.test(advert.email)) {
            copyStates.email = "true";
          } else {
            copyStates.email = "false";
          }
        }
        return copyStates;
      });
    };
    return validateInputByKey;
  };

  return (
    <div>
      <h2>Post</h2>
      <form>
        <label htmlFor="passengers">Passengers</label>
        {validStates.passengers === "false" ? (
          <p>Please enter a number between 0 and 7</p>
        ) : null}
        <input
          value={advert.passengers.toString()}
          onChange={handleChange("passengers")}
          onBlur={validateInput("passengers")}
          type="number"
          placeholder="How many people?"
          id="passengers"
          required={true}
        ></input>

        <label htmlFor="destination">Destination</label>
        {validStates.destination === "false" ? (
          <p>Please enter a valid postcode</p>
        ) : null}
        <input
          value={advert.destination}
          onChange={handleChange("destination")}
          onBlur={validateInput("destination")}
          type="text"
          placeholder="What is the full postcode?"
          id="destination"
          required={true}
        ></input>

        <label htmlFor="dateTime">Date and Time</label>
        {validStates.dateTime === "false" ? (
          <p>Pick up time is in the past, please choose a time after now</p>
        ) : null}
        <input
          type="dateTime-local"
          id="date"
          value={advert.dateTime}
          onChange={handleChange("dateTime")}
          onBlur={validateInput("dateTime")}
          required={true}
        ></input>

        <label htmlFor="email">Email</label>
        {validStates.email === "false" ? (
          <p>Please enter a valid email</p>
        ) : null}
        <input
          type="email"
          id="email"
          value={advert.email}
          onChange={handleChange("email")}
          required={true}
          onBlur={validateInput("email")}
        ></input>

        <label htmlFor="postcode">Postcode</label>
        {validStates.postcode === "false" ? (
          <p>Please enter a valid Postcode</p>
        ) : null}
        <input
          type="text"
          id="postcode"
          value={advert.postcode}
          onChange={handleChange("postcode")}
          onBlur={validateInput("postcode")}
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
