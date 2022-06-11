import React, { useContext, useState, useEffect } from "react";
import { isValid as isValidPostcode } from "postcode";
import { UserContext } from "../contexts/User";
import { postAdvert } from "../firebase/functions/write";

function PostRide() {
  //   const exampleListing = {
  //     body: "Ooh la la, how fancy",
  //     createdBy: "Joe Mama",
  //     creatorId: "DlvzNfVsaZXHeRV8dujxHWg3ehD3",
  //     date: "2022-06-11T23:29",
  //     destination: "PR9 7LL",
  //     email: "emilybennett93@hotmail.com",
  //     passengers: 2,
  //     postcodeStart: "PR8 4AN",
  //     status: {
  //       accepted: true,
  //       acceptedBy: {
  //         uid: "C9S2NwGZObPvJ1hmcYdQj2maPy32",
  //         username: "usera",
  //       },
  //     },
  //   };
  const initialForm = {
    createdBy: "",
    creatorId: "",
    status: {
      accepted: false,
      acceptedBy: {
        uid: "",
        username: "",
      },
    },

    body: "",
    passengers: 0,
    destination: "",
    date: "",
    email: "",
    postcodeStart: "",
  };
  const initialValidStates = {
    passengers: "pending",
    destination: "pending",
    date: "pending",
    email: "pending",
    postcodeStart: "pending",
  };

  const [advert, setAdvert] = useState(initialForm);
  const [validStates, setValidStates] = useState(initialValidStates);

  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      setAdvert((currentAdvert) => {
        const copy = { ...currentAdvert };
        copy.email = user.email;
        copy.postcodeStart = user.postcode;
        copy.createdBy = user.username;
        copy.creatorId = user.uid;
        return copy;
      });
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const copyAdvert = {
      ...advert,
      date: new Date(advert.date),
      createdAt: new Date(Date.now()),
    };
    postAdvert(user.isDriver, copyAdvert);
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

        if (key === "date") {
          if (new Date(advert.date) > Date.now()) {
            copyStates.date = "true";
          } else {
            copyStates.date = "false";
          }
        }

        if (key === "destination") {
          if (isValidPostcode(advert.destination)) {
            copyStates.destination = "true";
          } else {
            copyStates.destination = "false";
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

        if (key === "postcodeStart") {
          if (
            isValidPostcode(advert.postcodeStart) ||
            advert.postcodeStart.trim() === user.postcodeStart
          ) {
            copyStates.postcodeStart = "true";
          } else {
            copyStates.postcodeStart = "false";
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
          <p>Please enter a valid postcodeStart</p>
        ) : null}
        <input
          value={advert.destination}
          onChange={handleChange("destination")}
          onBlur={validateInput("destination")}
          type="text"
          placeholder="What is the full postcodeStart?"
          id="destination"
          required={true}
        ></input>

        <label htmlFor="date">Date and Time</label>
        {validStates.date === "false" ? (
          <p>Pick up time is in the past, please choose a time after now</p>
        ) : null}
        <input
          type="datetime-local"
          id="date"
          value={advert.date}
          onChange={handleChange("date")}
          onBlur={validateInput("date")}
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

        <label htmlFor="postcodeStart">postcodeStart</label>
        {validStates.postcodeStart === "false" ? (
          <p>Please enter a valid postcodeStart</p>
        ) : null}
        <input
          type="text"
          id="postcodeStart"
          value={advert.postcodeStart}
          onChange={handleChange("postcodeStart")}
          onBlur={validateInput("postcodeStart")}
          required={true}
        ></input>

        <label htmlFor="body">Description</label>
        <textarea
          type="textarea"
          rows={4}
          cols={20}
          id="body"
          value={advert.body}
          onChange={handleChange("body")}
          onBlur={validateInput("body")}
          required={true}
        ></textarea>

        <button type="submit" onClick={handleSubmit}>
          Post
        </button>
      </form>
    </div>
  );
}

export default PostRide;
