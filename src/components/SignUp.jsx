import { useState, useContext, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/User';
import { isValid as isValidPostcode } from 'postcode';
import languages from '../assets/data/languages';

export default function SignUp() {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const errRef = useRef(null);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [postcode, setPostcode] = useState('');
  const [postcodeErr, setPostcodeErr] = useState('');
  const [userLanguages, setUserLanguages] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!postcodeErr) {
      setUser((prevUser) => {
        const copyUser = { ...prevUser };
        copyUser.username = username;
        copyUser.role = role;
        copyUser.postcode = postcode;
        copyUser.isLoggedIn = true;
        copyUser.email = email;
        return copyUser;
      });
      navigate('/additional-questions', { replace: false });
    }
  };

  const handlePostcode = (e) => {
    if (isValidPostcode(e.target.value)) {
      errRef.current.className = '';
      setPostcodeErr('');
      setPostcode(e.target.value);
    } else {
      errRef.current.className = 'postcode-err';
      setPostcodeErr('Not a valid postcode. Please enter a valid postcode.');
    }
  };

  const handleLanguages = (e) => {
    setUserLanguages((prevLangs) => {
      return [...prevLangs, e.target.value];
    });
  };

  return (
    <section>
      <Link className='f4 fw6 db purple no-underline underline-hover' to='/'>
        Back to homepage
      </Link>
      <form
        onSubmit={handleSubmit}
        action='post'
        className='measure center login-form'
      >
        <label className='db fw6 lh-copy f6' htmlFor='username'>
          Username
        </label>
        <input
          required
          className='pa2 input-reset ba bg-transparent   w-100'
          type='text'
          name='username'
          id='username'
          onBlur={(e) => setUsername(e.target.value)}
        />
        <label className='db fw6 lh-copy f6' for='email-address'>
          Email
        </label>
        <input
          required
          className='pa2 input-reset ba bg-transparent   w-100'
          type='email'
          name='email-address'
          id='email-address'
          onBlur={(e) => setEmail(e.target.value)}
        />

        <label className='db fw6 lh-copy f6' for='password'>
          Password
        </label>
        <input
          required
          className='b pa2 input-reset ba bg-transparent   w-100'
          type='password'
          name='password'
          id='password'
          onBlur={(e) => setPassword(e.target.value)}
        />

        <label className='db fw6 lh-copy f6' for='postcode'>
          Postcode
        </label>
        <input
          required
          className='pa2 input-reset ba bg-transparent   w-100'
          type='text'
          name='postcode'
          id='postcode'
          onBlur={handlePostcode}
        />
        <p ref={errRef}>{postcodeErr}</p>

        <label className='db fw6 lh-copy f6' htmlFor='languages'>
          Languages spoken
        </label>
        <select
          name='languages'
          id='languages'
          required
          onChange={handleLanguages}
          className='b pa2 input-reset ba bg-transparent   w-100'
          defaultValue={'English'}
        >
          {languages.map((language) => {
            return <option value={language}>{language}</option>;
          })}
        </select>
        <p>
          Selected languages:
          {userLanguages.map((language) => {
            return `${language}, `;
          })}
        </p>
        <label className='db fw6 lh-copy f6' for='role'>
          Driver or pasenger?
        </label>
        <select
          required
          onBlur={(e) => setRole(e.target.value)}
          className='b pa2 input-reset ba bg-transparent   w-100'
          name='role'
          id='role'
          defaultValue={'default'}
        >
          <option value={'default'} disabled>
            Please choose a role
          </option>
          <option value='driver'>driver</option>
          <option value='passenger'>passenger</option>
        </select>

        <button
          type='submit'
          className='f6 link  ph3 pv2 mb2 dib white bg-black'
        >
          Continue
        </button>
      </form>
    </section>
  );
}
