import {authStateListener} from './auth-reducer.js';
import {initData, initArticles, initTovars, initFilters} from './data-reducer.js';
import {initOrders} from './admin-reducer.js';

const SET_INIT_APP = 'SET_INIT_APP';

const initialState = {
	initApp: false
}

const appReducer = (state = initialState, action) => {
	switch(action.type){
		case SET_INIT_APP:
			return{
				...state,
				initApp: action.value
			}
        default:
            return state;
    }
}

const setInitApp = (value) => {
	return{
		type: SET_INIT_APP,
		value
	}
}

// Инициализация приложения
export const initializedApp = () => (dispatch) => {
	let auth = dispatch(authStateListener());
	let dataInit = dispatch(initData());
	let articlesInit = dispatch(initArticles());
	let tovarsInit = dispatch(initTovars());
	let ordersInit = dispatch(initOrders());
	let filtersInit = dispatch(initFilters());

    Promise.all([auth, dataInit, articlesInit, tovarsInit, ordersInit, filtersInit]).then(() => {
        dispatch(setInitApp(true));
    });
}

export default appReducer;