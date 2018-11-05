import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ imageUrl, box }) => {
	return(
		<div className="detectImage__section">
			<img id="inputImage" src={ imageUrl } alt="" className="detectImage__image"/>
			<div className="bounding-box" style={{ top: box.topRow, left: box.leftCol, right: box.rightCol, bottom: box.bottomRow}}></div>
		</div>
	);
}

export default FaceRecognition;