import React, {Component} from 'react';

import classes from './ContactData.module.css';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import axios from '../../../axios-orders';

class ContactData extends Component {
	state = {
		name: '',
		email: '',
		address: {
			street: '',
			postalCode: ''
		},
		loading: false
	};

	orderHandler = async (event) => {
		event.preventDefault();
		this.setState({ loading: true });
		try {
			const order = {
				ingredients: this.props.ingredients,
				price: this.props.price,
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
		this.props.history.push('/');
	};
	render() {
		let form = <form>
			<input className={classes.Input} type="text" name="name" placeholder="Your name" />
			<input className={classes.Input} type="email" name="email" placeholder="Your email" />
			<input className={classes.Input} type="text" name="street" placeholder="street" />
			<input className={classes.Input} type="text" name="postalCode" placeholder="postal code" />
			<Button
				btnType={"Success"}
				clicked={this.orderHandler}
			>ORDER NOW
			</Button>
		</form>;
		if(this.state.loading) {
			form = <Spinner />
		}

		return (
			<div className={classes.ContactData}>
				<h4>Enter your contact details</h4>
				{form}
			</div>
		);
	}
}

export default ContactData;