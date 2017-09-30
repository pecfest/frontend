import React, { Component } from 'react';

import './TextInput.css'

export default class TextInput extends Component {
	componentDidMount() {
		this.inputElement.focus();
	}

	render() {
		const wrongInput = this.props.wrongInput;
		const props = { ...this.props };
		delete props.wrongInput;
		return (
			<div className="TextInput" style={{width: '100%', padding: '1em 0', color: wrongInput ? 'red' : ''}}>
				<input ref={input => this.inputElement = input} autoComplete={'off'} className="TextInput-input" style={{width: '100%', margin: 0, fontSize: '3em', height: '1em', color: 'inherit'}} type="text" {...props} />
			</div>
		)
	}
}
