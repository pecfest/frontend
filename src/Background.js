import React, { Component } from 'react';
import './Background.css';

export default class Background extends Component {
	render() {
		return (
			<div className="Background" {...this.props}>
				{ this.props.children }
			</div>
		)
	}
}
