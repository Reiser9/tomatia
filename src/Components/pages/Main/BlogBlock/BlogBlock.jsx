import React from 'react';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';

import './BlogBlock.css';

import Article from '../../../common/Article/Article.jsx';

const BlogBlock = ({articlesIsLoad, articles}) => {
	const articlesArr = Object.keys(articles).map(key => {
		return articles[key];
	});

	if(articlesIsLoad){
		return <div className="block__load">Загрузка..</div>
	}

	return(
		<div className="wrapper">
			<div className="container">
				<div className="blog__inner flexcenter w100">
					<h2 className="title w100">
						Блог
					</h2>

					<p className="subtext w100">
						Вся информация по выращиванию томатов
					</p>

					{articlesArr.length > 0
					&& <div className="blog__content w100">
						{articlesArr.slice(-3).reverse().map((d, id) => <Article title={d.title} id={d.id} img={d.img} date={d.date} key={id} />)}
					</div>}

					<NavLink to="/blog" className="button m3">
						Все статьи
					</NavLink>
				</div>
			</div>
		</div>
	)
}

const mapStateToProps = (state) => {
	return{
		articlesIsLoad: state.data.articlesIsLoad,
		articles: state.data.articles
	}
}

export default connect(mapStateToProps, {})(BlogBlock);