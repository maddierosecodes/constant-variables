import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/home', { replace: false });
  };

  return (
    <section>
      <Link className='f4 fw6 db purple no-underline underline-hover' to='/'>
        Back to homepage
      </Link>
      <form class='measure center login-form'>
        <label class='db fw6 lh-copy f6' for='email-address'>
          Email
        </label>
        <input
          class='pa2 input-reset ba bg-transparent w-100'
          type='email'
          name='email-address'
          id='email-address'
        />

        <label class='db fw6 lh-copy f6' for='password'>
          Password
        </label>
        <input
          class='b pa2 input-reset ba bg-transparent w-100'
          type='password'
          name='password'
          id='password'
        />

        <button
          onClick={handleSubmit}
          className='f6 link  ph3 pv2 mb2 dib white bg-black'
        >
          Log in
        </button>
      </form>
    </section>
  );
}
