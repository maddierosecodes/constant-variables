import { useState, useContext, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/User';

export default function SignUp() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    navigate('/home', { replace: false });
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
        <label className='db fw6 lh-copy f6' htmlFor='gender'>
          Gender
        </label>
        <input
          required
          className='pa2 input-reset ba bg-transparent   w-100'
          type='text'
          name='gender'
          id='gender'
        />

        <label className='db fw6 lh-copy f6' for='age-group'>
          Please select an age group
        </label>
        <select
          required
          className='b pa2 input-reset ba bg-transparent   w-100'
          name='role'
          id='role'
          defaultValue={'default'}
        >
          <option value={'default'} disabled>
            Please select an age group
          </option>
          <option value='18-29'>18-29</option>
          <option value='30-39'>30-39</option>
          <option value='40-49'>40-49</option>
          <option value='50-59'>50-59</option>
        </select>

        {user.role === 'driver' ? (
          <>
            <label className='db fw6 lh-copy f6' htmlFor='reg'>
              Car registration
            </label>
            <input
              required
              className='pa2 input-reset ba bg-transparent   w-100'
              type='text'
              name='reg'
              id='reg'
            />
            <div className='wrapper'>
              <label className='db fw6 lh-copy f6' htmlFor='licence'>
                Do you have a valid driver's licence? (We will ask for proof of
                this before you offer a ride)
              </label>
              <input type='checkbox' name='licence' id='licence' />
            </div>
            <div className='wrapper'>
              <label className='db fw6 lh-copy f6' htmlFor='dbs'>
                Do you have a valid DBS check? (We will ask for proof of this
                before you offer a ride)
              </label>
              <input type='checkbox' name='dbs' id='dbs' />
            </div>
          </>
        ) : (
          ''
        )}

        <button
          type='submit'
          className='f6 link  ph3 pv2 mb2 dib white bg-black'
        >
          Sign up
        </button>
      </form>
    </section>
  );
}
