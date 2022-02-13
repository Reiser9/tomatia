import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import './Search.css';

import Tovar from '../../common/Tovar/Tovar.jsx';

const Search = ({search, tovars, tovarsIsLoad}) => {
	const tovarsArr = Object.keys(tovars).map(key => {
		return tovars[key];
	});

	const filterArr = tovarsArr.filter(d => d.keyword.toLowerCase().includes(search.toLowerCase()));

	if(tovarsIsLoad){
		return <div className="admin__load">Загрузка..</div>
	}

	return(
		<div className="wrapper">
			<div className="container">
				<div className="wrapper__inner w100">
					{search.length > 0
					? <h2 className="title w100">
						Результат поиска "{search}":
					</h2>
					: <Redirect to="/catalog" />}

					<div className="catalog__content w100 m3">
						{filterArr.length > 0
						? filterArr.map((d, id) => <Tovar desc={d.desc} fas={d.fas} pack={d.pack} name={d.name} price={d.price} image={d.image} id={d.id} hit={d.hit} key={id} />)
						: <>По вашему запросу ничего не найдено</>}
					</div>
				</div>
			</div>
		</div>
	)
}

const mapStateToProps = (state) => {
	return{
		search: state.data.search,
		tovars: state.data.tovars,
		tovarsIsLoad: state.data.tovarsIsLoad
	}
}

export default connect(mapStateToProps, {})(Search);