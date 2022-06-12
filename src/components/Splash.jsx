import { UserContext } from "../contexts/User";
import { Link } from "react-router-dom";
import { useContext } from "react";

export default function Splash() {
  const { user } = useContext(UserContext);
  return (
    <>
      <section>
        <h2>Welcome to Spare Seats!</h2>
        <p class="info">
          We aim to connect refugees, asylum seekers and other displaced people
          wirh volunteer drivers to help make transportation easy. Got an
          important appointment? Need to pick up work or residency documents?
          Explore our rides and find a friendly driver to help transport you,
          free of charge. You may even make a friend along the way!
        </p>
      </section>
      <nav
        className="navBar"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <Link
          className="f4 fw6 db purple no-underline underline-hover"
          to="/login"
        >
          {user.isLoggedIn ? "" : "Log in here"}
        </Link>
        <Link
          className="f4 fw6 db purple no-underline underline-hover"
          to="/sign-up"
        >
          {user.isLoggedIn ? "" : "Sign up here"}
        </Link>
      </nav>
    </>
  );
}
