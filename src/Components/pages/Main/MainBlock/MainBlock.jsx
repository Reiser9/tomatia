import React from 'react';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';

import './MainBlock.css';

import MainCheck from './MainCheck/MainCheck.jsx';

const MainBlock = ({mainTitle, mainChecks}) => {
	const mainChecksArr = Object.keys(mainChecks).map(key => {
		return mainChecks[key]
	});

	return(
		<div className="wrapper">
			<div className="container">
				<div className="main__inner flexbet w100">
					<div className="main__text--inner flexstart w100">
						<h1 className="main__title title w100">
							{mainTitle}
						</h1>

						{mainChecksArr.length > 1
						&& <div className="main__check--inner w100 m2">
							{mainChecksArr.map((d, id) => <MainCheck text={d.text} key={id} />)}
						</div>}

						<NavLink to="/catalog" className="button main__button m3">
							В каталог
						</NavLink>
					</div>

					<div className="main__img--inner w100">
						<img src="/assets/img/tomato.png" alt="Томат" className="main__img img" />
					</div>
				</div>
			</div>
		</div>
	)
}

const mapStateToProps = (state) => {
	return{
		mainTitle: state.data.mainTitle,
		mainChecks: state.data.mainChecks
	}
}

export default connect(mapStateToProps, {})(MainBlock);