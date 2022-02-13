import React from 'react';
import {connect} from 'react-redux';

import {deleteArticle, editArticleAC, setTextArticle, setImgArticle} from '../../../../redux/data-reducer.js';

const ArticleAdmin = ({title, date, text, id, deleteArticle, img, editArticleAC, setTextArticle, setImgArticle}) => {
	const [edit, setEdit] = React.useState(false);

	const [titleEdit, setTitleEdit] = React.useState('');
	const [textEdit, setTextEdit] = React.useState('');
	const [imgEdit, setImgEdit] = React.useState([]);

	React.useEffect(() => {
		setTitleEdit(title);
		setTextEdit(text);
		setImgEdit(img);
	}, [text, title, img]);

	const deleteArticleFunc = () => {
		deleteArticle(id);
	}

	const deleteImg = (uid) => {
		let temp = [...imgEdit];
		temp.splice(uid, 1);
		setImgArticle(temp, id);
	}

	const editArticle = () => {
		setEdit(true);
	}

	const canselEdit = () => {
		setEdit(false);
	}

	const saveArticle = () => {
		editArticleAC(titleEdit, textEdit, imgEdit, id);
		setEdit(false);
	}

	const deleteText = (uid) => {
		let temp = [...textEdit];
		temp.splice(uid, 1);
		setTextArticle(temp, id);
	}

	const handleChange = ({target: {id, value}}) => {
		switch(id){
			case 'titleEdit':
				setTitleEdit(value);
				break;
			default:
				break;
		}
	}

	return(
		<div className="catalog__item w100">
			{edit 
			? <>
				<input id="titleEdit" placeholder="Заголовок" className="input w100" onChange={handleChange} value={titleEdit} />

				{imgEdit?.map((d, id) => <div key={id} className="w100 flexcenter">
					<img src={d} alt="Картинка" className="w100 m2" />

					<button className="button m1" onClick={deleteImg}>Удалить</button>
				</div>)}

				<p className="w100 m1">
					{text?.map((d, id) => <div key={id} className="w100 m1 flexbet">
						{d}

						<button className="button flexsh" onClick={() => deleteText(id)} >Удалить</button>
					</div>)}
				</p>

				<button className="button w100 m1" onClick={canselEdit}>
					Отменить
				</button>

				<button className="button w100 m1" onClick={saveArticle}>
					Сохранить
				</button>
			</>
			: <>
				<p className="w100">
					{title}
				</p>

				<p className="w100 m1">
					{date}
				</p>

				{imgEdit?.map((d, id) => <img key={id} src={d} alt="Картинка" className="w100 m2" />)}

				<div className="w100 m1">
					{text?.map((d, id) => <div key={id} className="w100 m1">
						{d}
					</div>)}
				</div>

				<button className="button w100 m1" onClick={editArticle}>
					Редактировать
				</button>

				<button className="button w100 m1" onClick={deleteArticleFunc}>
					Удалить статью
				</button>
			</>}
		</div>
	)
}

const mapStateToProps = (state) => {
	return{
		
	}
}

export default connect(mapStateToProps, {deleteArticle, editArticleAC, setTextArticle, setImgArticle})(ArticleAdmin);