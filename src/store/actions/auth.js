import * as actionTypes from '../actions/actionTypes';
import axios from 'axios';

let AUTH_KEY= 'AIzaSyA1qd-F5uyWFeVQ-maYT3Tadbzu1yRxf4Y';
const authStart = () => {
	return {
		type: actionTypes.AUTH_START
	}
};
const authSuccess = (token, userId, expiresIn) => {
	return {
		type: actionTypes.AUTH_SUCCESS,
		token: token,
		userId: userId,
		expiresIn: expiresIn
	}
};
const authFail = (error) => {
	return {
		type: actionTypes.AUTH_FAIL,
		error: error
	}
};

export const checkAuthTimeout = (expirationTime) => {
	return dispatch => {
		setTimeout(() => {
			dispatch(logout());
		}, expirationTime * 1000);
	};
};

export const submitAuth = (email, password, isSignup) =>  {
	return async dispatch => {
		dispatch(authStart());
		let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=';
		if(isSignup) {
			url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=';
		}
		try {
			let response = await axios.post(url + AUTH_KEY, {
				"email": email,
				"password": password,
				"returnSecureToken": true
			});
			const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
			localStorage.setItem('token', response.data.idToken);
			localStorage.setItem('expirationDate', expirationDate);
			localStorage.setItem('userId', response.data.localId);
			dispatch(authSuccess(response.data.idToken, response.data.localId, response.data.expiresIn));
			dispatch(checkAuthTimeout(response.data.expiresIn));

		} catch (error) {
			dispatch(authFail(error.response.data.error));
		}
	}
};
export const logout = () => {
	localStorage.removeItem('token');
	localStorage.removeItem('expirationDate');
	localStorage.removeItem('userId');
	return {
		type: actionTypes.AUTH_LOGOUT
	}
};

export const authCheckState = () => {
	return dispatch => {
		const token = localStorage.getItem('token');
		if (!token) {
			dispatch(logout());
		} else {
			const expirationDate = new Date(localStorage.getItem('expirationDate'));
			if (expirationDate <= new Date()) {
				dispatch(logout());
			} else {
				const userId = localStorage.getItem('userId');
				dispatch(authSuccess(token, userId));
				dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000 ));
			}
		}
	};
};