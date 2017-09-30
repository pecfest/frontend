import React, { Component } from 'react';
import './SubmitButton.css';

export default class SubmitButton extends Component {
	render() {
		return (
			<button
				className="SubmitButton-button FormButton"
				style={{ color: '#196070' }}
				disabled={this.props.disabled} type="submit">Register</button>
		)
	}
}
