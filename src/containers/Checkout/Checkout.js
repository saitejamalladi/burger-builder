import React, { Component } from "react";
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {

	state = {
		ingredients: null,
		price: 0
	};
	componentWillMount() {
		const query = new URLSearchParams(this.props.location.search);
		let ingredients = {};
		let price = 0;
		for(let param of query.entries()) {
			if(param[0] === 'price') {
				price = +param[1]
			} else {
				ingredients[param[0]] = +param[1];
			}
		}
		this.setState({
			ingredients: ingredients,
			price: price
		});
	}

	continueCheckoutHandler = () => {
		this.props.history.replace(this.props.match.url + '/contact-data');
	};
	cancelCheckoutHandler = () => {
		this.props.history.replace('/');
	};
	render () {
		return (
			<div>
				<CheckoutSummary
					ingredients={this.state.ingredients}
					checkoutContinued={this.continueCheckoutHandler}
					checkoutCancelled={this.cancelCheckoutHandler}
				/>
				<Route
					path={this.props.match.url + '/contact-data'}
					render={(props) => (
						<ContactData
							ingredients={this.state.ingredients}
							price={this.state.price}
							{...props} />)} />
			</div>
		)
	}
}

export default Checkout;
