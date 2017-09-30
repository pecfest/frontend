import React, { Component } from 'react';
import user from './user';

import './SignUpForm.css';

export default class LoginForm extends Component {
	state = {
		pecfestId: '',
		error: false,
		loggingin: false,
		done: false,
	}

	handleChange = ({ target }) => {
		this.setState({ pecfestId: target.value, error: false });
	}

	handleFailed = (pecfestId) => {
		this.setState({ error: true, loggingin: false });
	}

	handleSuccess = (pecfestId) => {
		this.setState({ error: false, loggingin: false, done: true })
		setTimeout(this.props.onLogin, 1000);
	}

	handleClick = () => {
		user.login(this.state.pecfestId, {
			onSuccess: this.handleSuccess,
			onFailed: this.handleFailed
		});

		this.setState({ loggingin: true })
	}

	componentDidMount() {
		this.inputElement.focus();
	}

	render() {
		const style = {};

		if (this.state.error) {
			style.color = 'red';
		}

		return (
			<div className="SignUpForm-wrapper">
				<div className="SignUpForm">
					<div className="SignUpForm-title">
						<h1 style={{fontSize: '3.2em'}}>Login</h1>
					</div>

					{
						this.state.done ? <h1 style={{ fontSize: '3.2em' }}>Successfully logged in.</h1> :
							<div className="SignUpForm-steps">
								<div className="SignUpElement">
									<input
										ref={input => this.inputElement = input}
										className="SignUpInput"
										type="text"
										style={style}
										onChange={this.handleChange} />
								</div>
								<div className="SignUpElement">
									<button
										disabled={this.state.loggingin || this.state.error}
										onClick={this.handleClick}
										className="SignUpNextButton">
										Login
									</button>
								</div>
							</div>

					}
				</div>
			</div>
		)
	}
}