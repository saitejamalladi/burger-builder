import React, { Component } from 'react';
import { connect }from 'react-redux';

import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import WithErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';
import axios from '../../axios-orders';
import * as actions from '../../store/actions';

class BurgerBuilder extends Component {
	state = {
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

	updatePurchasableFlag(ingredients) {
		let totalItems = Object.keys(ingredients)
			.map(igKey => ingredients[igKey])
			.reduce((sum, item) => sum + item);
		return totalItems > 0;
	}

	purchaseHandler = () => {
		this.setState({purchasing: true});
	};
	cancelPurchaseHandler = () => {
		this.setState({purchasing: false});
	};

	purchaseContinueHandler = () => {
		this.props.history.push('/checkout');
	};
	purchaseCancelHandler = () => {
		this.setState({purchasing: false});
	};

	render() {
		let disabledInfo = {
			...this.props.ings
		};
		for (let key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0;
		}
		let orderSummary = null;
		if (this.state.loading) {
			orderSummary = <Spinner/>;
		}
		let burger = <Spinner/>;
		if (this.state.error) {
			burger = <p>Ingredients can`t be added</p>;
		}
		if (this.props.ings) {
			burger =
				<Aux>
					<Burger ingredients={this.props.ings}/>
					<BuildControls
						price={this.props.price}
						ingredientAdded={this.props.onAddIngredients}
						ingredientRemoved={this.props.onRemoveIngredients}
						disabledInfo={disabledInfo}
						purchasable={this.updatePurchasableFlag(this.props.ings)}
						purchasing={this.purchaseHandler}
					/>
				</Aux>;
			orderSummary = <OrderSummary
				ingredients={this.props.ings}
				purchaseContinued={this.purchaseContinueHandler}
				purchaseCancelled={this.purchaseCancelHandler}
				price={this.props.price}
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

const mapStateToProps = state => {
	return {
		ings: state.ingredients,
		price: state.price
	}
};
const mapDispatchToProps = dispatch => {
	return {
		onAddIngredients: (ingtype) => dispatch({type: actions.ADD_INGREDIENTS, ingType: ingtype}),
		onRemoveIngredients: (ingtype) => dispatch({type: actions.REMOVE_INGREDIENTS, ingType: ingtype})
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler(BurgerBuilder, axios));