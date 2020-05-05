import React, {Component} from 'react';

import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import WithErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';
import axios from '../../axios';

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
	buttonClicked = () => {
		console.log('button clicked');
	};
	purchaseContinueHandler = async () => {
		this.setState({ loading: true });
		try {
			const order = {
				ingredients: this.state.ingredients,
				price: this.state.totalPrice,
				customer: {
					name: 'Sai Teja Malladi',
					address: {
						'street': 'Satya Deva Nagar',
						'city': 'Annavaram',
						'pincode': "533406"
					},
					email: 'saiteja.malladi@gmail.com'
				},
				deliveryMethod: 'fastest'
			};
			this.setState({ loading: true });
			await axios.post('/orders.json', order);
			this.setState({ loading: false });
			this.setState({purchasing: false});
		} catch (error) {
			this.setState({ loading: false });
			console.log('Unable to post the request');
		}
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
				       modelClosed={this.cancelPurchaseHandler}
				       selected={this.buttonClicked}>
					{orderSummary}
				</Modal>
			</Aux>
		)
	}
}

export default WithErrorHandler(BurgerBuilder, axios);