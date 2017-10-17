import React, { Component } from 'react';
import Loader from './Loader';
import user from './user';

import './SignUpForm.css';

class ForgotIDForm extends Component {
	state = {
		status: '',
		email: '',
		done: false
	}

	handleSubmit = (event) => {
		event.stopPropagation();
		event.preventDefault();
		this.setState({ status: <Loader color="rgba(0, 0, 0, 0.5)" /> });
		user.sendIDToEmail(this.state.email, {
			onSuccess: (res) => {
				this.setState({status: res.message, done: true })
				setTimeout(this.props.onSuccess, 1000);
			},
			onFailed: (res) => {
				this.setState({ status: res.message })
			}
		})
	}

	handleChange = ({ target }) => {
		this.setState({ email: target.value })
	}

	render() {
		return (
			<form className="SignUpForm" onSubmit={this.handleSubmit}>
				<div className="SignUpElement">
					<p>Please enter your registered email ID.</p>
					<div className="StatusMessage">
						{this.state.status}
					</div>
					<input
						className="SignUpInput"
						type="email" name="email"
						placeholder="email"
						onChange={this.handleChange} />
				</div>
				<div className="SignUpElement">
					<input type="submit" value="Submit" className="SignUpNextButton" />
				</div>
			</form>
		)
	}
}

export default class LoginForm extends Component {
	state = {
		pecfestId: '',
		error: false,
		loggingin: false,
		done: false,
		forgot: false,
	}

	handleChange = ({ target }) => {
		this.setState({ pecfestId: target.value, error: false });
	}

	handleFailed = (pecfestId) => {
		this.setState({ error: true, loggingin: false });
	}

	handleSuccess = (pecfestId) => {
		this.setState({ error: false, loggingin: false, done: true })
		this.props.onLogin(pecfestId);
	}

	handleClick = () => {
		user.login(this.state.pecfestId, {
			onSuccess: this.handleSuccess,
			onFailed: this.handleFailed
		});

		this.setState({ loggingin: true })
	}

	handleOnForgotPassword = () => {
		this.setState({ forgot: true })
	}

	componentDidMount() {
		this.inputElement.focus();
	}

	render() {
		const style = {};

		if (this.state.error) {
			style.color = 'red';
		}

		if (this.state.forgot) {
			return <ForgotIDForm onSuccess={() => this.setState({ forgot: false })} />
		}

		return (
			<div className="SignUpForm-wrapper">
				<div className="SignUpForm">
					<div className="SignUpForm-title">
						<h1 style={{fontSize: '3.2em'}}>Your PECFEST ID</h1>
					</div>
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
						<br />
						<div className="SignUpElement-forgotpassword">
							<button
								onClick={this.handleOnForgotPassword}
								className="SignUpNextButton"
								style={{ fontSize: '1em' }}
								>
								Forgot ID?
							</button>
						</div>
					</div>
				</div>
			</div>
		)
	}
}