import React from 'react';
import {connect} from 'react-redux';

import {setSiteFiltersAC, removeSiteFiltersAC} from '../../../../../redux/data-reducer.js';

const FilterItem = ({id, text, idPure, setSiteFiltersAC, removeSiteFiltersAC, siteFilters}) => {
	let keys = Object.keys(siteFilters);

	const addFilter = ({target: {checked}}) => {
		if(checked){
			setSiteFiltersAC(idPure, text, id);
		}
		else{
			removeSiteFiltersAC(id);
		}
	}

	return(
		<div className="sort__item--wrapper w100 m1">
			<input id={id} type="checkbox" className="checkbox" onChange={addFilter} checked={keys.includes(id)} />

			<label htmlFor={id} className="checkbox__label">{text}</label>
		</div>
	)
}

const mapStateToProps = (state) => {
	return{
		siteFilters: state.data.siteFilters
	}
}

export default connect(mapStateToProps, {setSiteFiltersAC, removeSiteFiltersAC})(FilterItem);