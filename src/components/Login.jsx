import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authenticateUser } from '../firebase/functions/auth';
import { getProfile } from '../firebase/functions/read';

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    authenticateUser(email, password)
      .then((userObject) => {
        console.log(userObject);
        // fetch this user from db
        return getProfile(userObject.uid);
      })
      .then((user) => {
        // set user state
        navigate('/home', { replace: true });
      })
      .catch((err) => {
        console.log(err);
        // display err to user
      });
  };

  return (
    <section>
      <Link className="f4 fw6 db purple no-underline underline-hover" to="/">
        Back to homepage
      </Link>
      <form class="measure center login-form">
        <label class="db fw6 lh-copy f6" for="email-address">
          Email
        </label>
        <input
          class="pa2 input-reset ba bg-transparent hover-bg-black hover-yellow w-100"
          type="email"
          name="email-address"
          id="email-address"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />

        <label class="db fw6 lh-copy f6" for="password">
          Password
        </label>
        <input
          class="b pa2 input-reset ba bg-transparent hover-bg-black hover-yellow w-100"
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />

        <button
          onClick={handleSubmit}
          className="f6 link  ph3 pv2 mb2 dib white bg-black">
          Log in
        </button>
      </form>
    </section>
  );
}
