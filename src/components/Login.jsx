import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/User";
import { authenticateUser } from "../firebase/functions/auth";
import { getProfile } from "../firebase/functions/read";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useContext(UserContext);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    authenticateUser(email, password)
      .then(({ email, uid }) => {
        console.log({ uid });
        // C9S2NwGZObPvJ1hmcYdQj2maPy32 -- passenger
        // DlvzNfVsaZXHeRV8dujxHWg3ehD3 -- driver
        return getProfile("DlvzNfVsaZXHeRV8dujxHWg3ehD3");
      })
      .then((user) => {
        setUser(user);
        localStorage.setItem("userData", JSON.stringify(user));
        navigate("/home", { replace: true });
      });
  };

  return (
    <section>
      <Link className="f4 fw6 db purple no-underline underline-hover" to="/">
        Back to homepage
      </Link>
      <form className="measure center login-form">
        <label className="db fw6 lh-copy f6" htmlFor="email-address">
          Email
        </label>
        <input
          className="pa2 input-reset ba bg-transparent hover-bg-black hover-yellow w-100"
          type="email"
          name="email-address"
          id="email-address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="db fw6 lh-copy f6" htmlFor="password">
          Password
        </label>
        <input
          className="b pa2 input-reset ba bg-transparent hover-bg-black hover-yellow w-100"
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleSubmit}
          className="f6 link  ph3 pv2 mb2 dib white bg-black"
        >
          Log in
        </button>
      </form>
    </section>
  );
}
