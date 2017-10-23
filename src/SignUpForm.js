import React, { Component } from 'react';
import { Motion, spring } from 'react-motion';
import user from './user';

import './SignUpForm.css';

class ControlButtons extends Component {
	render() {
		return (
			<div className="Control-buttons">
				<button type="submit" disabled={this.props.disabled} className="SignUpNextButton">
				{ 'Next' }
				</button>
			</div>
		)
	}
}

class GetName extends Component {
	state = {
		name: '',
	}

	handleNext = () => {
 		this.props.done({ name: this.state.name });
	}

	isValid() {
		return this.state.name.length > 2;
	}

	handleChange = ({ target }) => {
		this.setState({ name: target.value });
	}

	get() {
		return this.state.name;
	}

	render() {
		return (
			<div className="SignUpElement">
				<p className="SignUpElement-description">
					Your name (will appear on your certificates)
				</p>
				<input type="text" name="name" onBlur={this.handleNext} id="username" placeholder={"your name"} onChange={this.handleChange} className="SignUpInput" />
			</div>
		)
	}
}

class GetNumber extends Component {
	state = {
		mobile: '',
		error: true,
	}

	get() {
		return this.state.mobile;
	}

	handleNext = ({ target }) => {
		this.setState({ error: !target.value.match(/[0-9]{10,10}/) })
 		this.props.done({ mobile: this.state.mobile });
	}

	isValid() {
		return !this.state.error;
	}

	handleChange = ({ target }) => {
		this.setState({ mobile: target.value,});
	}

	render() {
		return (
			<div className="SignUpElement">
				<p className="SignUpElement-description">
				Your mobile number (in 10 digits)
				</p>
				<input type="text" name="mobile" onBlur={this.handleNext} placeholder={"9876543210"} className="SignUpInput" onChange={this.handleChange} />
			</div>
		)
	}
}

class GetCollege extends Component {
	state = {
		college: '',
	}

	handleNext = () => {
 		this.props.done({ college: this.state.college });
	}

	get() {
		return this.state.college;
	}

	isValid() {
		return this.state.college.length !== 0;
	}

	handleChange = ({ target }) => {
		this.setState({ college: target.value });
	}

	render() {
		return (
			<div className="SignUpElement">
				<p className="SignUpElement-description">
					Your college (will appear on certificates)
				</p>
				<input type="text" name="college" onBlur={this.handleNext} placeholder={"Some awesome college"} className="SignUpInput" onChange={this.handleChange} />
			</div>
		)
	}
}

const emailre = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

class GetEmail extends Component {
	state = {
		email: '',
		error: true,
	}

	get() {
		return this.state.email;
	}

	handleNext = ({ target }) => {
		this.setState({ error: !target.value.match(emailre)})
 		this.props.done({ email: this.state.email });
	}

	isValid() {
		return !this.state.error;
	}

	handleChange = ({ target }) => {
		this.setState({ email: target.value });
	}

	render() {
		return (
			<div className="SignUpElement">
				<p className="SignUpElement-description">
					Your Email ID
				</p>
				<input type="email"
					name="email"
					placeholder="example@example.com"
					className="SignUpInput"
					onChange={this.handleChange}
					onBlur={this.handleNext}
					/>
			</div>
		)
	}
}

class GetGender extends Component {
	render() {
		return (
			<div className="SignUpElement">
				<p className="SignUpElement-description">
				What is your gender?
				</p>
				<select name="gender" className="SignUpElement-select" onChange={this.props.onChange}>
					<option value="Male">Male</option>
					<option value="Female">Female</option>
					<option value="Other">Other</option>
				</select>
			</div>
		)
	}
}

class GetAccomodationDetails extends Component {
	render() {
		return (
			<div className="SignUpElement" style={{ marginTop: '2em'}}>
				<input type="checkbox" name="accomodation" className="SignUpElement-checkbox" onChange={this.props.done} />
				<label htmlFor="accomodation" className="SignUpElement-description">Do you need accomodation?</label>
			</div>
		)
	}
}

class VerifyMobileNumber extends Component {
	state = {
		otp: '',
		disabled: false,
		checking: false,
	}

	handleFailed = (err) => {
		console.log(err);

		this.setState({
			checking: false,
			error: true,
			message: err.message,
		})
	}

	handleNext = () => {
		user.verifyOtp(this.state.otp, this.props.mobile, { onSuccess: (id) => this.props.done(id), onFailed: this.handleFailed });
		this.setState({ checking: true });
	}

	handleChange = ({ target }) => {
		this.setState({ otp: target.value, error: false });
	}

	render() {
		return (
			<div className="SignUpElement">
				<div className="SignUpElement-description">
					<p>OTP has been sent to your mobile.</p>
				</div>
				<input type="text"
					disabled={this.state.checking}
					placeholder="Enter OTP"
					className="SignUpInput"
					onChange={this.handleChange}
					/>

				<div className="Control-buttons">
					<button onClick={this.handleNext} disabled={!this.state.otp.length} className="SignUpNextButton">
					{ 'Next' }
					</button>
					{
						this.state.error ? <p className="SignUpForm-ErrorMessage">{this.state.message}</p> : ""
					}
				</div>
			</div>
		)
	}
}

class FinalStep extends Component {
	render() {
		return (
			<div className="FinalStep">
				<p className="SignUpForm-description">
					Your PECFEST ID is <span className="pecfestId">{this.props.pecfestId}</span>
					<br />
					Now you can login and start registering for events.
				</p>
				<div className="Control-buttons">
					<button className="SignUpNextButton" onClick={() => this.props.done(this.props.pecfestId)}>
						Continue
					</button>
				</div>
			</div>
		)
	}
}


class SignUpSteps extends Component {
	state = {
		done: false,
		submitting: false,
		disabled: true,
		gender: "Male",
		accomodation: 0,
	}

	handleDone = (prop) => {
		const user = Object.assign({}, this.state.user, prop);
		this.setState({ user, disabled: false });
	}

	handleSubmit = event => {
		event.preventDefault();

		const errors = [];
		if (!this.refs.name.isValid()) {
			errors.push('Name');
		}

		if (!this.refs.email.isValid()) {
			errors.push('Email')
		}

		if (!this.refs.mobile.isValid()) {
			errors.push('Mobile')
		}

		if (!this.refs.college.isValid()) {
			errors.push('College');
		}

		if (errors.length > 0) {
			const message = errors.join(', ') + (errors.length == 1 ? ' is ' : ' are ') + 'invalid.'
			this.setState({ disabled: true, error: true, message: message });
			return;
		}

		const newUser = {
			name: this.refs.name.get(),
			email: this.refs.email.get(),
			mobile: this.refs.mobile.get(),
			college: this.refs.college.get(),
			accomodation: this.state.accomodation,
			gender: this.state.gender
		}

		this.setState({ user: newUser } );


		user.signUp(newUser, {
			onSuccess: (res) => {
				this.setState({ submitting: false, otp: true, pecfestId: res.pecfestId });
			},
			onFailed: (err) => {
				if (typeof err.ACK !== 'undefined') {
					if (err.ACK === 'ALREADY') {
						this.setState({ message: 'Account already exists. Verifying...' })
						user.checkVerified(this.state.user.mobile, {
							onSuccess: verified => {
								console.log(verified);
								if (verified) {
									// send user to the login page
									this.props.onContinueToLogin()
								} else {
									this.setState({ submitting: false, otp: true })
								}
							},
							onFailed: (err) => {
								this.setState({ submitting: false, error: true, message: 'Unknown error occurred' });
							}
						})
					}
				}
				this.setState({ submitting: false, error: true,  disabled: true, message: err.message || 'Some unknown error has occurred.'})
			}
		});

		this.setState({ submitting: true, submitMessage: 'Verifying account...' });
	}


	handleAccomo = ({ target }) => {
		const user = { accomodation: target.checked - 0 };
		this.setState({ accomodation: user.accomodation, disabled: false })
	}


	handleChange = event => {
		this.setState({ gender: event.target.value, disabled: false })
	}

	handleId = id => {
		this.props.onSignUp(id);
	}

	renderLoadingOrOtp() {
		if (this.state.submitting) {
			return (
				<div className="SignUpForm-submitting">
					<p className="SignUpForm-otp-message">{this.state.submitMessage}</p>
				</div>
			);
		}

		// if (this.state.done) {
			return (
				<FinalStep pecfestId={this.state.pecfestId} done={this.props.onSignUp} />
			)
		// }
	}

	render() {
		console.log(this.state);
		return (
			<div className="SignUpForm-steps">
				{
					this.state.submitting || this.state.otp || this.state.done ?
						this.renderLoadingOrOtp() :
						<form autoComplete='off' onSubmit={this.handleSubmit} className="SignUpSteps">
							{ this.state.error ? <p className="SignUpForm-ErrorMessage">{this.state.message}</p> : ""}
							<GetName ref="name" done={this.handleDone} />
							<GetEmail ref="email" done={this.handleDone} />
							<GetNumber ref="mobile" done={this.handleDone} />
							<GetCollege ref="college" done={this.handleDone} />
							<GetGender ref="gender" onChange={this.handleChange} />
							<GetAccomodationDetails ref="accomodation" done={this.handleAccomo} />
							<br />
							<ControlButtons disabled={this.state.disabled} />
						</form>
				}
			</div>
		)
	}
}

export default class SignUpForm extends Component {
	render() {
		return (
			<div className="SignUpForm-wrapper">
				<div className="SignUpForm">
					<div className="SignUpForm-title">
						<h1 style={{fontSize: '3.2em'}}>Sign Up</h1>
					</div>
					<SignUpSteps onSignUp={this.props.onSignUp} onContinueToLogin={this.props.onContinueToLogin} />
				</div>
			</div>
		)
	}
}
