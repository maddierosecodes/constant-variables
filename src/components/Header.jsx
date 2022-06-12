import { useContext } from 'react';
import { Link } from 'react-router-dom';
import topLogo from '../assets/images/SpareSeatsHorizontal.png';
import { UserContext } from '../contexts/User';

export default function Header() {
  const { user } = useContext(UserContext);

  return (
    <header id='header'>
      <img src={topLogo} alt='spare seats logo' className='headerLogo'></img>
      <nav className='navBar'>
        <Link to={user.isLogged ? '/home' : '/'} className='navLink'>
          <h2>Home</h2>
        </Link>
        <Link to='/rides' className='navLink'>
          <h2>Rides</h2>
        </Link>
        <Link to='/post' className='navLink'>
          <h2>Post</h2>
        </Link>
      </nav>
    </header>
  );
}
