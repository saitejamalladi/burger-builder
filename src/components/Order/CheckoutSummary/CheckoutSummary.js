import React, {Component} from "react";

import Burger from '../../Burger/Burger';
import classes from './CheckoutSummary.module.css';
import Button from '../../UI/Button/Button';

class checkoutSummary extends Component {

	render () {
		let ingredients = this.props.ingredients;
		return (
			<div className={classes.CheckoutSummary}>
				<h1>We hope it tastes well</h1>
				<div style={{width: '100%', height: 'auto', margin: 'auto'}}>
					<Burger	ingredients={ingredients}/>
				</div>
				<Button btnType={'Danger'}
				        clicked={this.props.checkoutCancelled}>
					CANCEL
				</Button>
				<Button btnType={'Success'}
				        clicked={this.props.checkoutContinued}>
					CONTINUE
				</Button>
			</div>
		);
	}
}

export default checkoutSummary;