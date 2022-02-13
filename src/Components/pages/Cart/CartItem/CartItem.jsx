import React from 'react';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';

import './CartItem.css';

import {removeCartItems, setCartItems} from '../../../../redux/data-reducer.js';

const CartItem = ({name, price, value, img, id, removeCartItems, setCartItems, fas, pack}) => {
	const [total, setTotal] = React.useState(0);

	React.useEffect(() => {
		setTotal(value * price);
	}, [value, price]);

	const deleteItem = () => {
		removeCartItems(id);
	}

	const minus = () => {
		if(value > 1){
			let tempObj = {
				[id]: {
					id,
					value: value - 1
				}
			}
			setCartItems(tempObj);
		}
	}

	const plus = () => {
		if(value < pack){
			let tempObj = {
				[id]: {
					id,
					value: value + 1
				}
			}
			setCartItems(tempObj);
		}
	}

	return(
		<div className="cart__item flexbet w100">
			<NavLink to={`/catalog/${id}`} className="cart__item--img--inner">
				<img src={img} alt="Картинка" className="img" />
			</NavLink>

			<p className="cart__item--name">
				{name}
			</p>

			<div className="catalog__item--value--inner flex">
				<div className="catalog__operator" onClick={minus}>
					-
				</div>

				<div className="catalog__item--value">
					{value}
				</div>

				<div className="catalog__operator" onClick={plus}>
					+
				</div>
			</div>

			<p className="cart__item--price">
				{total}руб.
			</p>

			<div className="cart__item--delete--inner" onClick={deleteItem}>
				<img src="/assets/img/delete.svg" alt="Удалить" className="cart__item--delete--icon" />
			</div>
		</div>
	)
}

const mapStateToProps = (state) => {
	return{
		
	}
}

export default connect(mapStateToProps, {removeCartItems, setCartItems})(CartItem);