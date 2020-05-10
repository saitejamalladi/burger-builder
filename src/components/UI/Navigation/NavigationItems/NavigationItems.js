import React from "react";

import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.module.css';
const navigationItems = (props) => {
	return (
		<ul className ={classes.NavigationItems}>
			<NavigationItem link="/" exact active>Burger Builder</NavigationItem>
			{props.isAuthenticated ? <NavigationItem link={"/orders"}>Orders</NavigationItem> : null}
			{!props.isAuthenticated ? <NavigationItem link={"/auth"}>Authenticate</NavigationItem> : null}
			{props.isAuthenticated ? <NavigationItem link={"/logout"}>Logout</NavigationItem> : null}
		</ul>
	);
};
export default navigationItems;
