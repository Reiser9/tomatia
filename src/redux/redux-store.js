import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {compose} from 'redux';

import authReducer from './auth-reducer.js';
import appReducer from './app-reducer.js';
import dataReducer from './data-reducer.js';
import adminReducer from './admin-reducer.js';

const redusers = combineReducers({
	app: appReducer,
	auth: authReducer,
	data: dataReducer,
	admin: adminReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(redusers, composeEnhancers(applyMiddleware(thunkMiddleware)));

export default store;