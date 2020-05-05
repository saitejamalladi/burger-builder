import React, {Component} from 'react';

import Modal from "../../components/UI/Modal/Modal";
import Aux from '../Auxiliary/Auxiliary';

const withErrorHandler = (WrappedComponent, axios) => {
	return class extends Component {
		state = {
			error: null
		};
		componentWillMount= () => {
			this.reqAxiosInterceptor = axios.interceptors.request.use(req => req, error => {
				this.setState({error: null});
			});
			this.resAxiosInterceptor = axios.interceptors.response.use(res => res, error => {
				this.setState({error: error});
			});
		};

		componentWillUnmount = () => {
			axios.interceptors.request.eject(this.reqAxiosInterceptor);
			axios.interceptors.response.eject(this.resAxiosInterceptor);
		};

		errorConfirmedHandler = () => {
			this.setState({error: null});
		};

		render () {

			return (
				<Aux>
					<Modal show={this.state.error} modelClosed={this.errorConfirmedHandler}>
						{this.state.error ? this.state.error.message : null}</Modal>
					<WrappedComponent {...this.props}/>
				</Aux>
			)
		}
	};
};

export default withErrorHandler;