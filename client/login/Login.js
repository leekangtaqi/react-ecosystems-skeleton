import React from 'react';
import { connect } from 'react-redux';
import { login } from './login.actions';
import { routerActions } from 'react-router-redux';

@connect(
	(state, ownProps) => ({ 
		isAuthenticated: state.user && state.user.name || false, 
		redirect: ownProps.location.query.redirect || '/'
	}), 
	{ login, replace: routerActions.replace }
)
export default class Login extends React.Component {
	componentWillMount() {
		const { isAuthenticated, replace, redirect } = this.props
		if (isAuthenticated) {
			replace(redirect)
		}
	}

	componentWillReceiveProps(nextProps) {
		const { isAuthenticated, replace, redirect } = nextProps;
		const { isAuthenticated: wasAuthenticated } = this.props;
		if (!wasAuthenticated && isAuthenticated) {
			replace(redirect)
		}
	}

	onLogin = e => {
		e.preventDefault();
		this.props.login({
			name: this.refs.name.value,
			isAdmin: this.refs.admin.checked
		})
	}

	render(){
		return (
			<div>
				<h2>Enter your name</h2>
				<input type="text" ref="name" />
				<br/>
				{'Admin?'}
				<input type="checkbox" ref="admin" />
				<br/>
				<button onClick={this.onLogin}>Login</button>
			</div>
		)
	}
}