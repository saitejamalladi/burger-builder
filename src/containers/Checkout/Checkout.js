import React, { Component } from "react";
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {

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
					ingredients={this.props.ings}
					checkoutContinued={this.continueCheckoutHandler}
					checkoutCancelled={this.cancelCheckoutHandler}
				/>
				<Route
					path={this.props.match.url + '/contact-data'}
					render={(props) => (
						<ContactData
							ingredients={this.props.ings}
							price={this.props.price}
							{...props} />)} />
			</div>
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
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
