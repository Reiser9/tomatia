import React from 'react';
import {connect} from 'react-redux';

import './Main.css';

import MainBlock from './MainBlock/MainBlock.jsx';
import Sale from './Sale/Sale.jsx';
import CatalogBlock from './CatalogBlock/CatalogBlock.jsx';
import BlogBlock from './BlogBlock/BlogBlock.jsx';

const Main = ({dataIsLoad}) => {
	if(dataIsLoad){
		return <div className="block__load">Загрузка..</div>
	}

	return(
		<>
			<MainBlock />

			<Sale />

			<CatalogBlock />

			<BlogBlock />
		</>
	)
}

const mapStateToProps = (state) => {
	return{
		dataIsLoad: state.data.dataIsLoad
	}
}

export default connect(mapStateToProps, {})(Main);