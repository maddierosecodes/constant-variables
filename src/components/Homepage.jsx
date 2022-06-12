import { useContext } from "react";
import { UserContext } from "../contexts/User";
import { Link } from "react-router-dom";
import profilePlaceholder from "../assets/images/profile-placeholder.png";

export default function Homepage() {
	const { user } = useContext(UserContext);
	return (
		<>
			<section id='profile-section'>
				<nav>
					<Link
						className='f4 fw6 db purple no-underline underline-hover'
						to='/'
					>
						Back to homepage
					</Link>
				</nav>
				<header>
					<h2>Hello, {user.username}</h2>
				</header>
				<img id='profile-img' src={profilePlaceholder} alt='user profile' />
				<p>Your role is {user.role}</p>
				<p>You are currently offering rides from {user.postcode}</p>
				<p>You may post a ride or search for rides already posted.</p>
				<Link
					className='ride-link f4 fw6 db black link hover-purple underline-hover'
					to='/post'
				>
					Post a ride
				</Link>
				<Link
					className='ride-link f4 fw6 db black link hover-purple underline-hover'
					to='/rides'
				>
					View all rides
				</Link>
			</section>
			<section id='current-rides'>
				<h2>Current rides</h2>
				<article className='mw5 center bg-white br3 pa3 pa4-ns mv3 ba b--black-10'>
					<div className='tc'>
						<h2 className='f4'>Heaton Park</h2>
						<hr className='mw3 bb bw1 b--black-10' />
						<button
							className='f6 link  br-pill ba ph3 pv2 mb2 dib purple'
							href='#0'
						>
							Cancel ride
						</button>
					</div>
					<p className='lh-copy measure center f6 black-70'>2 passengers</p>
					<p className='lh-copy measure center f6 black-70'>
						09:00am 02/07/2022
					</p>
				</article>
				<article className='mw5 center bg-white br3 pa3 pa4-ns mv3 ba b--black-10'>
					<div className='tc'>
						<h2 className='f4'>Liverpool</h2>
						<hr className='mw3 bb bw1 b--black-10' />
						<button
							className='f6 link  br-pill ba ph3 pv2 mb2 dib purple'
							href='#0'
						>
							Cancel ride
						</button>
					</div>
					<p className='lh-copy measure center f6 black-70'>1 passenger</p>
					<p className='lh-copy measure center f6 black-70'>
						06:00pm 16/07/2022
					</p>
				</article>
			</section>
		</>
	);
}
