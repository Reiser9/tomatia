import React from 'react';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';

import './Header.css';

import Social from '../common/Social/Social.jsx';
import Logo from '../common/Logo/Logo.jsx';
import Search from '../common/Search/Search.jsx';

const Header = ({search, setSearch, cartItems}) => {
	const cartItemsArr = Object.keys(cartItems).map(key => {
		return cartItems[key];
	});

	return(
		<>
			<header className="header">
			    <div className="container">
			        <div className="header__inner flexbet w100">
			            <Logo />

			            <div className="header__nav flex">
			                <NavLink to="/catalog" className="header__nav--link">
			                    Каталог
			                </NavLink>

			                <NavLink to="/how" className="header__nav--link">
			                    Как заказать
			                </NavLink>

			                <NavLink to="/payment" className="header__nav--link">
			                    Оплата и доставка
			                </NavLink>
			            </div>

			            <Search />

			            <div className="header__wrapper flex">
			                <Social />

			                <NavLink to="/cart" className="cart__icon--inner">
			                    <img src="/assets/img/cart.svg" alt="Корзина" className="cart__icon img" />

			                    {cartItemsArr.length > 0 && <span className="cart__index">{cartItemsArr.length}</span>}
			                </NavLink>

			                <div className="header__menu">
			                	<img src="/assets/img/menu.svg" alt="Меню" className="header__menu--icon" />
			                </div>
			            </div>
			        </div>
			    </div>
			</header>

			<div className="modal__menu">
				<img className="modal__menu--close close" src="/assets/img/cross.svg" alt="Меню" />

				<div className="modal__nav w100">
					<NavLink to="/" className="modal__nav--link close">
					    Главная
					</NavLink>

					<NavLink to="/catalog" className="modal__nav--link close">
					    Каталог
					</NavLink>

					<NavLink to="/how" className="modal__nav--link close">
					    Как заказать
					</NavLink>

					<NavLink to="/payment" className="modal__nav--link close">
					    Оплата и доставка
					</NavLink>
				</div>

				<div className="modal__social">
					<Social mobile />
				</div>

				<div className="modal__search">
					<Search mobile />
				</div>

				<NavLink to="/cart" className="cart__icon--inner cart__mobile m2 close">
				    <img src="/assets/img/cart.svg" alt="Корзина" className="cart__icon img" />

				    {cartItemsArr.length > 0 && <span className="cart__index">{cartItemsArr.length}</span>}
				</NavLink>
			</div>
		</>
	)
}

const mapStateToProps = (state) => {
	return{
		search: state.data.search,
		cartItems: state.data.cartItems
	}
}

export default connect(mapStateToProps, {})(Header);