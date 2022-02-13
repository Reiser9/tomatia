import firebase from 'firebase/compat/app';
import "firebase/compat/database";

import {getTimeNormal, getTimeId} from './data-reducer.js';

const SET_ORDERS = 'SET_ORDERS';
const SET_ORDERS_IS_LOAD = 'SET_ORDERS_IS_LOAD';

const initialState = {
	orders: {},
	ordersIsLoad: true
}

const adminReducer = (state = initialState, action) => {
	switch(action.type){
		case SET_ORDERS:
			return{
				...state,
				orders: {...action.value}
			}
		case SET_ORDERS_IS_LOAD:
			return{
				...state,
				ordersIsLoad: action.value
			}
        default:
            return state;
    }
}

const setOrders = (value) => {
	return{
		type: SET_ORDERS,
		value
	}
}
const setOrdersIsLoad = (value) => {
	return{
		type: SET_ORDERS_IS_LOAD,
		value
	}
}

export const initOrders = () => async (dispatch) => {
	await firebase.database().ref('data/adminPage/orders').on('value', data => {
		dispatch(setOrdersIsLoad(false));
		dispatch(setOrders(data.val()));
	});
}

export const addOrder = (sum, items, email, name, surname, phone, address, code, comment) => async (dispatch) => {
	let id = getTimeId();
	let date = getTimeNormal();

	await firebase.database().ref('data/adminPage/orders/' + id).set({
		id,
		date,
		email,
		name,
		surname,
		phone,
		address,
		code,
		comment,
		sum,
		tovars: items
	});
}

export const deleteOrder = (id) => async (dispatch) => {
	await firebase.database().ref('data/adminPage/orders/' + id).set({});
}

export default adminReducer;