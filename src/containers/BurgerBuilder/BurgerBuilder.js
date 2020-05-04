import React, {Component} from 'react';

import Aux from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";

const INGREDIENT_PRICES = {
	meat: 1.30,
	cheese: 0.7,
	bacon: 0.8,
	salad: 1.1
};
class BurgerBuilder extends Component {
	state = {
		ingredients: {
			meat: 0,
			cheese: 0,
			bacon: 0,
			salad: 0
		},
		totalPrice: 0,
		purchasable: false,
		purchasing: false
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
	buttonClicked = () => {
		console.log('button clicked');
	};
	purchaseContinueHandler = () => {
		alert('Continue Purchase');
	};
	purchaseCancelHandler = () => {
		alert('Cancel Purchase');
	};

	render () {
		let disabledInfo = {
			...this.state.ingredients
		};
		for(let key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0;
		}
		return (
			<Aux>
				<Burger	ingredients={this.state.ingredients}/>
				<Modal show={this.state.purchasing}
				       modelClosed={this.cancelPurchaseHandler}
				       selected={this.buttonClicked}>
					<OrderSummary
						ingredients={this.state.ingredients}
						purchaseContinued={this.purchaseContinueHandler}
						purchaseCancelled={this.purchaseCancelHandler}
						price={this.state.totalPrice}
					/>
				</Modal>
				<BuildControls
					price={this.state.totalPrice}
					ingredientAdded={this.addIngredientHandler}
					ingredientRemoved={this.removeIngredientHandler}
					disabledInfo={disabledInfo}
					purchasable={this.state.purchasable}
					purchasing={this.purchaseHandler}
				/>
			</Aux>
		)
	}
}

export default BurgerBuilder;