import React from 'react';
import { withRouter } from 'react-router-dom';

import BurgerIngredient from "./BurgerIngredients/BurgerIngredients";
import classes from './Burger.module.css';

const burger = (props) => {
	let transformedIngredients = Object.keys(props.ingredients)
		.map(igKey => {
			return [...Array(props.ingredients[igKey])].map((_, i) => {
				return <BurgerIngredient key={igKey+i} type={igKey} />
			})
		}).reduce((arr, val) => arr.concat(val));
	if(transformedIngredients.length <= 0) {
		transformedIngredients = 'Please add some ingredients';
	}
	return (
		<div className={classes.Burger}>
			<BurgerIngredient type="bread-top"/>
			{transformedIngredients}
			<BurgerIngredient type="bread-bottom"/>
		</div>
	)
};

export default withRouter(burger);