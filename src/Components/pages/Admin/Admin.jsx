import React from 'react';
import {connect} from 'react-redux';

import './Admin.css';

import {quit, setData, enter} from '../../../redux/auth-reducer.js';
import {addCheck, setTitle, editSaleText} from '../../../redux/data-reducer.js';

import Check from './Check/Check.jsx';
import Tovar from '../../common/Tovar/Tovar.jsx';
import AddTovar from './AddTovar/AddTovar.jsx';
import AddArticle from './AddArticle/AddArticle.jsx';
import OrderItem from './OrderItem/OrderItem.jsx';
import ArticleAdmin from './ArticleAdmin/ArticleAdmin.jsx';

const Admin = ({isAuth, enterEmail, enterPassword, loadAuth, authIsLoad, mainChecks, mainTitle, editSaleText,
	dataIsLoad, quit, setData, enter, addCheck, setTitle, tovars, articles, saleText, orders}) => {
	const [newCheck, setNewCheck] = React.useState('');
	const [newTitle, setNewTitle] = React.useState('');
	const [newSaleText, setNewSaleText] = React.useState('');

	React.useEffect(() => {
		setNewTitle(mainTitle);
	}, [mainTitle]);

	React.useEffect(() => {
		setNewSaleText(saleText);
	}, [saleText]);

	const tovarsArr = Object.keys(tovars).map(key => {
		return tovars[key];
	});

	const articlesArr = Object.keys(articles).map(key => {
		return articles[key];
	});

	const ordersArr = Object.keys(orders).map(key => {
		return orders[key];
	});

	const changeNewCheck = ({target: {value}}) => {
		setNewCheck(value);
	}

	const changeNewTitle = ({target: {value}}) => {
		setNewTitle(value);
	}

	const changeNewSaleText = ({target: {value}}) => {
		setNewSaleText(value);
	}

	const handleChange = ({target: {value, id}}) => {
		setData(value, id);
	}

	const enterAccount = () => {
		enter(enterEmail, enterPassword);
	}

	const createCheck = () => {
		if(newCheck.length > 0){
			addCheck(newCheck);
			setNewCheck('');
		}
	}

	const changeTitle = () => {
		if(newTitle !== mainTitle){
			setTitle(newTitle);
		}
	}

	const changeSaleText = () => {
		if(newSaleText !== saleText){
			editSaleText(newSaleText);
		}
	}

	const mainChecksArr = Object.keys(mainChecks).map(key => {
		return mainChecks[key]
	});

	if(authIsLoad){
		return(
			<div className="admin__load">Загрузка..</div>
		)
	}

	return(
		<>
			{dataIsLoad
			? <div className="admin__load">Загрузка..</div>
			: !isAuth
			? <div className="wrapper">
				<div className="container">
					<div className="wrapper__inner flexstart auth__inner w100">
						<h2 className="title w100">
							Авторизация
						</h2>

						<input id="enterEmail" value={enterEmail} onChange={handleChange} className="input w100 m3" placeholder="Логин" />

						<input id="enterPassword" value={enterPassword} onChange={handleChange} className="input w100 m1" placeholder="Пароль" type="password" />

						{loadAuth
						? <button className="button w100 m2 disable">
							Загрузка..
						</button>
						: <button className="button w100 m2" onClick={enterAccount}>
							Вход
						</button>}
					</div>
				</div>
			</div>
			: <div className="wrapper">
				<div className="container">
					<div className="wrapper__inner w100">
						<h2 className="title w100">
							Админка
						</h2>

						<div className="admin__content w100 m3">
							<p className="admin__item--title">
								Заказы:
							</p>

							<div className="admin__content w100">
								{ordersArr.length > 0
								? ordersArr.map((d, id) => <OrderItem key={id} id={d.id} email={d.email} name={d.name} surname={d.surname}
								phone={d.phone} sum={d.sum} date={d.date} tovarItems={d.tovars} address={d.address} code={d.code} comment={d.comment} />)
								: <p className="m2 bold">Заказов пока нет</p>}
							</div>

							<div className="admin__item flexstart m3">
								<p className="admin__item--title">
									Заголовок:
								</p>

								<textarea className="input w100 m1" placeholder="Введите заголовок" value={newTitle} onChange={changeNewTitle} onBlur={changeTitle}></textarea>

								<p className="admin__item--title m2">
									Преимущества:
								</p>

								{mainChecksArr.map((d, id) => <Check text={d.text} key={id} id={d.id} />)}

								<input placeholder="Введите текст" className="input w100 m1" value={newCheck} onChange={changeNewCheck} />

								<button className="button m1" onClick={createCheck}>
									Добавить
								</button>
							</div>

							<div className="admin__item flexstart m3">
								<p className="admin__item--title">
									Текст скидки:
								</p>

								<textarea className="input w100 m1" placeholder="Введите текст" value={newSaleText} onChange={changeNewSaleText} onBlur={changeSaleText}></textarea>
							</div>

							<div className="admin__item flexstart m3">
								<p className="admin__item--title">
									Добавить товар:
								</p>
								
								<AddTovar />
							</div>

							<div className="admin__item flexstart m3">
								<p className="admin__item--title">
									Добавить статью:
								</p>
								
								<AddArticle />
							</div>

							<div className="flexstart w100 m3">
								<p className="admin__item--title">
									Все товары:
								</p>
								
								<div className="catalog__content w100 m2">
									{tovarsArr.reverse().map((d, id) => <Tovar video={d.video} filter={d.filter} desc={d.desc} pack={d.pack} fas={d.fas} key={id} name={d.name} id={d.id}
									price={d.price} image={d.image} hit={d.hit} deleteItem={true} keywords={d.keyword} />)}
								</div>
							</div>

							<div className="flexstart w100 m3">
								<p className="admin__item--title">
									Все статьи:
								</p>
								
								<div className="blog__content w100 m2">
									{articlesArr.reverse().map((d, id) => <ArticleAdmin img={d.img} key={id} id={d.id} text={d.text} date={d.date} title={d.title} />)}
								</div>
							</div>
						</div>

						<button className="button m3" onClick={quit}>
							Выйти из аккаунта
						</button>
					</div>
				</div>
			</div>}
		</>
	)
}

const mapStateToProps = (state) => {
	return{
		isAuth: state.auth.isAuth,
		enterEmail: state.auth.enterEmail,
		enterPassword: state.auth.enterPassword,
		loadAuth: state.auth.loadAuth,
		authIsLoad: state.auth.authIsLoad,
		mainTitle: state.data.mainTitle,
		mainChecks: state.data.mainChecks,
		dataIsLoad: state.data.dataIsLoad,
		tovars: state.data.tovars,
		articles: state.data.articles,
		saleText: state.data.saleText,
		orders: state.admin.orders
	}
}

export default connect(mapStateToProps, {quit, setData, enter, addCheck, setTitle, editSaleText})(Admin);