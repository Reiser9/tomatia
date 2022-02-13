import React from 'react';
import {connect} from 'react-redux';

import './AddArticle.css';

import {addArticle} from '../../../../redux/data-reducer.js';

const AddArticle = ({addArticle}) => {
	const [title, setTitle] = React.useState('');
	const [text, setText] = React.useState('');
	const [img, setImg] = React.useState('');
	const [textInner, setTextInner] = React.useState([]);

	const uploadUserImg = () => {
		let value = document.getElementById("imgArticle").files[0];
		if(value !== undefined){
			let temp = [...img, value];
			setImg(temp);
		}
	}

	const deleteImg = (id) => {
		let temp = [...img];
		temp.splice(id, 1);
		setImg(temp);
	}

	const addArticleAdmin = () => {
		if(!title){
			alert("Введите заголовок");
		}
		else if(textInner.length < 1){
			alert("Введите текст");
		}
		else if(!img){
			alert("Загрузите изображение");
		}
		else{
			addArticle(title, textInner, img);
			setTitle('');
			setText('');
			setImg('');
			setTextInner([]);
		}
	}

	const addText = () => {
		if(text){
			let temp = [...textInner, text];
			setTextInner(temp);
			setText('');
		}
	}

	const deleteText = (id) => {
		let temp = [...textInner];
		temp.splice(id, 1);
		setTextInner(temp);
	}

	const handleChange = ({target: {value, id}}) => {
		switch(id){
			case 'title':
				setTitle(value);
				break;
			case 'text':
				setText(value);
				break;
			default:
				break;
		}
	}

	return(
		<div className="flexstart w100 m1">
			<input id="title" placeholder="Заголовок" className="input w100" onChange={handleChange} value={title} />
			
			{textInner.map((d, id) => <div className="w100 m1 wb flexbet">{d} 
				<button className="button ml1 flexsh" onClick={() => deleteText(id)}>Удалить</button>
			</div>)}

			<textarea id="text" placeholder="Текст" className="input w100 m1" onChange={handleChange} value={text}></textarea>
			<button className="button w100 m1" onClick={addText}>Добавить текст</button>

			{img && img.map((d, id) => <div key={id} className="video__admin w100 m2">
				<p className="video__admin--link">{d?.name ? d.name : ''}</p>

				<button className="button delete__button--video--admin" onClick={() => deleteImg(id)}>Удалить</button>
			</div>)}

			<input type="file" className="img__load" id="imgArticle" accept="image/jpeg,image/png" onChange={uploadUserImg}/>
			<label htmlFor="imgArticle" className="label__img w100 m1">
				Загрузить фото
			</label>

			<button className="button w100 m1" onClick={addArticleAdmin}>Добавить статью</button>
		</div>
	)
}

const mapStateToProps = (state) => {
	return{
		
	}
}

export default connect(mapStateToProps, {addArticle})(AddArticle);