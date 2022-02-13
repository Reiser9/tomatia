import React from 'react';
import {connect} from 'react-redux';

import './Blog.css';

import Article from '../../common/Article/Article.jsx';

const Blog = ({articlesIsLoad, articles}) => {
	const articlesArr = Object.keys(articles).map(key => {
		return articles[key];
	});

	if(articlesIsLoad){
		return <div className="admin__load">Загрузка..</div>
	}

	return(
		<div className="wrapper">
			<div className="container">
				<div className="blog__inner w100">
					<h2 className="title w100">
						Блог
					</h2>

					{articlesArr.length > 0
					&& <div className="blog__content w100 m3">
						{articlesArr.reverse().map((d, id) => <Article title={d.title} id={d.id} img={d.img} date={d.date} key={id} />)}
					</div>}
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

export default connect(mapStateToProps, {})(Blog);