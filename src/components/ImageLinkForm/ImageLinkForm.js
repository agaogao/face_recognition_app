import React from 'react';

const ImageLinkForm = ({ onInputChange, onSubmit }) => {
	return(
		<div className="imageInput">
			<p className="imageInput__text">{'This magic brain will detect faces in your pictures!'}</p>
			<div className="imageInput__box">
				<input type="text" className="imageInput__input" placeholder="please enter the url of an image" onChange={onInputChange}/>
				<button className="imageInput__submit" onClick={onSubmit}>Detect</button>
			</div>
		</div>
	);
}

export default ImageLinkForm;