import * as actionTypes from '../actions/actionTypes';
import { updatedObj } from  '../../shared/Utility';

const initialState = {
	userId: null,
	token: null,
	expiresIn: null,
	error: null,
	loading: false
};

const authStart = (state, action) =>  {
	return updatedObj(state, {
		loading: true
	});
};
const authSuccess = (state, action) =>  {
	return updatedObj(state, {
		loading: false,
	  token: action.token,
		userId: action.userId,
		expiresIn: action.expiresIn
	})
};
const authFail = (state, action) =>  {
	return updatedObj(state, {
		loading: false,
		error: action.error
	});
};
const authLogout = (state, action) =>  {
	return updatedObj(state, {
		loading: false,
		token: null,
		userId: null,
		expiresIn: 0
	});
};

const reducer = (state = initialState, action ) => {
	switch (action.type) {
		case actionTypes.AUTH_START: return authStart(state, action);
		case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
		case actionTypes.AUTH_FAIL: return authFail(state, action);
		case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
		default: return state;
	}
};

export default reducer;