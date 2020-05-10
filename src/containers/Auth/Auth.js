import React, { Component } from "react";
import { connect } from 'react-redux';
import classes from './Auth.module.css';
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/Spinner/Spinner";
import * as actions from '../../store/actions';

class Auth extends Component {
	state = {
		orderForm: {
			email: {
				elementType: 'input',
				elementConfig: {
					type: 'email',
					placeholder: 'Your Email address'
				},
				value: '',
				validation: {
					required: true,
					isEmail: true
				},
				valid: false,
				touched: false
			},
			password: {
				elementType: 'input',
				elementConfig: {
					type: 'password',
					placeholder: 'Your Password'
				},
				value: '',
				validation: {
					required: true
				},
				valid: false,
				touched: false
			}
		},
		formIsValid: false,
		isSignUp: false,
	};

	inputChangedHandler = (event, inputIdentifier) => {
		const updatedOrderForm = {
			...this.state.orderForm
		};
		const updatedFormElement = {
			...updatedOrderForm[inputIdentifier]
		};
		updatedFormElement.value = event.target.value;
		updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
		updatedFormElement.touched = true;
		updatedOrderForm[inputIdentifier] = updatedFormElement;

		let formIsValid = true;
		for (let inputIdentifier in updatedOrderForm) {
			formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
		}
		this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
	};


	checkValidity(value, rules) {
		let isValid = true;
		if (!rules) {
			return true;
		}

		if (rules.required) {
			isValid = value.trim() !== '' && isValid;
		}

		if (rules.minLength) {
			isValid = value.length >= rules.minLength && isValid
		}

		if (rules.maxLength) {
			isValid = value.length <= rules.maxLength && isValid
		}

		if (rules.isEmail) {
			const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
			isValid = pattern.test(value) && isValid
		}

		return isValid;
	}

	onSubmitHandler = (event) =>  {
		event.preventDefault();
		this.props.onSubmit(this.state.orderForm.email.value, this.state.orderForm.password.value, this.state.isSignUp);
	};

	onSwitchHandler = () => {
		this.setState({
			isSignUp: !this.state.isSignUp
		})
	};

	render() {

		const formElementsArray = [];
		for (let key in this.state.orderForm) {
			formElementsArray.push({
				id: key,
				config: this.state.orderForm[key]
			});
		}
		let form = (
			<form onSubmit={this.onSubmitHandler}>
				{formElementsArray.map(formElement => (
					<Input
						key={formElement.id}
						elementType={formElement.config.elementType}
						elementConfig={formElement.config.elementConfig}
						value={formElement.config.value}
						invalid={!formElement.config.valid}
						shouldValidate={formElement.config.validation}
						touched={formElement.config.touched}
						changed={(event) => this.inputChangedHandler(event, formElement.id)} />
				))}
				<Button btnType="Success" disabled={!this.state.formIsValid}>SUBMIT</Button>
			</form>
		);
		if(this.props.loading) {
			form = <Spinner />
		}
		let errorMessage = this.props.error ? <p><strong>{this.props.error.message}</strong></p>: null;

		let switchButton = this.state.isSignUp ? <p>Switch To Login</p> : <p> Create an account ? </p>;
		return (
			<div className={classes.Auth}>
				{errorMessage}
				{form}
				<div onClick={this.onSwitchHandler}>
					{switchButton}
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		loading: state.auth.loading,
		error: state.auth.error
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onSubmit: (email, password, isSignUp) => dispatch(actions.submitAuth(email, password, isSignUp))
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);