import * as actionTypes from '../actions/actionTypes';
import {updatedObj} from "../Utility";

const initialState = {
	orders: [],
	loading: false,
	purchased: false,
};

const purchaseBurgerStart = (state, action) => {
	return updatedObj(state, {loading: true, purchased: false});
};
const purchaseBurgerSuccess = (state, action) => {
	return updatedObj(state, {loading: false, purchased: true});
};
const purchaseBurgerFailed = (state, action) => {
	return updatedObj(state, {loading: false});
};
const fetchOrdersStart = (state, action) => {
	return updatedObj(state, {loading: true});
};
const fetchOrdersSuccess = (state, action) => {
	return updatedObj(state, {loading: false, orders: action.orders});
};
const fetchOrdersFailed = (state, action) => {
	return updatedObj(state, {loading: false});
};
const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.PURCHASE_BURGER_START: return purchaseBurgerStart(state, action);
		case actionTypes.PURCHASE_BURGER_SUCCESS: return purchaseBurgerSuccess(state, action);
		case actionTypes.PURCHASE_BURGER_FAILED: return purchaseBurgerFailed(state, action);
		case actionTypes.FETCH_ORDERS_START: return fetchOrdersStart(state, action);
		case actionTypes.FETCH_ORDERS_SUCCESS: return fetchOrdersSuccess(state, action);
		case actionTypes.FETCH_ORDERS_FAILED: return fetchOrdersFailed(state, action);
		default:
			return state;
	}
};

export default reducer;