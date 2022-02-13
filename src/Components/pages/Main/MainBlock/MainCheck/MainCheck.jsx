import React from 'react';

import './MainCheck.css';

const MainCheck = ({text}) => {
	return(
		<div className="main__check flex w100">
			<div className="check__icon--inner">
				<img src="/assets/img/check.svg" alt="Галочка" className="check__icon" />
			</div>

			{text}
		</div>
	)
}

export default MainCheck;