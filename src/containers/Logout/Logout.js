import React from "react";
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';

const logout = (props) => {
	props.onLogout();
	return (
		<div>
			<Redirect path={"/"} />
		</div>
	)
};

const mapDispatchToProps = dispatch => {
	return {
		onLogout: () => dispatch(actions.logout())
	}
};

export default connect(null, mapDispatchToProps)(logout);