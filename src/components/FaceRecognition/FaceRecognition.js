import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ imageUrl, box }) => {
	return(
		<div className="detectImage__section">
			<img id="inputImage" src={ imageUrl } alt="" className="detectImage__image"/>
			<div id="imageSection"></div>
		</div>
	);
}

export default FaceRecognition;