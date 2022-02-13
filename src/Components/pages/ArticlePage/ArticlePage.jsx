import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import './ArticlePage.css';

const ArticlePage = ({match, articles, articlesIsLoad}) => {
	const id = match.params.id;

	if(articlesIsLoad){
		return <div className="admin__load">Загрузка..</div>
	}

	return(
		<div className="wrapper">
			<div className="container">
				<div className="wrapper__inner flexstart w100">
					<h2 className="title w100">
						{articles[id]?.title}
					</h2>

					<p className="article__date bold m2">
						Дата публикации: {articles[id]?.date}
					</p>

					{articles[id]?.img.map((d, id) => <div key={id} className="article__img--inner m2">
						<img src={d} alt="Картинка статьи" className="img" />
					</div>)}

					{articles[id]?.text.map((d, id) => <p key={id} className="article__text m2">
						{d}
					</p>)}
				</div>
			</div>
		</div>
	)
}

const mapStateToProps = (state) => {
	return{
		articles: state.data.articles,
		articlesIsLoad: state.data.articlesIsLoad
	}
}

export default connect(mapStateToProps, {})(withRouter(ArticlePage));