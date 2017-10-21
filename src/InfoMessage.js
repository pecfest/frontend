import React, { Component } from 'react';

import './InfoMessage.css'

export default class InfoMessage extends Component {
	render() {
		return (
			<div className="InfoMessage row" ref="message">
				<p className="col">{this.props.message}</p>
				<button className="InfoMessage-dismiss col btn-2">
					<i className="fa fa-cross" />
				</button>
			</div>
		)
	}
}
