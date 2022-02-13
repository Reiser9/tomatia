import React from 'react';
import {connect} from 'react-redux';
import InputMask from 'react-input-mask';
import {AddressSuggestions} from 'react-dadata';
import 'react-dadata/dist/react-dadata.css';

import './Cart.css';

import {removeAllCart, calcTovars} from '../../../redux/data-reducer.js';
import {addOrder} from '../../../redux/admin-reducer.js';

import CartItem from './CartItem/CartItem.jsx';

const Cart = ({cartItems, tovars, removeAllCart, addOrder, calcTovars}) => {
	const [sum, setSum] = React.useState(0);
	const [sale, setSale] = React.useState(0);
	const [total, setTotal] = React.useState(0);
	const [email, setEmail] = React.useState('');
	const [name, setName] = React.useState('');
	const [surname, setSurname] = React.useState('');
	const [phone, setPhone] = React.useState('');
	const [address, setAddress] = React.useState('');
	const [code, setCode] = React.useState('');
	const [comment, setComment] = React.useState('');
	const totalZakazSum = 0;

	const cartItemsArr = Object.keys(cartItems).map(key => {
		return cartItems[key].id;
	});

	React.useEffect(() => {
		setSum(0);
		cartItemsArr.map(d => setSum(prev => prev + parseInt(tovars[d].price) * parseInt(cartItems[d].value)));
	}, [tovars, cartItems, cartItemsArr]);

	React.useEffect(() => {
		setTotal(sum - sale);
	}, [sum, sale]);

	const handleChange = ({target: {value, id}}) => {
		switch(id){
			case 'emailZakaz':
				setEmail(value);
				break;
			case 'nameZakaz':
				setName(value);
				break;
			case 'surnameZakaz':
				setSurname(value);
				break;
			case 'phoneZakaz':
				setPhone(value);
				break;
			case 'addressZakaz':
				setAddress(value);
				break;
			case 'codeZakaz':
				setCode(value);
				break;
			case 'commentZakaz':
				setComment(value);
				break;
			default:
				break;
		}
	}

	// Проверяет валидность почты
	const validMail = (email) => {
		return /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/.test(email);
	}

	const zakaz = () => {
		if(!validMail(email.toLowerCase())){
			alert("Адрес электронной почти не валидный");
		}
		else if(!name){
			alert("Введите имя");
		}
		else if(!surname){
			alert("Введите фамилию");
		}
		else{
			alert("Заказ оформлен, ожидайте сообщения на указанную почту!");
			addOrder(total, cartItems, email, name, surname, phone, address, code, comment);
			calcTovars(cartItems);
			removeAllCart();
			setEmail('');
		}
	}

	return(
		<div className="wrapper">
			<div className="container">
				<div className="wrapper__inner cart__inner flexbet w100">
					<div className="cart__wrapper w100">
						<h2 className="title w100">
							Корзина
						</h2>

						<div className="cart__content m2">
							{cartItemsArr.length > 0
							? cartItemsArr.map((d, id) => <CartItem fas={tovars[d].fas} pack={tovars[d].pack} key={id} name={tovars[d].name} img={tovars[d].image[0]}
							price={tovars[d].price} id={d} value={cartItems[d].value} />)
							: <p className="w100 m2">Корзина пуста</p>}
						</div>
					</div>

					<div className="cart__info flexcenter w100">
						<p className="cart__info--title">
							Информация о заказе
						</p>

						<div className="cart__info--item flexbet w100 m3">
							<p className="cart__info--text">
								Товары на сумму:
							</p>

							<p className="cart__info--value">
								{sum} руб.
							</p>
						</div>

						<div className="cart__info--item flexbet w100 m3">
							<p className="cart__info--text">
								Скидка:
							</p>

							<p className="cart__info--value">
								{sale} руб.
							</p>
						</div>

						{/*<div className="cart__info--item flexbet w100 m3">
							<input placeholder="Промокод" className="input promo__input" />

							<button className="button promo__button">
								Применить
							</button>
						</div>*/}

						<div className="cart__info--item flexbet w100 m3">
							<p className="cart__info--text">
								Итого:
							</p>

							<p className="cart__info--value">
								{total} руб.
							</p>
						</div>

						{total < totalZakazSum && <p className="w100 m3 red bold">Минимальная сумма заказа {totalZakazSum} руб.</p>}

						{total > totalZakazSum
						&& <>
							<input id="emailZakaz" placeholder="Адрес электронной почты" className="input w100 m3" value={email} onChange={handleChange} />
							<input id="nameZakaz" placeholder="Имя" className="input w100 m1" value={name} onChange={handleChange} />
							<input id="surnameZakaz" placeholder="Фамилия" className="input w100 m1" value={surname} onChange={handleChange} />
							<InputMask id="phoneZakaz" mask="+7 999 999 99 99" maskChar=" " placeholder="Номер телефона" className="input w100 m1" onChange={handleChange}></InputMask>
							<AddressSuggestions inputProps={{className: "input w100", placeholder: "Адрес", id: "addressZakaz", onBlur: handleChange, onChange: handleChange}} containerClassName="address__input w100 m1" token="c289722e7e00eaa38ac2cbe739fac73d33945d49"/>
							<InputMask id="codeZakaz" mask="999 999" maskChar=" " placeholder="Почтовый индекс" className="input w100 m1" onChange={handleChange}></InputMask>
							<textarea id="commentZakaz" className="input textarea w100 m1" placeholder="Комментарий(по желанию)" value={comment} onChange={handleChange}></textarea>
						</>}

						{total > totalZakazSum 
						? <button className="button w100 m3" onClick={zakaz}>
							Оформить заказ
						</button>
						: <button className="button w100 m3 disable">
							Оформить заказ
						</button>}
					</div>
				</div>
			</div>
		</div>
	)
}

const mapStateToProps = (state) => {
	return{
		cartItems: state.data.cartItems,
		tovars: state.data.tovars
	}
}

export default connect(mapStateToProps, {removeAllCart, addOrder, calcTovars})(Cart);