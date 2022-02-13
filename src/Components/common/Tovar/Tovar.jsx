import React from 'react';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';

import './Tovar.css';

import {setCartItems, deleteTovar, editTovarAC, setImages} from '../../../redux/data-reducer.js';

const Tovar = ({setImages, video, editTovarAC, filter, filters, name, price, desc, image, id, hit = false, setCartItems, cartItems, deleteItem = false, keywords = '', deleteTovar, fas, pack}) => {
	const [isCart, setIsCart] = React.useState(false);
	const [value, setValue] = React.useState(1);
	const [edit, setEdit] = React.useState(false);

	const [nameEdit, setNameEdit] = React.useState('');
	const [keywordsEdit, setKeywordsEdit] = React.useState('');
	const [priceEdit, setPriceEdit] = React.useState('');
	const [descEdit, setDescEdit] = React.useState('');
	const [isHitEdit, setIsHitEdit] = React.useState('');
	const [imgEdit, setImgEdit] = React.useState('');
	const [fasEdit, setFasEdit] = React.useState('');
	const [packEdit, setPackEdit] = React.useState('');
	const [videoEdit, setVideoEdit] = React.useState([]);

	const [colorEdit, setColorEdit] = React.useState('');
	const [formEdit, setFormEdit] = React.useState('');
	const [sizeEdit, setSizeEdit] = React.useState('');
	const [typeEdit, setTypeEdit] = React.useState('');

	React.useEffect(() => {
		setNameEdit(name);
		setKeywordsEdit(keywords);
		setPriceEdit(price);
		setDescEdit(desc);
		setIsHitEdit(hit);
		setFasEdit(fas);
		setPackEdit(pack);
		setVideoEdit(video ? video : []);
		setColorEdit(filter?.color);
		setFormEdit(filter?.form);
		setSizeEdit(filter?.size);
		setTypeEdit(filter?.type);
	}, [video, name, price, desc, hit, keywords, pack, fas, filter]);

	const filtersArr = Object.keys(filters).map(key => {
		return filters[key];
	});

	const editTovar = () => {
		setEdit(true);
	}

	const saveTovar = () => {
		editTovarAC(nameEdit, keywordsEdit, priceEdit, descEdit, isHitEdit, imgEdit, colorEdit, formEdit, sizeEdit, typeEdit, fasEdit, packEdit, videoEdit, id);
		setEdit(false);
	}

	const canselSave = () => {
		setEdit(false);
	}

	const deleteImg = (uid) => {
		let temp = [...image];
		temp.splice(uid, 1);
		setImages(temp, id);
	}

	const deleteVideo = (uid) => {
		let temp = [...videoEdit];
		temp.splice(uid, 1);
		setVideoEdit(temp);
	}

	let cartKeys = Object.keys(cartItems);

	React.useEffect(() => {
		setIsCart(cartKeys.includes(""+id));
	}, [cartKeys, id]);

	const plus = () => {
		if(value < pack){
			setValue(prev => prev + 1);
		}
	}

	const minus = () => {
		if(value !== 1){
			setValue(prev => prev - 1);
		}
	}

	const addToCart = () => {
		let tempObj = {
			[id]: {
				id,
				value,
				img: image ? image[0] : 'https://brilliant24.ru/files/cat/template_01.png',
				name,
				fas
			}
		}
		setCartItems(tempObj);
	}

	const deleteTovarCatalog = () => {
		deleteTovar(id);
	}

	const uploadUserImg = () => {
		let value = document.getElementById("imgTovarEdit").files[0];
		setImgEdit(value);
	}

	const handleChange = ({target: {value, id}}) => {
		switch(id){
			case 'nameEdit':
				setNameEdit(value);
				break;
			case 'keywordsEdit':
				setKeywordsEdit(value);
				break;
			case 'priceEdit':
				setPriceEdit(value);
				break;
			case 'descEdit':
				setDescEdit(value);
				break;
			case 'fasEdit':
				setFasEdit(value);
				break;
			case 'packEdit':
				setPackEdit(value);
				break;
			case 'colorEdit':
				setColorEdit(value);
				break;
			case 'formEdit':
				setFormEdit(value);
				break;
			case 'sizeEdit':
				setSizeEdit(value);
				break;
			case 'typeEdit':
				setTypeEdit(value);
				break;
			default:
				break;
		}
	}

	return(
		<div className="catalog__item flexstart w100">
			{edit
			? <div className="flexstart w100">
				<input id="nameEdit" placeholder="Название товара" className="input w100" onChange={handleChange} value={nameEdit} />
				<input id="keywordsEdit" placeholder="Ключевые слова через пробел" className="input w100 m1" onChange={handleChange} value={keywordsEdit} />
				<input id="priceEdit" type="number" placeholder="Цена, только цифра" className="input w100 m1" onChange={handleChange} value={priceEdit} />
				<input id="descEdit" placeholder="Описание" className="input w100 m1" onChange={handleChange} value={descEdit} />
				<input id="fasEdit" placeholder="Фасовка" className="input w100 m1" onChange={handleChange} value={fasEdit} />
				<input id="packEdit" type="number" placeholder="Количество пакетиков в наличии, только цифра" className="input w100 m1" onChange={handleChange} value={packEdit} />

				{filtersArr.map((d, id) => <div key={id} className="w100 m1">
					<p className="w100">
						{d.name}
					</p>

					<select id={d.id + "Edit"} onChange={handleChange} className="w100 input m1">
						<option>Выбрать</option>
						{d.values.map((d, id) => <option key={id} value={d.name}>{d.name}</option>)}
					</select>
				</div>)}

				<button className={`button hit__button w100 m1${isHitEdit ? ' active' : ''}`} onClick={() => setIsHitEdit(prev => !prev)}>Хит</button>

				{image && image.map((d, id) => <div key={id} className="video__admin flexstart w100 m2">
					<img className="tovar__img--img" src={d} alt="Картинка" />

					<button className="button m1" onClick={() => deleteImg(id)}>Удалить</button>
				</div>)}

				{videoEdit && videoEdit.map((d, id) => <div key={id} className="video__admin flexstart w100 m2">
					<p className="video__admin--link">{d}</p>

					<button className="button m1" onClick={() => deleteVideo(id)}>Удалить</button>
				</div>)}

				<button className="button catalog__item--button m3 w100" onClick={saveTovar}>
					Сохранить
				</button>

				<button className="button catalog__item--button m3 w100" onClick={canselSave}>
					Отмена
				</button>
			</div>
			: <>
				<div className="catalog__item--wrapper flexstart w100">
					{hit
					&& <div className="catalog__item--hit">
						Хит
					</div>}

					<NavLink to={`/catalog/${id}`} className="catalog__item--img--inner w100">
						<img src={image ? image[0] : 'https://brilliant24.ru/files/cat/template_01.png'} alt="Картинка товара" className="catalog__item--img" />
					</NavLink>

					<p className="catalog__item--name m1">
						{name}
					</p>

					<p className="catalog__item--price m1">
						Цена: <span className="bold">{price} руб</span>
					</p>

					{deleteItem && <p className="catalog__item--price m1">
						Ключевые слова: {keywords}
					</p>}

					<p className="catalog__item--price m1">
						Фасовка: <span className="bold">{fas} семян</span>
					</p>

					{deleteItem && <p className="catalog__item--price m1">
						Наличие: <span className="bold">{pack} шт.</span>
					</p>}

					{pack >= 1 && !deleteItem && (!isCart
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
					</div>)}
				</div>

				<div className="flexstart w100">
					{pack >= 1 ? !deleteItem && (isCart
					? <button className="button catalog__item--button m2 w100 disable">
						В корзине
					</button>
					: <button className="button catalog__item--button m2 w100" onClick={addToCart}>
						В корзину
					</button>)
					: !deleteItem && <button className="button catalog__item--button m2 w100 disable">
						Нет в наличии
					</button>}

					{deleteItem && <>
						<button className="button catalog__item--button m3 w100" onClick={editTovar}>
							Редактировать
						</button>

						<button className="button catalog__item--button m1 w100" onClick={deleteTovarCatalog}>
							Удалить товар
						</button>
					</>}
				</div>
			</>}
		</div>
	)
}

const mapStateToProps = (state) => {
	return{
		cartItems: state.data.cartItems,
		filters: state.data.filters
	}
}

export default connect(mapStateToProps, {setCartItems, deleteTovar, editTovarAC, setImages})(Tovar);