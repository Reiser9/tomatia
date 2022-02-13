import React from 'react';
import {connect} from 'react-redux';

import './Sale.css';

const Sale = ({saleText}) => {
	return(
		<div className="sale">
			<div className="container">
				<div className="sale__inner flexbet w100">
					<div className="sale__img--inner w100">
						<img src="/assets/img/gift.svg" alt="Скидка" className="sale__img img" />
					</div>

					<p className="sale__text w100">
						{saleText}
					</p>
				</div>
			</div>
		</div>
	)
}

const mapStateToProps = (state) => {
	return{
		saleText: state.data.saleText
	}
}

export default connect(mapStateToProps, {})(Sale);