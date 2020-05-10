import React, {Component} from "react";
import { connect } from 'react-redux';
import Order from '../../components/Order/Order';
import axios from '../../adapter/axios-orders';
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/WithErrorHandler/WithErrorHandler";
import * as actions from '../../store/actions';

class Orders extends Component {

	componentDidMount = async () => {
		this.props.fetchOrders(this.props.token);
	};

	render() {
		let orders = <p> No Orders yet. Please order something</p>;
		if(this.props.loading) {
			orders = <Spinner />;
		}
		if(this.props.orders && this.props.orders.length > 0) {
			orders = this.props.orders.map(order =>
				<Order
					key={order.id}
					ingredients={order.ingredients}
					price={order.price} />);
		}
		return (
			<div>
				{orders}
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		orders: state.order.orders,
		loading: state.order.loading,
		token: state.auth.token
	}
};
const mapDispatchToProps = dispatch => {
	return {
		fetchOrders: (token) => dispatch(actions.fetchOrders(token))
	}
};
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));