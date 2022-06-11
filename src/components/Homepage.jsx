import { useContext } from 'react';
import { UserContext } from '../contexts/User';

export default function Homepage() {
  const { user } = useContext(UserContext);
  return (
    <>
      <h1>Project name</h1>
      <p>Hello, {user.username}</p>
    </>
  );
}
