import React from 'react';

import './How.css';

const How = () => {
	return(
		<div className="wrapper">
			<div className="container">
				<div className="blog__inner w100">
					<h2 className="title w100">
						Как заказать?
					</h2>

					<p className="w100 m3">
						Минимальной суммы заказа нет.
					</p>

					<p className="w100 m3">
						Добавьте в корзину понравившиеся сорта. Перейдите в корзину, нажав значок в верхнем правом углу экрана.
					</p>

					<p className="w100 m3">
						Для оформления заказа введите фамилию, имя, отчество, контактный телефон, адрес электронной почты. Укажите полный адрес доставки. 
					</p>

					<p className="w100 m3">
						После заполнения всех полей нажмите кнопку "Оформить заказ".
					</p>
				</div>
			</div>
		</div>
	)
}

export default How;