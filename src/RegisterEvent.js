import React, { Component } from 'react';
import { Motion, spring } from 'react-motion';
import TextInput from './FormElements/TextInput';
import { validateId } from './utils';
import SubmitButton from './FormElements/SubmitButton';
import user from './user';
import PropTypes from 'prop-types';

import './RegisterEvent.css';

export default class RegisterEvent extends Component {
	constructor(props) {
		super(props);

		const inputs = [ 'user1' ];
		const values = [ '']
		if (typeof this.props.minSize !== 'undefined' && this.props.minSize > 1) {
			for (let i = 1; i < this.props.minSize; i++) {
				inputs.push('user' + (i+1));
			}
		}
		this.state = {
			inputs: inputs,
			values: {
				user1: {
					user: user.currentUser,
					value: user.currentUser.pecfestId,
					verified: true,
					error: false
				},
			},
		}
	}

	componentDidMount() {
		document.body.style.overflow = 'auto';
	}

	componentWillUnmount() {
		document.body.style.overflow = 'hidden';
	}

	handleError = (name, value, message) => {
		const values = { ...this.state.values };
		values[name].error = true;
		values[name].verified = false;
		this.setState({ values });
	}

	handleSuccess = (name, value, user) => {
		const values = { ...this.state.values };
		values[name] = Object.assign({}, values[name], { verified: true, error: false, user: user });
		this.setState({ values });
	}

	handleChange = (name, { target }) => {
		const values = this.state.values;
		values[name] = { value: target.value, verified: false, error: false };

		validateId(target.value, { onError: this.handleError.bind(this, name), onSuccess: this.handleSuccess.bind(this, name) });

		this.setState({ values });
	}

	handleRegister = () => {
		this.setState({ registering: false, done: true });
	}

	handleSubmit = event => {
		event.stopPropagation();
		event.preventDefault();

		setTimeout(this.handleRegister, 2000);
		this.setState({ registering: true });
	}

	handleAddExtra = () => {
		if (this.props.maxSize <= this.state.inputs.length)
			return;
		const inputs = [ ...this.state.inputs ];
		inputs.push('user' + (inputs.length + 1));
		this.setState({ inputs });
	}

	handleCancel = () => {

	}

	render() {
		let allVerified = true;
		const inputs = this.state.inputs.map((input, i) => {
			const value = typeof this.state.values[input] === 'undefined' ? '' : this.state.values[input].value;
			const wrongInput = typeof this.state.values[input] === 'undefined' ? false : !this.state.values[input].verified;

			if (typeof this.state.values[input] !== 'undefined') {
				allVerified = allVerified && !this.state.values[input].error;
			}

			return (
				<div className="MemberInput"
						key={input}
					>
					<small htmlFor={input} style={{display: 'block'}}>Member {i + 1}</small>
					<TextInput
						placeholder={'PECFEST ID'}
						name={input}
						value={value}
						wrongInput={wrongInput}
						onChange={this.handleChange.bind(this, input)}
						disabled={input === 'user1'}
					/>
				</div>
			);
		});

		return (
			<div className="RegisterEvent-wrapper">
				<div className="RegisterEvent">
					<div className="RegisterEvent-header">
						<div className="RegisterEvent-title">
							<h1>Registering for <span className="RegisterEvent-eventname">{this.props.event.title }</span></h1>
						</div>
						<div className="RegisterEvent-instructions">
							<div className="RegisterEvent-memberSize">
								Team size:&nbsp;
								<span className="RegisterEvent-teamsize">
								{ this.props.maxSize === 1 || this.props.maxSize == this.props.minSize ? this.props.minSize : this.props.minSize + ' - ' + this.props.maxSize }
								</span>
							</div>
							<div className="RegisterEvent-help">
							Please enter the PECFEST ID's of your team members. If you want to enter extra members, then click `Add Member` to add.
							</div>
						</div>
					</div>
					<form className="RegisterEvent-form" onSubmit={this.handleSubmit}>
						{
							inputs
						}


						<div className="SubmitButton" style={{width: '100%', textAlign: 'right'}}>
							<button
								className="RegisterEvent-addButton FormButton waves-effect btn-flat"
								onClick={this.handleAddExtra}
								disabled={this.props.maxSize <= this.state.inputs.length}>
								Add Member
							</button>

							<button
								className="FormButton"
								onClick={this.handleCancel}
								>
								Cancel
							</button>

							<SubmitButton disabled={!allVerified} />
						</div>
					</form>
				</div>
			</div>
		)
	}
}

RegisterEvent.propTypes = {
	minSize: PropTypes.number.isRequired,
	maxSize: PropTypes.number.isRequired,
}
