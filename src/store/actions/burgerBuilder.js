import * as actionTypes from './actionTypes';
import axios from "../../adapter/axios-orders";

export const addIngredients = (ingredientName) => {
	return  {
		type: actionTypes.ADD_INGREDIENTS,
		ingredientName: ingredientName
	}
};
export const removeIngredients = (ingredientName) => {
	return  {
		type: actionTypes.REMOVE_INGREDIENTS,
		ingredientName: ingredientName
	}
};
const setIngredients = (ingredients) => {
	return {
		type: actionTypes.INIT_INGREDIENTS,
		ingredients: ingredients
	}
};
const fetchIngredientsFailed = () => {
	return {
		type: actionTypes.FETCH_INGREDIENTS_FAILED
	}
};
export const initIngredients = () => {
	return dispatch => {
		axios.get('/ingredients.json')
		 .then(response => {
			 dispatch(setIngredients(response.data));
		 }).catch(error => {
		 dispatch(fetchIngredientsFailed());
		});
	};
};