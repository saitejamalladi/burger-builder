import React, {Component} from "react";

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/WithErrorHandler/WithErrorHandler";

class Orders extends Component {

	state = {
		orders: null,
		loading: true
	};

	componentDidMount = async () => {
		try {
			let response = await axios.get('/orders.json');
			const fetchedOrders = [];
			for (let key in response.data) {
				fetchedOrders.push({
					...response.data[key],
					id: key
				});
			}
			this.setState({loading: false, orders: fetchedOrders});
		} catch (error) {
			this.setState({error: error.message});
		}
	};

	render() {
		let orders = null;
		if(this.state.loading) {
			orders = <Spinner />;
		}
		if(this.state.orders) {
			orders = this.state.orders.map(order =>
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

export default withErrorHandler(Orders, axios);