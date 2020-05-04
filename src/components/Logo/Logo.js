import React from "react";

import logoSrc from '../../assets/images/burger-logo.png';
import classes from './Logo.module.css';

const logo = (props) => (
	<div className={classes.Logo}>
		<img src={logoSrc} alt='MyBurger' />
	</div>
);

export default logo;