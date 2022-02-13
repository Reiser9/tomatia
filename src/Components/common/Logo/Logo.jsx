import React from 'react';
import {NavLink} from 'react-router-dom';

import './Logo.css';

const Logo = () => {
	return(
		<NavLink to="/" className="logo__inner">
		    <img src="/assets/img/logo.png" alt="Логотип" className="logo" />
		</NavLink>
	)
}

export default Logo;