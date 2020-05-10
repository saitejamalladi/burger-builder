import React, {Component} from 'react';
import { connect } from 'react-redux';
import Aux from '../Auxiliary/Auxiliary';
import Toolbar from "../../components/UI/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/UI/Navigation/SideDrawer/SideDrawer";
import classes from './Layout.module.css';

class Layout extends Component {
	state = {
		showSideDrawer: false
	};

	sideDrawerClosedHandler = () => {
		this.setState( { showSideDrawer: false } );
	};

	sideDrawerToggleHandler = () => {
		this.setState( ( prevState ) => {
			return { showSideDrawer: !prevState.showSideDrawer };
		} );
	};

	render() {
		return (
			<Aux>
				<Toolbar
					auth={this.props.isAuthenticated}
					drawerToggleClicked={this.sideDrawerToggleHandler} />
				<SideDrawer
					auth={this.props.isAuthenticated}
					open={this.state.showSideDrawer}
					closed={this.sideDrawerClosedHandler} />
				<main className={classes.Content}>
					{this.props.children}
				</main>
			</Aux>
		);
	}
}
const mapStateToProps = state => {
	return {
		isAuthenticated: state.auth.token !== null
	}
};

export default connect(mapStateToProps, null)(Layout);