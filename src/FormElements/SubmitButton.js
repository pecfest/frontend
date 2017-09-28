import React, { Component } from 'react';
import './SubmitButton.css';

export default class SubmitButton extends Component {
	render() {
		return (
			<button
				className="SubmitButton-button FormButton"
				disabled={this.props.disabled} type="submit">Register</button>
		)
	}
}
