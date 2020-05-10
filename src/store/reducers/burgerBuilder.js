import * as actionTypes from '../actions/actionTypes';
import { updatedObj } from '../../shared/Utility';
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

const addIngredient = ( state, action ) => {
	const updatedIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 }
	const updatedIngredients = updatedObj( state.ingredients, updatedIngredient );
	const updatedState = {
		ingredients: updatedIngredients,
		price: state.price + INGREDIENT_PRICES[action.ingredientName]
	};
	return updatedObj( state, updatedState );
};

const removeIngredient = (state, action) => {
	const updatedIng = { [action.ingredientName]: state.ingredients[action.ingredientName] - 1 }
	const updatedIngs = updatedObj( state.ingredients, updatedIng );
	const updatedSt = {
		ingredients: updatedIngs,
		price: state.price - INGREDIENT_PRICES[action.ingredientName]
	};
	return updatedObj( state, updatedSt );
};

const setIngredients = (state, action) => {
	return updatedObj( state, {
		ingredients: {
			salad: action.ingredients.salad,
			bacon: action.ingredients.bacon,
			cheese: action.ingredients.cheese,
			meat: action.ingredients.meat
		},
		price: 4,
		error: false
	} );
};

const fetchIngredientsFailed = (state, action) => {
	return updatedObj( state, { error: true } );
};

const reducer = ( state = initialState, action ) => {
	switch ( action.type ) {
		case actionTypes.ADD_INGREDIENTS: return addIngredient( state, action );
		case actionTypes.REMOVE_INGREDIENTS: return removeIngredient(state, action);
		case actionTypes.INIT_INGREDIENTS: return setIngredients(state, action);
		case actionTypes.FETCH_INGREDIENTS_FAILED: return fetchIngredientsFailed(state, action);
		default: return state;
	}
};

export default reducer;