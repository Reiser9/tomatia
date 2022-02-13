import React from 'react';

const FilterAdmin = ({name, values}) => {
	return(
		<div className="w100 m1">
			<p className="w100">
				{name}
			</p>

			<select className="w100 input m1">
				<option>Выбрать</option>
				{values.map(d => <option>{d.name}</option>)}
			</select>
		</div>
	)
}

export default FilterAdmin;