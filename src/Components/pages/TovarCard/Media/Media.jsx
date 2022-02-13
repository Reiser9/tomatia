import React from 'react';

const Media = ({src, video = false}) => {
	return(
		<div className="tovar__img--inner">
			{!video
			? <img src={src} alt="Картинка" className="img" />
			: <iframe className="video" src={src} frameBorder='0' allow='autoplay; encrypted-media' allowFullScreen />}
		</div>
	)
}

export default Media;