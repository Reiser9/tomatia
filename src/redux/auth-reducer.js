import firebase from 'firebase/compat/app';
import "firebase/compat/database";
import "firebase/compat/auth";

const SET_IS_AUTH = 'SET_IS_AUTH';
const SET_ENTER_EMAIL = 'SET_ENTER_EMAIL';
const SET_ENTER_PASSWORD = 'SET_ENTER_PASSWORD';
const SET_AUTH_IS_LOAD = 'SET_AUTH_IS_LOAD';
const SET_LOAD_AUTH = 'SET_LOAD_AUTH';

const initialState = {
	isAuth: false,
	enterEmail: '',
	enterPassword: '',
	authIsLoad: true,
	loadAuth: false
}

const authReducer = (state = initialState, action) => {
	switch(action.type){
		case SET_IS_AUTH:
			return{
				...state,
				isAuth: action.value
			}
		case SET_ENTER_EMAIL:
			return{
				...state,
				enterEmail: action.value
			}
		case SET_ENTER_PASSWORD:
			return{
				...state,
				enterPassword: action.value
			}
		case SET_AUTH_IS_LOAD:
			return{
				...state,
				authIsLoad: action.value
			}
		case SET_LOAD_AUTH:
			return{
				...state,
				loadAuth: action.value
			}
        default:
            return state;
    }
}

const setIsAuth = (value) => {
	return{
		type: SET_IS_AUTH,
		value
	}
}
const setEnterEmail = (value) => {
	return{
		type: SET_ENTER_EMAIL,
		value
	}
}
const setEnterPassword = (value) => {
	return{
		type: SET_ENTER_PASSWORD,
		value
	}
}
const setAuthIsLoad = (value) => {
	return{
		type: SET_AUTH_IS_LOAD,
		value
	}
}
const setLoadAuth = (value) => {
	return{
		type: SET_LOAD_AUTH,
		value
	}
}

// Изменение данных
export const setData = (value, id) => (dispatch) => {
	switch(id){
		case 'enterEmail':
			dispatch(setEnterEmail(value));
			break;
		case 'enterPassword':
			dispatch(setEnterPassword(value));
			break;
		default:
			break;
	}
}

// Проверка автоизации пользователя
export const authStateListener = () => async (dispatch) => {
	await firebase.auth().onAuthStateChanged((user) => {
		dispatch(setAuthIsLoad(false));
		if(user){
			dispatch(setIsAuth(true));
		}
		else{
			dispatch(setIsAuth(false));
		}
	});
}

// Выход с аккаунт
export const quit = () => async (dispatch) => {
	await firebase.auth().signOut().then(() => {
	    dispatch(setIsAuth(false));
	}).catch((error) => {
	    console.log(error.code);
	});
}

// Вход в аккаунт
export const enter = (email, password) => async (dispatch) => {
	dispatch(setLoadAuth(true));
	await firebase.auth().signInWithEmailAndPassword(email, password).then((data) => {
		dispatch(setLoadAuth(false));
	    dispatch(setIsAuth(true));
	}).catch((error) => {
		dispatch(setLoadAuth(false));
	    console.log(error.code);
	});
}

export default authReducer;