import React, {Component} from 'react';

import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import WithErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';
import axios from '../../axios-orders';

const INGREDIENT_PRICES = {
	meat: 1.30,
	cheese: 0.7,
	bacon: 0.8,
	salad: 1.1
};
class BurgerBuilder extends Component {
	state = {
		ingredients: null,
		totalPrice: 0,
		purchasable: false,
		purchasing: false,
		loading: false,
		error: false
	};

	componentDidMount = async () => {
		try {
			let response = await axios.get('/ingredients.json');
			this.setState({ingredients: response.data});
		} catch (error) {
			this.setState({error: error});
		}
	};

	addIngredientHandler = (type) => {
		const oldCount = this.state.ingredients[type];
		const newCount = oldCount + 1;
		const updatedIngredients = {
			...this.state.ingredients
		};
		updatedIngredients[type] = newCount;
		const oldPrice = this.state.totalPrice;
		const newPrice = oldPrice + INGREDIENT_PRICES[type];
		let purchasable = this.updatePurchasableFlag(updatedIngredients);
		this.setState({
			totalPrice: newPrice,
			ingredients: updatedIngredients,
			purchasable: purchasable
		});

	};
	removeIngredientHandler = (type) => {
		const oldCount = this.state.ingredients[type];
		if(oldCount > 0) {
			const newCount = oldCount - 1;
			const updatedIngredients = {
				...this.state.ingredients
			};
			updatedIngredients[type] = newCount;
			const oldPrice = this.state.totalPrice;
			const newPrice = oldPrice - INGREDIENT_PRICES[type];
			let purchasable = this.updatePurchasableFlag(updatedIngredients);
			this.setState({
				totalPrice: newPrice,
				ingredients: updatedIngredients,
				purchasable: purchasable
			});
		}
	};
	updatePurchasableFlag(ingredients) {
		let totalItems = Object.keys(ingredients)
			.map(igKey => ingredients[igKey])
			.reduce((sum, item) => sum + item );
		return totalItems > 0;
	}
	purchaseHandler = () => {
		this.setState({purchasing: true});
	};
	cancelPurchaseHandler = () => {
		this.setState({purchasing: false});
	};

	purchaseContinueHandler = () => {
		const queryParams = [];
		for(let key in this.state.ingredients) {
			queryParams.push(encodeURIComponent(key) + '=' + encodeURIComponent(this.state.ingredients[key]));
		}
		queryParams.push(encodeURIComponent('price') + '=' + encodeURIComponent(this.state.totalPrice));
		let queryString=queryParams.join('&');
		this.props.history.push({
			pathname: 'checkout',
			search: '?' + queryString
		});

	};
	purchaseCancelHandler = () => {
		this.setState({purchasing: false});
	};

	render () {
		let disabledInfo = {
			...this.state.ingredients
		};
		for(let key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0;
		}
		let orderSummary = null;
		if(this.state.loading) {
			orderSummary = <Spinner/>;
		}
		let burger = <Spinner/>;
		if(this.state.error) {
			burger =<p>Ingredients can`t be added</p>;
		}
		if(this.state.ingredients) {
			burger =
				<Aux>
					<Burger	ingredients={this.state.ingredients}/>
					<BuildControls
						price={this.state.totalPrice}
						ingredientAdded={this.addIngredientHandler}
						ingredientRemoved={this.removeIngredientHandler}
						disabledInfo={disabledInfo}
						purchasable={this.state.purchasable}
						purchasing={this.purchaseHandler}
						/>
				</Aux>;
			orderSummary = <OrderSummary
				ingredients={this.state.ingredients}
				purchaseContinued={this.purchaseContinueHandler}
				purchaseCancelled={this.purchaseCancelHandler}
				price={this.state.totalPrice}
			/>;
		}

		return (
			<Aux>
				{burger}
				<Modal show={this.state.purchasing}
				       modelClosed={this.cancelPurchaseHandler}>
					{orderSummary}
				</Modal>
			</Aux>
		)
	}
}

export default WithErrorHandler(BurgerBuilder, axios);