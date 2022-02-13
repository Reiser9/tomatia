import React from 'react';

import FilterItem from './FilterItem/FilterItem.jsx'

const FilterWrapper = ({title, values}) => {
	return(
		<div className="sort__item flexstart w100 m2">
			<p className="sort__item--title bold">
				{title}:
			</p>

			{values.map((d, id) => <FilterItem key={id} id={d.id + id} idPure={d.id} text={d.name} />)}
		</div>
	)
}

export default FilterWrapper;