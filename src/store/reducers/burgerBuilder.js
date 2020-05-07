import * as actionTypes from '../actions/actionTypes';

const INGREDIENT_PRICES = {
	meat: 1.30,
	cheese: 0.7,
	bacon: 0.8,
	salad: 1.1
};
const initialState = {
	ingredients: null,
	price: 4,
	error: false
};

const burgerBuilder = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.INIT_INGREDIENTS:
			return {
				...state,
				ingredients: action.ingredients,
				price: 4
			};
		case actionTypes.FETCH_INGREDIENTS_FAILED:
			return {
				...state,
				error: true
			};
		case actionTypes.ADD_INGREDIENTS:
			return {
				...state,
				ingredients: {
					...state.ingredients,
					[action.ingredientName]: state.ingredients[action.ingredientName] + 1
				},
				price: state.price + INGREDIENT_PRICES[action.ingredientName]
			};		case actionTypes.REMOVE_INGREDIENTS:
			return {
				...state,
				ingredients: {
					...state.ingredients,
						[action.ingredientName]: state.ingredients[action.ingredientName] - 1
				},
				price: state.price - INGREDIENT_PRICES[action.ingredientName]
			};
		default:
			return state;
	}
};

export default burgerBuilder;