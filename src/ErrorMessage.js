import React, { Component } from 'react';
import { Motion, spring } from 'react-motion';

import './ErrorMessage.css';

export default class ErrorMessage extends Component {
	render() {
		return (
			<Motion defaultStyle={{h : 0}} style={{ h: spring(100) }}>
				{
					style => (
						<div className="ErrorMessage"
							style={{
								transform: `translateY(${100 - style.h}%)`,
								opacity: style.h / 100
							}}
						>
							<div className="ErrorMesssage-message-wrapper"><small className="ErrorMessage-message">{this.props.message}</small></div>
						</div>
					)
				}
			</Motion>
		)
	}
}
