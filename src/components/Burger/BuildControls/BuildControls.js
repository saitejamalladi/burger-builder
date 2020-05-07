import React from 'react';

import BuildControl from './BuildControl/BuildControl';
import classes from './BuildControls.module.css';

const controls = [
	{label: 'Meat', type: 'meat'},
	{label: 'Salad', type: 'salad'},
	{label: 'Bacon', type: 'bacon'},
	{label: 'Cheese', type: 'cheese'}
];
const buildControls = (props) => (
	<div className={classes.BuildControls}>
		<p>Current Price: <strong>USD {props.price.toFixed(2)}</strong></p>
		{controls.map(ctrl =>
			<BuildControl
				key={ctrl.label}
				label={ctrl.label}
				added={() => props.ingredientAdded(ctrl.type)}
				removed={() => props.ingredientRemoved(ctrl.type)}
				disabled={props.disabledInfo[ctrl.type]}/>
		)}
		<button
			className={classes.OrderButton}
			disabled={!props.purchasable}
			onClick={props.purchasing}
		>ORDER NOW</button>
	</div>
);

export default buildControls;