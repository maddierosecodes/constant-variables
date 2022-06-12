import React, { useContext, useState, useEffect } from "react";
import { isValid as isValidPostcode, fix } from "postcode";
import { UserContext } from "../contexts/User";
import { postAdvert } from "../firebase/functions/write";
import { useNavigate } from "react-router-dom";

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
    statusAccepted: false,
    acceptedByID: "",
    acceptedByUsername: "",

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
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setAdvert((currentAdvert) => {
        const copy = { ...currentAdvert };
        copy.email = user.email;
        copy.postcodeStart = fix(user.postcode);
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
      destination: fix(advert.destination),

      date: new Date(advert.date),
      createdAt: new Date(Date.now()),
    };
    postAdvert(user.isDriver, copyAdvert).then(() => {
      navigate("/home", { replace: true });
    });
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
      <form className="post-form">
        <label className="label-text" htmlFor="passengers">
          Passengers
        </label>
        <input
          className="input-area"
          value={advert.passengers.toString()}
          onChange={handleChange("passengers")}
          onBlur={validateInput("passengers")}
          type="number"
          placeholder="How many people?"
          id="passengers"
          required={true}
        ></input>
        {validStates.passengers === "false" ? (
          <p className="err-text"> ▲ Please enter a number between 0 and 7</p>
        ) : null}

        <label className="label-text" htmlFor="destination">
          Destination
        </label>
        <input
          className="input-area"
          value={advert.destination}
          onChange={handleChange("destination")}
          onBlur={validateInput("destination")}
          type="text"
          placeholder="What is the full postcode"
          id="destination"
          required={true}
        ></input>
        {validStates.destination === "false" ? (
          <p className="err-text">▲ Please enter a valid postcode</p>
        ) : null}

        <label className="label-text" htmlFor="date">
          Date and Time
        </label>
        <input
          className="input-area"
          type="datetime-local"
          id="date"
          value={advert.date}
          onChange={handleChange("date")}
          onBlur={validateInput("date")}
          required={true}
        ></input>
        {validStates.date === "false" ? (
          <p className="err-text">
            ▲ Pick up time is in the past, please choose a time after now
          </p>
        ) : null}

        <label className="label-text" htmlFor="email">
          Email
        </label>
        <input
          className="input-area"
          type="email"
          id="email"
          value={advert.email}
          onChange={handleChange("email")}
          required={true}
          onBlur={validateInput("email")}
        ></input>
        {validStates.email === "false" ? (
          <p className="err-text"> ▲ Please enter a valid email</p>
        ) : null}

        <label className="label-text" htmlFor="postcodeStart">
          Starting Point Postcode
        </label>
        <input
          className="input-area"
          type="text"
          id="postcodeStart"
          value={advert.postcodeStart}
          onChange={handleChange("postcodeStart")}
          onBlur={validateInput("postcodeStart")}
          required={true}
        ></input>
        {validStates.postcodeStart === "false" ? (
          <p className="err-text"> ▲ Please enter a valid postcode</p>
        ) : null}

        <label className="label-text" htmlFor="body">
          Description
        </label>
        <textarea
          className="input-area"
          type="textarea"
          maxLength={50}
          rows={3}
          cols={20}
          id="body"
          value={advert.body}
          onChange={handleChange("body")}
          onBlur={validateInput("body")}
          placeholder={
            "Write a short message about your journey. 50 Characters Maximum"
          }
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
