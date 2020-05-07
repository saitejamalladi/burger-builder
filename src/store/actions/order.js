import * as actionTypes from '../actions/actionTypes';
import axios from "../../axios-orders";

const purchaseBurgerStart = () =>  {
	return {
		type: actionTypes.PURCHASE_BURGER_START
	}
};
const purchaseBurgerSuccess = () =>  {
	return {
		type: actionTypes.PURCHASE_BURGER_SUCCESS
	}
};
const purchaseBurgerFailed = () =>  {
	return {
		type: actionTypes.PURCHASE_BURGER_FAILED
	}
};
export const purchaseBurger = (order) => {
	return dispatch => {
		dispatch(purchaseBurgerStart());
		axios.post( '/orders.json', order )
			.then( response => {
				dispatch(purchaseBurgerSuccess());
			} )
			.catch( error => {
				dispatch(purchaseBurgerFailed());
			} );
	};
};

const fetchOrdersStart = () => {
	return {
		type: actionTypes.FETCH_ORDERS_START
	}
};

const fetchOrdersSuccess = (fetchedOrders) => {
	return {
		type: actionTypes.FETCH_ORDERS_SUCCESS,
		orders: fetchedOrders
	}
};

const fetchOrdersFailed = (error) => {
	return {
		type: actionTypes.FETCH_ORDERS_FAILED,
		error: error
	}
};

export const fetchOrders = () => {
	return async dispatch => {
		try {
			dispatch(fetchOrdersStart());
			let response = await axios.get('/orders.json');
			const fetchedOrders = [];
			for (let key in response.data) {
				fetchedOrders.push({
					...response.data[key],
					id: key
				});
			}
			dispatch(fetchOrdersSuccess(fetchedOrders));
		} catch (error) {
			dispatch(fetchOrdersFailed(error.message));
		}
	}
};