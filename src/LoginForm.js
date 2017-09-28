import React, { Component } from 'react';

import './SignUpForm.css';

export default class LoginForm extends Component {
	render() {
		return (
			<div className="SignUpForm-wrapper">
				<div className="SignUpForm">
					<div className="SignUpForm-title">
						<h1 style={{fontSize: '3.2em'}}>Log In</h1>
					</div>
					<div className="SignUpForm-steps">
						<div className="SignUpElement">
							<input placeholder={'Your PECFEST ID'} className="SignUpInput" type="text" onChange={this.handleChange} />
						</div>
						<div className="SignUpElement">
							<button onClick={this.handleClick} className="SignUpNextButton">
								Login
							</button>
						</div>
					</div>
				</div>
			</div>
		)
	}
}