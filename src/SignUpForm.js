import React, { Component } from 'react';
import { Motion, spring } from 'react-motion';

import './SignUpForm.css';

class ControlButtons extends Component {
	render() {
		return (
			<div className="Control-buttons">
				<button disabled={this.props.disabled} onClick={this.props.onNext} className="SignUpNextButton">
				{ 'Next' }
				</button>
			</div>
		)
	}
}

class GetName extends Component {
	state = {
		name: '',
		disabled: true,
	}

	handleNext = () => {
 		this.props.done({ name: this.state.name });
	}

	handleChange = ({ target }) => {
		this.setState({ name: target.value, disabled: target.value.length < 4 });
	}

	render() {
		return (
			<div className="SignUpElement">
				<input type="text" id="username" placeholder={"Your name"} onChange={this.handleChange} className="SignUpInput" />
				<ControlButtons onNext={this.handleNext} disabled={this.state.disabled} />
			</div>
		)
	}
}

class GetNumber extends Component {
	state = {
		mobile: '',
		disabled: true,
	}

	handleNext = () => {
 		this.props.done({ mobile: this.state.mobile });
	}

	handleChange = ({ target }) => {
		this.setState({ mobile: target.value, disabled: !target.value.match(/[0-9]{10,10}/) });
	}

	render() {
		return (
			<div className="SignUpElement">
				<input type="text" placeholder={"Your phone number"} className="SignUpInput" onChange={this.handleChange} />
				<ControlButtons onNext={this.handleNext} disabled={this.state.value} />
			</div>
		)
	}
}

class GetCollege extends Component {
	state = {
		college: '',
		disabled: true,
	}

	handleNext = () => {
 		this.props.done({ college: this.state.college });
	}

	handleChange = ({ target }) => {
		this.setState({ college: target.value, disabled: target.value.length < 3 });
	}

	render() {
		return (
			<div className="SignUpElement">
				<input type="text" placeholder={"Your college"} className="SignUpInput" onChange={this.handleChange} />
				<ControlButtons onNext={this.handleNext} disabled={this.state.disabled} />
			</div>
		)
	}
}

const emailre = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

class GetEmail extends Component {
	state = {
		email: '',
		disabled: true,
	}

	handleNext = () => {
 		this.props.done({ email: this.state.email });
	}

	handleChange = ({ target }) => {
		this.setState({ email: target.value, disabled: !target.value.match(emailre) });
	}

	render() {
		return (
			<div className="SignUpElement">
				<input type="text"
					placeholder="Email"
					className="SignUpInput"
					onChange={this.handleChange}
					/>
				<ControlButtons onNext={this.handleNext} disabled={this.state.disabled} />
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

	handleNext = () => {
		setTimeout(() => this.props.done(true), 2000);
		this.setState({ checking: true });
	}

	handleChange = ({ target }) => {
		this.setState({ mobile: target.value, disabled: !target.value.match(emailre) });
	}

	render() {
		return (
			<div className="SignUpElement">
				<input type="text"
					disabled={this.state.checking}
					placeholder="Enter OTP"
					className="SignUpInput"
					onChange={this.handleChange}
					/>
				<ControlButtons onNext={this.handleNext} />
			</div>
		)
	}
}

class FinalStep extends Component {
	render() {
		return (
			<div className="FinalStep">
				Great, Your PECFEST ID is <span className="pecfestId">{this.props.pecfestId}</span>
			</div>
		)
	}
}

class SignUpSteps extends Component {
	state = {
		currentStep: 0,
		done: false,
	}

	handleDone = (prop) => {
		if (typeof prop !== 'object') {
			this.setState({ currentStep: this.state.currentStep + 1 })
			return;
		}
		const keys = Object.keys(prop);
		this.setState({ [keys[0]]: prop[keys[0]], currentStep: this.state.currentStep + 1 });
	}

	handleNext = () => {
		if ( this.state.currentStep + 1 == 6)
			return;
		const next = this.state.currentStep + 1;
		this.setState({ currentStep: next });
	}

	handlePrev = () => {
		if (this.state.currentStep - 1 < 0)
			return;
		const prev = this.state.currentStep - 1
		this.setState({ currentStep: prev });
	}

	render() {
		const steps = [
			{
				name: 'name',
				component: <GetName done={this.handleDone} />
			},

			{
				name: 'number',
				component: <GetNumber done={this.handleDone} />
			},

			{
				name: 'email',
				component: <GetEmail done={this.handleDone} />
			},
			{
				name: 'college',
				component: <GetCollege done={this.handleDone} />
			},
			{
				name: 'verified',
				component: <VerifyMobileNumber done={this.handleDone} />
			},
			{
				name: 'done',
				component: <FinalStep done={this.handleDone} pecfestId={'hello123'} />
			},
		]
		return (
			<div className="SignUpSteps">
			{
				!this.state.done ? (
					<div className="SignUpStep">
					{
						steps[this.state.currentStep].component
					}
					</div>
				) : 'Success'
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
					<div className="SignUpForm-steps">
						<SignUpSteps />
					</div>
				</div>
			</div>
		)
	}
}
