import React from 'react';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';

import {setSearch} from '../../../redux/data-reducer.js';

const Search = ({mobile = false, setSearch}) => {
	const [searchText, setSearchText] = React.useState('');

	const changeSearch = ({target: {value}}) => {
		setSearchText(value);
	}

	const goSearch = () => {
		setSearch(searchText);
		setSearchText('');
	}

	return(
		<div className={`search__inner${mobile ? ' search__mobile' : ''}`}>
		    <input placeholder="Поиск.." className="input search__input w100" value={searchText} onChange={changeSearch} />

		    <NavLink to="/search" className="search__button close" onClick={goSearch}>
		        <img src="/assets/img/search.svg" alt="Поиск" className="search__icon" />
		    </NavLink>
		</div>
	)
}

const mapStateToProps = (state) => {
	return{
		
	}
}

export default connect(mapStateToProps, {setSearch})(Search);