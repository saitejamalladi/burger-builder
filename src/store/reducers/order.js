import * as actionTypes from '../actions/actionTypes';

const initialState = {
	orders: [],
	error: null,
	loading: false,
	purchased: false,
};

const order = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.PURCHASE_BURGER_START:
			return {
				...state,
				loading: true,
				purchased: false
			};
		case actionTypes.PURCHASE_BURGER_SUCCESS:
			return {
				...state,
				loading: false,
				purchased: true
			};
		case actionTypes.PURCHASE_BURGER_FAILED:
			return {
				...state,
				loading: false
			};
		case actionTypes.FETCH_ORDERS_START:
			return {
				...state,
				loading: true
			};
		case actionTypes.FETCH_ORDERS_SUCCESS:
			return {
				...state,
				loading: false,
				orders: action.orders
			};
		case actionTypes.FETCH_ORDERS_FAILED:
			return {
				...state,
				loading: false,
				error: action.error
			};
		default:
			return state;
	}
};

export default order;