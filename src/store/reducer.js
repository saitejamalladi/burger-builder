import * as actions from './actions';


const INGREDIENT_PRICES = {
	meat: 1.30,
	cheese: 0.7,
	bacon: 0.8,
	salad: 1.1
};
const initialState = {
	ingredients: {
		salad: 0,
		bacon: 0,
		meat: 0,
		cheese: 0
	},
	price: 0
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actions.ADD_INGREDIENTS:
			return {
				...state,
				ingredients: {
					...state.ingredients,
					[action.ingType]: state.ingredients[action.ingType] + 1
				},
				price: state.price + INGREDIENT_PRICES[action.ingType]
			};
		case actions.REMOVE_INGREDIENTS:
			return {
				...state,
				ingredients: {
					...state.ingredients,
					[action.ingType]: state.ingredients[action.ingType] - 1
				},
				price: state.price + INGREDIENT_PRICES[action.ingType]
			};
		default:
			return state;
	}
};

export default reducer;