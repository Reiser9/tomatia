import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import './TovarCard.css';

import {setCartItems} from '../../../redux/data-reducer.js';

import Media from './Media/Media.jsx';

const TovarCard = ({tovars, match, tovarsIsLoad, cartItems, setCartItems}) => {
	const [value, setValue] = React.useState(1);
	const [isCart, setIsCart] = React.useState(false);
	const id = match.params.id;

	const cartItemsArr = Object.keys(cartItems).map(key => {
		return cartItems[key];
	});

	const addToCart = () => {
		const iden = tovars[id]?.id;

		let tempObj = {
			[iden]: {
				id: iden,
				value
			}
		}
		setCartItems(tempObj);
	}

	React.useEffect(() => {
		cartItemsArr.forEach((i) => {
			if(i.id === tovars[id]?.id){
				setIsCart(true);
			}
		});
	}, [cartItemsArr, id, tovars]);

	const minus = () => {
		if(value !== 1){
			setValue(prev => prev - 1);
		}
	}

	const plus = () => {
		if(value < tovars[id]?.pack){
			setValue(prev => prev + 1);
		}
	}

	if(tovarsIsLoad){
		return <div className="admin__load">Загрузка..</div>
	}

	return(
		<div className="wrapper">
			<div className="container">
				<div className="wrapper__inner tovar__card--inner flexbet tovar__inner w100">
					<div className="tovar__img--content flexstart">
						{tovars[id]?.image && tovars[id]?.image.map((d, id) => <Media key={id} src={d} />)}

						{tovars[id]?.video && tovars[id]?.video.map((d, id) => <Media key={id} src={d} video />)}
					</div>

					<div className="tovar__info--inner flexstart">
						{tovars[id]?.hit
						&& <div className="tovar__info--hit">
							Хит
						</div>}

						<p className={`tovar__info--name bold${tovars[id]?.hit ? ' m2' : ''}`}>
							{tovars[id]?.name}
						</p>

						<div className="tovar__card--wrapper flexbet w100 m3">
							<p className="tovar__info--price">
								Цена: {tovars[id]?.price}руб.
							</p>

							{tovars[id]?.pack >= 1 && !isCart
							&& <div className="catalog__item--value--inner flex m1">
								<div className="catalog__operator" onClick={minus}>
									-
								</div>

								<div className="catalog__item--value">
									{value}
								</div>

								<div className="catalog__operator" onClick={plus}>
									+
								</div>
							</div>}
						</div>

						<p className="tovar__info--price m2">
							Фасовка: <span className="bold">{tovars[id]?.fas} семян</span>
						</p>

						<p className="tovar__info--price m2">
							В наличии: <span className="bold">{tovars[id]?.pack} шт.</span>
						</p>

						{tovars[id]?.pack >= 1
						? isCart
						? <button className="button w100 m2 disable">
							В корзине
						</button>
						: <button className="button w100 m2" onClick={addToCart}>
							В корзину
						</button>
						: <button className="button w100 m2 disable">
							Нет в наличии
						</button>}

						<div className="flexstart w100 m3">
							<div className="tovar__info--desc--title w100">
								Описание товара
							</div>

							<p className="tovar__info--desc m2">
								{tovars[id]?.desc}
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

const mapStateToProps = (state) => {
	return{
		tovars: state.data.tovars,
		tovarsIsLoad: state.data.tovarsIsLoad,
		cartItems: state.data.cartItems
	}
}

export default connect(mapStateToProps, {setCartItems})(withRouter(TovarCard));