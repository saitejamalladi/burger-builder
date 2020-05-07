import React, { Component } from "react";
import { Route, Redirect } from 'react-router-dom';
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
		let summary = <Redirect to="/" />;
		if(this.props.ings) {
			summary = (<div>
				<CheckoutSummary
					ingredients={this.props.ings}
					checkoutContinued={this.continueCheckoutHandler}
					checkoutCancelled={this.cancelCheckoutHandler}
				/>
				<Route
					path={this.props.match.url + '/contact-data'}
					render={(props) => (
						<ContactData {...props} />)} />
			</div>);
		}
		return summary;
	}
}

const mapStateToProps = state => {
	return {
		ings: state.burgerBuilder.ingredients,
		price: state.burgerBuilder.price
	}
};
const mapDispatchToProps = dispatch => {
	return {
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
