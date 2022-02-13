import React from 'react';
import {NavLink} from 'react-router-dom';

import './Footer.css';

import Logo from '../common/Logo/Logo.jsx';
import Social from '../common/Social/Social.jsx';

const Footer = () => {
	return(
		<footer className="footer">
			<div className="container">
				<div className="footer__inner flexstart w100">
					<div className="footer__content flexbet w100">
						<Logo />

						<div className="footer__item flexstart">
							<p className="footer__item--title">
								Полезные ссылки:
							</p>

							<NavLink to="/catalog" className="footer__link">
								Каталог
							</NavLink>
						</div>

						<div className="footer__item flexstart">
							<p className="footer__item--title">
								Блог:
							</p>

							<NavLink to="/blog" className="footer__link">
								Полезные статьи
							</NavLink>
						</div>

						<div className="footer__item flexstart">
							<p className="footer__item--title">
								Соц сети:
							</p>

							<Social mobile />
						</div>
					</div>

					<p className="footer__copy">
						&copy; Томатия 2021 all rights reserved
					</p>
				</div>
			</div>
		</footer>
	)
}

export default Footer;