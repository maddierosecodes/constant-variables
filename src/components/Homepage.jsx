import { useContext } from 'react';
import { UserContext } from '../contexts/User';

export default function Homepage() {
  const { user } = useContext(UserContext);
  return (
    <section>
      <header>
        <h2>Hello, {user.username}</h2>
      </header>
      <p>Your role is {user.role}</p>
      <p>You are currently offering rides from {user.postcode}</p>
    </section>
  );
}
