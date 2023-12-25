import React from "react";
import { Link } from "react-router-dom";

function LandingPage() {
	return (
		<div className='landing-page'>
			<div className='row'>
				<h4 className='fs-1 text text-center text-white'>DealerFlow</h4>
				<hr className='text-white' />
				<Link
					className='landing-page-link'
					to='/login'>
					<h1>Get Started</h1>
				</Link>
			</div>
		</div>
	);
}

export default LandingPage;
