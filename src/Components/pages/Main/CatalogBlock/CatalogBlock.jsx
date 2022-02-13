import React from 'react';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';

import './CatalogBlock.css';

import Tovar from '../../../common/Tovar/Tovar.jsx';

const CatalogBlock = ({tovarsIsLoad, tovars}) => {
	const tovarsArr = Object.keys(tovars).map(key => {
		return tovars[key];
	});

	if(tovarsIsLoad){
		return <div className="block__load">Загрузка..</div>
	}

	return(
		<div className="wrapper catalog">
			<div className="container">
				<div className="catalog__inner flexcenter w100">
					<h2 className="catalog__title title w100">
						Каталог
					</h2>

					<p className="subtext w100">
						Тут вы найдете себе все, что вам по душе, множество видов томатов
					</p>

					{tovarsArr.length > 0
					&& <div className="catalog__content w100">
						{tovarsArr.slice(-4).reverse().map((d, id) => <Tovar desc={d.desc} fas={d.fas} pack={d.pack} key={id} name={d.name} id={d.id} price={d.price} image={d.image} hit={d.hit} />)}
					</div>}

					<NavLink to="/catalog" className="button m3">
						Весь каталог
					</NavLink>
				</div>
			</div>
		</div>
	)
}

const mapStateToProps = (state) => {
	return{
		tovarsIsLoad: state.data.tovarsIsLoad,
		tovars: state.data.tovars
	}
}

export default connect(mapStateToProps, {})(CatalogBlock);