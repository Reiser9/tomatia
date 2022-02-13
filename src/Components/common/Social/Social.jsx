import React from 'react';

import './Social.css';

const Social = ({mobile = false}) => {
	return(
		<div className={`social__inner flex${mobile ? ' social__mobile' : ''}`}>
		    <a href="https://vk.com/tomatia_semena" target="_Blanc" className="social__link">
		        <img src="/assets/img/vk.svg" alt="Вк" className="social__icon" />
		    </a>

		    <a href="https://www.instagram.com/tomatia_semena" target="_Blanc" className="social__link">
		        <img src="/assets/img/insta.svg" alt="Инста" className="social__icon" />
		    </a>

		    <a href="https://www.instagram.com/tomatia2020" target="_Blanc" className="social__link">
		        <img src="/assets/img/insta.svg" alt="Инста" className="social__icon" />
		    </a>
		</div>
	)
}

export default Social;