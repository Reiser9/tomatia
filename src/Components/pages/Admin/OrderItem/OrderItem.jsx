import React from 'react';
import {connect} from 'react-redux';

import './OrderItem.css';

import {deleteOrder} from '../../../../redux/admin-reducer.js';

const OrderItem = ({email, date, tovars, sum, tovarItems, id, deleteOrder, name, surname, phone, address, code, comment}) => {
	debugger;
	const tovarItemsArr = Object.keys(tovarItems).map(key => {
		return tovarItems[key];
	});

	const deleteOrderAdmin = () => {
		deleteOrder(id);
	}

	return(
		<div className="admin__item flexstart m2">
			<p className="w100">
				Адрес электронной почты: <span className="bold">{email}</span>
			</p>

			<p className="w100 m1">
				Имя: <span className="bold">{name}</span>
			</p>

			<p className="w100 m1">
				Фамилия: <span className="bold">{surname}</span>
			</p>

			<p className="w100 m1">
				Номер телефона: <span className="bold">{phone}</span>
			</p>

			<p className="w100 m1">
				Адрес: <span className="bold">{address}</span>
			</p>

			<p className="w100 m1">
				Почтовый индекс: <span className="bold">{code}</span>
			</p>

			<p className="w100 m1">
				Дата создания заказа: <span className="bold">{date}</span>
			</p>

			<p className="w100 m1">
				Сумма заказа с учетом скидки: <span className="bold">{sum} руб.</span>
			</p>

			<p className="w100 m1">
				Комментарий к заказу: <span className="bold">{comment ? comment : "Комментарий не оставлен"}</span>
			</p>

			{tovarItemsArr.map((d, id) => <div key={id} className="admin__cart--item flexbet w100 m2">
				<div className="admin__cart--item--img--inner flexsh">
					<img src={tovars[d.id]?.image[0]} alt="Картинка" className="img" />
				</div>

				<p className="admin__cart--item--name">
					{d.name}
				</p>

				<p className="admin__cart--item--value">
					Количество: {d.value}
				</p>
			</div>)}

			<button onClick={deleteOrderAdmin} className="button m2">Удалить заказ</button>
		</div>
	)
}

const mapStateToProps = (state) => {
	return{
		tovars: state.data.tovars
	}
}

export default connect(mapStateToProps, {deleteOrder})(OrderItem);