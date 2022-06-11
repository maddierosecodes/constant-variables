import { Link } from 'react-router-dom';

export default function DriverReview() {
  return (
    <article>
      <h2>How other people reviewed this user</h2>
      <h3 id='list-title'>Overall scores</h3>
      <ul
        aria-labelledby='list-title'
        className='list pl0 ml0 center mw5 ba b--purple br3 ma2'
      >
        <li className='ph3 pv2 bb b--purple'>Communication: 5</li>
        <li className='ph3 pv2 bb b--purple'>Safety: 5</li>
        <li className='ph3 pv2 bb b--purple'>Friendliness: 5</li>
        <li className='ph3 pv2 bb b--purple'>Driving skill: 5</li>
      </ul>
      <Link
        className='f4 fw6 db purple no-underline underline-hover'
        to='/user/:id/reviews'
      >
        View reviews from users
      </Link>
    </article>
  );
}
