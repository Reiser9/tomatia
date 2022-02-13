import React from 'react';
import {connect} from 'react-redux';

import './AddTovar.css';

import {addTovar} from '../../../../redux/data-reducer.js';

const AddTovar = ({addTovar, filters}) => {
	const [name, setName] = React.useState('');
	const [keywords, setKeywords] = React.useState('');
	const [price, setPrice] = React.useState('');
	const [desc, setDesc] = React.useState('');
	const [isHit, setIsHit] = React.useState(false);
	const [img, setImg] = React.useState([]);
	const [fas, setFas] = React.useState('');
	const [pack, setPack] = React.useState('');
	const [video, setVideo] = React.useState([]);
	const [videoLink, setVideoLink] = React.useState('');

	const [color, setColor] = React.useState('');
	const [form, setForm] = React.useState('');
	const [size, setSize] = React.useState('');
	const [type, setType] = React.useState('');

	const filtersArr = Object.keys(filters).map(key => {
		return filters[key];
	});

	const uploadUserImg = () => {
		let value = document.getElementById("imgTovar").files[0];
		if(value !== undefined){
			let temp = [...img, value];
			setImg(temp);
		}
	}

	const addVideo = () => {
		let temp = [...video, videoLink];
		setVideo(temp);
		setVideoLink('');
	}

	const deleteLink = (id) => {
		let temp = [...video];
		let myIndex = temp.indexOf(id);
		if(myIndex !== -1) {
		    temp.splice(myIndex, 1);
		}
		setVideo(temp);
	}

	const deleteImg = (id) => {
		let temp = [...img];
		temp.splice(id, 1);
		setImg(temp);
	}

	const addTovarAdmin = () => {
		if(!name){
			alert("Введите имя товара");
		}
		else if(!keywords){
			alert("Введите ключевые слова");
		}
		else if(!price){
			alert("Введите цену");
		}
		else if(!desc){
			alert("Введите описание");
		}
		else if(img.length < 1){
			alert("Загрузите изображение");
		}
		else if(!fas){
			alert("Введите фасовку");
		}
		else if(!pack){
			alert("Введите количество пакетиков для 1 заказа");
		}
		else{
			addTovar(name, keywords, price, desc, isHit, img, color, form, size, type, fas, pack, video);
			setName('');
			setKeywords('');
			setPrice('');
			setDesc('');
			setIsHit(false);
			setImg([]);
			setFas('');
			setPack('');
			setVideo([]);
			setVideoLink('');
		}
	}

	const handleChange = ({target: {value, id}}) => {
		switch(id){
			case 'name':
				setName(value);
				break;
			case 'keywords':
				setKeywords(value);
				break;
			case 'price':
				setPrice(value);
				break;
			case 'desc':
				setDesc(value);
				break;
			case 'fas':
				setFas(value);
				break;
			case 'pack':
				setPack(value);
				break;
			case 'form':
				setForm(value);
				break;
			case 'size':
				setSize(value);
				break;
			case 'color':
				setColor(value)
				break;
			case 'type':
				setType(value);
				break;
			case 'video':
				setVideoLink(value);
				break;
			default:
				break;
		}
	}

	return(
		<div className="flexstart w100 m1">
			<input id="name" placeholder="Название товара" className="input w100" onChange={handleChange} value={name} />
			<input id="keywords" placeholder="Ключевые слова через пробел" className="input w100 m1" onChange={handleChange} value={keywords} />
			<input id="price" type="number" placeholder="Цена, только цифра" className="input w100 m1" onChange={handleChange} value={price} />
			<input id="desc" placeholder="Описание" className="input w100 m1" onChange={handleChange} value={desc} />
			<input id="fas" placeholder="Фасовка" className="input w100 m1" onChange={handleChange} value={fas} />
			<input id="pack" type="number" placeholder="Количество пакетиков в наличии, только цифра" className="input w100 m1" onChange={handleChange} value={pack} />

			{video && video.map((d, id) => <div key={id} className="video__admin w100 m2">
				<p className="video__admin--link">{d}</p>

				<button className="button delete__button--video--admin" onClick={() => deleteLink(d)}>Удалить</button>
			</div>)}
			<input id="video" placeholder="Ссылка на видео" className="input w100 m2" onChange={handleChange} value={videoLink} />

			<button className="button w100 m1" onClick={addVideo}>Добавить еще</button>

			{filtersArr.map((d, id) => <div key={id} className="w100 m1">
				<p className="w100">
					{d.name}
				</p>

				<select id={d.id} onChange={handleChange} className="w100 input m1">
					<option>Выбрать</option>
					{d.values.map((d, id) => <option key={id} value={d.name} >{d.name}</option>)}
				</select>
			</div>)}

			<button className={`button hit__button w100 m1${isHit ? ' active' : ''}`} onClick={() => setIsHit(prev => !prev)}>Хит</button>

			{img && img.map((d, id) => <div key={id} className="video__admin w100 m2">
				<p className="video__admin--link">{d?.name ? d.name : ''}</p>

				<button className="button delete__button--video--admin" onClick={() => deleteImg(id)}>Удалить</button>
			</div>)}

			<input type="file" className="img__load" id="imgTovar" accept="image/jpeg,image/png" onChange={uploadUserImg} />
			<label htmlFor="imgTovar" className="label__img w100 m1">
				Загрузить фото
			</label>

			<button className="button w100 m1" onClick={addTovarAdmin}>Добавить товар</button>
		</div>
	)
}

const mapStateToProps = (state) => {
	return{
		filters: state.data.filters
	}
}

export default connect(mapStateToProps, {addTovar})(AddTovar);