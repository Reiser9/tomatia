import React from 'react';
import {NavLink} from 'react-router-dom';

import './Article.css';

const Article = ({date, title, id, img}) => {
	return(
		<NavLink to={`/blog/${id}`} className="blog__item w100">
			<span className="blog__item--img--inner">
				<img src={img[0]} alt="Картинка статьи" className="blog__item--img img" />
			</span>

			<span className="blog__item--content w100">
				<p className="blog__item--date bold">
					{date}
				</p>

				<span className="blog__item--wrapper">
					<p className="blog__item--text bold">
						{title}
					</p>

					<p className="blog__item--link m1">
						Читать дальше
					</p>
				</span>
			</span>
		</NavLink>
	)
}

export default Article;