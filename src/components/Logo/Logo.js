import React from 'react';
import Tilt from 'react-tilt';
import brain from './brain.png';

const Logo = () => {
	return(
		<div className="logo">
			<Tilt className="Tilt logo__box" options={{ max : 40 }} >
			 <div className="Tilt-inner"><img src={brain} alt="Brain"/></div>
			</Tilt>
		</div>
	);
}

export default Logo;