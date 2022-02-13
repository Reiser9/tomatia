import firebase from 'firebase/compat/app';
import "firebase/compat/database";
import "firebase/compat/storage";

const SET_DATA_IS_LOAD = 'SET_DATA_IS_LOAD';
const SET_ARTICLES_IS_LOAD = 'SET_ARTICLES_IS_LOAD';
const SET_TOVARS_IS_LOAD = 'SET_TOVARS_IS_LOAD';
const SET_MAIN_TITLE = 'SET_MAIN_TITLE';
const SET_MAIN_CHECKS = 'SET_MAIN_CHECKS';
const SET_ARTICLES = 'SET_ARTICLES';
const SET_TOVARS = 'SET_TOVARS';
const SET_SEARCH = 'SET_SEARCH';
const SET_CART_ITEMS = 'SET_CART_ITEMS';
const DELETE_CART_ITEMS = 'DELETE_CART_ITEMS';
const SET_ARTICLE_IMG_LOAD = 'SET_ARTICLE_IMG_LOAD';
const SET_TOVAR_IMG_LOAD = 'SET_TOVAR_IMG_LOAD';
const SET_SALE_TEXT = 'SET_SALE_TEXT';
const REMOVE_CART_ITEMS = 'REMOVE_CART_ITEMS';
const SET_FILTERS = 'SET_FILTERS';
const SET_SITE_FILTERS = 'SET_SITE_FILTERS';
const REMOVE_SITE_FILTERS = 'REMOVE_SITE_FILTERS';

const initialState = {
	dataIsLoad: true,
	articlesIsLoad: true,
	tovarsIsLoad: true,
	mainTitle: '',
	mainChecks: {},
	articles: {},
	tovars: {},
	search: '',
	cartItems: {},
	articleImgLoad: false,
	tovarImgLoad: false,
	saleText: '',
	filters: {},
	siteFilters: {}
}

const authReducer = (state = initialState, action) => {
	switch(action.type){
		case SET_DATA_IS_LOAD:
			return{
				...state,
				dataIsLoad: action.value
			}
		case SET_ARTICLES_IS_LOAD:
			return{
				...state,
				articlesIsLoad: action.value
			}
		case SET_TOVARS_IS_LOAD:
			return{
				...state,
				tovarsIsLoad: action.value
			}
		case SET_MAIN_TITLE:
			return{
				...state,
				mainTitle: action.value
			}
		case SET_MAIN_CHECKS:
			return{
				...state,
				mainChecks: {...action.value}
			}
		case SET_ARTICLES:
			return{
				...state,
				articles: {...action.value}
			}
		case SET_TOVARS:
			return{
				...state,
				tovars: {...action.value}
			}
		case SET_SEARCH:
			return{
				...state,
				search: action.value
			}
		case SET_CART_ITEMS:
			return{
				...state,
				cartItems: {
					...state.cartItems,
					...action.value
				}
			}
		case DELETE_CART_ITEMS:
			let temp = {...state.cartItems};
			delete temp[action.value];
			return{
				...state,
				cartItems: temp
			}
		case REMOVE_CART_ITEMS:
			return{
				...state,
				cartItems: {}
			}
		case SET_ARTICLE_IMG_LOAD:
			return{
				...state,
				articleImgLoad: action.value
			}
		case SET_TOVAR_IMG_LOAD:
			return{
				...state,
				tovarImgLoad: action.value
			}
		case SET_SALE_TEXT:
			return{
				...state,
				saleText: action.value
			}
		case SET_FILTERS:
			return{
				...state,
				filters: {...action.value}
			}
		case SET_SITE_FILTERS:
			return{
				...state,
				siteFilters: {
					...state.siteFilters,
					...action.value
				}
			}
		case REMOVE_SITE_FILTERS:
			let temp2 = {...state.siteFilters};
			delete temp2[action.value];
			return{
				...state,
				siteFilters: temp2
			}
        default:
            return state;
    }
}

const setDataIsLoad = (value) => {
	return{
		type: SET_DATA_IS_LOAD,
		value
	}
}
const setArticlesIsLoad = (value) => {
	return{
		type: SET_ARTICLES_IS_LOAD,
		value
	}
}
const setTovarsIsLoad = (value) => {
	return{
		type: SET_TOVARS_IS_LOAD,
		value
	}
}
const setMainTitle = (value) => {
	return{
		type: SET_MAIN_TITLE,
		value
	}
}
const setMainChecks = (value) => {
	return{
		type: SET_MAIN_CHECKS,
		value
	}
}
const setArticles = (value) => {
	return{
		type: SET_ARTICLES,
		value
	}
}
const setTovars = (value) => {
	return{
		type: SET_TOVARS,
		value
	}
}
export const setSearch = (value) => {
	return{
		type: SET_SEARCH,
		value
	}
}
export const setCartItems = (value) => {
	return{
		type: SET_CART_ITEMS,
		value
	}
}
export const removeCartItems = (value) => {
	return{
		type: DELETE_CART_ITEMS,
		value
	}
}
export const setArticleImgLoad = (value) => {
	return{
		type: SET_ARTICLE_IMG_LOAD,
		value
	}
}
export const setTovarImgLoad = (value) => {
	return{
		type: SET_TOVAR_IMG_LOAD,
		value
	}
}
const setSaleText = (value) => {
	return{
		type: SET_SALE_TEXT,
		value
	}
}
const emptyCartItems = () => {
	return{
		type: REMOVE_CART_ITEMS
	}
}
const setFiltersItems = (value) => {
	return{
		type: SET_FILTERS,
		value
	}
}
const setSiteFilters = (value) => {
	return{
		type: SET_SITE_FILTERS,
		value
	}
}
const removeSiteFilters = (value) => {
	return{
		type: REMOVE_SITE_FILTERS,
		value
	}
}

export const removeAllCart = () => (dispatch) => {
	dispatch(emptyCartItems());
}

// Добавить фильтр
export const setSiteFiltersAC = (id, value, uid) => (dispatch) => {
	let obj = {
		[uid]: {
			[id]: value
		}
	}
	dispatch(setSiteFilters(obj));
}

// Удалить фильтр
export const removeSiteFiltersAC = (uid) => (dispatch) => {
	dispatch(removeSiteFilters(uid));
}

// Получить время в секундах
export const getTimeId = () => {
	let time = new Date();
	return time.getTime();
}

// Получить дату в формате DD.MM.YYYY
export const getTimeNormal = () => {
	let time = new Date();
	let day = time.getDate();
	let month = time.getMonth() + 1;
	let year = time.getFullYear();
	if(day < 10){
		day = '0' + day;
	}
	if(month < 10){
		month = '0' + month;
	}
	return day + "." + month + "." + year;
}

// Инициализация данных сайта
export const initData = () => async (dispatch) => {
	await firebase.database().ref('data').on('value', data => {
		dispatch(setDataIsLoad(false));
		const allData = data.val();
		dispatch(setMainTitle(allData.mainPage.title));
		dispatch(setMainChecks(allData.mainPage.items));
		dispatch(setSaleText(allData.mainPage.saleText));
	});
}

export const initArticles = () => (dispatch) => {
	firebase.database().ref('articles').on('value', data => {
		dispatch(setArticlesIsLoad(false));
		dispatch(setArticles(data.val()));
	});
}

export const initTovars = () => (dispatch) => {
	firebase.database().ref('tovars').on('value', data => {
		dispatch(setTovarsIsLoad(false));
		dispatch(setTovars(data.val()));
	});
}

export const initFilters = () => (dispatch) => {
	firebase.database().ref('filters').on('value', data => {
		dispatch(setFiltersItems(data.val()));
	});
}

// Добавить
export const addCheck = (text) => async (dispatch) => {
	const id = getTimeId();
	await firebase.database().ref('data/mainPage/items/' + id).set({
		id,
		text
	});
}

// Изменить
export const setCheck = (text, id) => async (dispatch) => {
	await firebase.database().ref('data/mainPage/items/' + id + '/text').set(text);
}

// Удалить
export const deleteCheck = (text, id) => async (dispatch) => {
	await firebase.database().ref('data/mainPage/items/' + id).set({});
}

// Изменить заголовок
export const setTitle = (text) => async (dispatch) => {
	await firebase.database().ref('data/mainPage/title').set(text);
}

// Изменить текст скидки
export const editSaleText = (text) => async (dispatch) => {
	await firebase.database().ref('data/mainPage/saleText').set(text);
}

export const uploadImg = (img, images, timeAdd, from = 'tovars') => async (dispatch) => {
	debugger;
	let time = getTimeId();
	await firebase.storage().ref(`${from}/` + time).put(img)
	await firebase.storage().ref(`${from}/` + time).getDownloadURL().then(url => {
		images.push(url);
		firebase.database().ref(`${from}/` + timeAdd).update({
			image: images
		});
	});
}

// Добавить товар
export const addTovar = (name, keyword, price, desc, isHit, img, color, form, size, type, fas, pack, video) => async (dispatch) => {
	let timeTovar = getTimeId();
	let images = [];

	await img.map((d) => {
		dispatch(uploadImg(d, images, timeTovar));
	});

	await firebase.database().ref('tovars/' + timeTovar).set({
			name,
			keyword,
			id: timeTovar,
			price,
			desc,
			hit: isHit,
			fas,
			pack,
			filter: {
				color,
				size,
				type,
				form
			},
			video
		});
}

export const setImages = (images, id) => (dispatch) => {
	firebase.database().ref('tovars/' + id).update({
		image: images
	});
}

export const setImgArticle = (img, id) => (dispatch) => {
	firebase.database().ref('articles/' + id).update({
		img
	});
}

export const setTextArticle = (text, id) => (dispatch) => {
	firebase.database().ref('articles/' + id).update({
		text
	});
}

// Редактировать товар
export const editTovarAC = (name, keyword, price, desc, isHit, img, color, form, size, type, fas, pack, video, id) => async (dispatch) => {
	firebase.database().ref('tovars/' + id).update({
		name,
		keyword,
		id,
		price,
		desc,
		hit: isHit,
		fas,
		pack,
		video,
		filter: {
			color,
			size,
			type,
			form
		}
	});
}

// Редактировать статью
export const editArticleAC = (title, text, img, id) => async (dispatch) => {
	firebase.database().ref('articles/' + id).update({
		title,
		text,
		img
	});
}

// Удалить товар
export const deleteTovar = (id) => async (dispatch) => {
	await firebase.database().ref('tovars/' + id).set({});
}

// Добавить статью
export const addArticle = (title, text, img) => (dispatch) => {
	let date = getTimeNormal();
	let timeArticle = getTimeId();
	let images = [];
	img.map((d) => {
		let time = getTimeId();
		let storageRef = firebase.storage().ref('articles/' + time).put(d);

		storageRef.on('state_changed', 
			snapshot => {},
			error => {},
			() => {
				firebase.storage().ref('articles/' + time).getDownloadURL().then(url => {
					images.push(url);
					firebase.database().ref('articles/' + timeArticle).update({
						img: images
					});
				});
			}
		);
	});

	firebase.database().ref('articles/' + timeArticle).set({
		title,
		text,
		id: timeArticle,
		date,
		img: images
	});
}

// Удалить статью
export const deleteArticle = (id) => async (dispatch) => {
	await firebase.database().ref('articles/' + id).set({});
}

// Уменьшить количество пакетиков после заказа
export const calcTovars = (cartItems) => (dispatch) => {
	const cartItemsArr = Object.keys(cartItems).map(key => {
		return cartItems[key];
	});

	cartItemsArr.forEach(function(item){
		firebase.database().ref('tovars/' + item.id + "/pack").once('value', data => {
			let packNew = data.val() - item.value;
			firebase.database().ref('tovars/' + item.id + "/pack").set(packNew);
		});
	});
}

export default authReducer;