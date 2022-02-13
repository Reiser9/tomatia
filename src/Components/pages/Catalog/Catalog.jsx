import React from 'react';
import {connect} from 'react-redux';
import $ from 'jquery';

import './Catalog.css';

import Tovar from '../../common/Tovar/Tovar.jsx';
import FilterWrapper from './FilterWrapper/FilterWrapper.jsx';

const Catalog = ({tovarsIsLoad, tovars, filters, siteFilters}) => {
	const openFilters = () => {
		$(".sort__content").addClass("active");
	}

	const closeFilters = () => {
		$(".sort__content").removeClass("active");
	}

	let tovarsArr = Object.keys(tovars).map(key => {
		return tovars[key];
	});

	let filtersArr = Object.keys(filters).map(key => {
		return filters[key];
	});

	let newFilterItems = [];

	let siteFiltersArr = Object.keys(siteFilters).map(key => {
		return siteFilters[key];
	});

	function arrayUnique(array) {
	    var a = array.concat();
	    for(var i=0; i<a.length; ++i) {
	        for(var j=i+1; j<a.length; ++j) {
	            if(a[i] === a[j])
	                a.splice(j--, 1);
	        }
	    }

	    return a;
	}

	siteFiltersArr.forEach(function(item, i){
		var pushArr = tovarsArr.filter(function(fil){
			let oneFilter = Object.keys(item)[0];
			return fil.filter[oneFilter] === item[oneFilter];
		});
		newFilterItems = arrayUnique(newFilterItems.concat(pushArr));
	});

	if(tovarsIsLoad){
		return <div className="admin__load">Загрузка..</div>
	}

	return(
		<div className="wrapper wrapper__height">
			<div className="sort__content flexstart">
				<div className="sort__cross" onClick={closeFilters}>
					<img src="/assets/img/cross.svg" alt="Закрыть" className="img" />
				</div>

				<p className="sort__title bold">
					Фильтры:
				</p>

				{filtersArr.map((d, id) => <FilterWrapper key={id} title={d.name} values={d.values} />)}

				{/*<div className="sort__item flexstart w100 m2">
					<p className="sort__item--title bold">
						Цена:
					</p>

					<div className="flexbet w100 m1">
						От:
						<input type="number" className="input price__input" />
						- До:
						<input type="number" className="input price__input" />
					</div>
				</div>*/}
			</div>

			<div className="container">
				<div className="wrapper__inner w100">
					<div className="flexbet w100">
						<h2 className="title w100">
							Каталог
						</h2>

						<button className="button" onClick={openFilters}>
							Фильтрация
						</button>
					</div>

					{newFilterItems.length > 0
					? <div className="catalog__content w100">
						{newFilterItems.sort().map((d, id) => <Tovar desc={d.desc} fas={d.fas} pack={d.pack} key={id} name={d.name} id={d.id} price={d.price} image={d.image} hit={d.hit} />)}
					</div>
					: tovarsArr.length > 0 && siteFiltersArr.length === 0
					? <div className="catalog__content w100">
						{tovarsArr.sort().map((d, id) => <Tovar desc={d.desc} fas={d.fas} pack={d.pack} key={id} name={d.name} id={d.id} price={d.price} image={d.image} hit={d.hit} />)}
					</div>
					: <p className="w100 m3">
						Товаров не найдено
					</p>
					}
				</div>
			</div>
		</div>
	)
}

const mapStateToProps = (state) => {
	return{
		tovarsIsLoad: state.data.tovarsIsLoad,
		tovars: state.data.tovars,
		filters: state.data.filters,
		siteFilters: state.data.siteFilters
	}
}

export default connect(mapStateToProps, {})(Catalog);