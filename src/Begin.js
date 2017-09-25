import React, { Component } from 'react';
import { Motion, spring } from 'react-motion';
import './Begin.css';

export default class Begin extends Component {
	render() {
		return (
			<Motion defaultStyle={{ h: 0 }} style={{ h: spring(100) }}>
			{
				style => {
					return (
						<div className="Begin">
							<button id="Begin-button" style={{
									transform: `translateY(${100 - style.h}%)`,
									opacity: (style.h / 100),
									border: '1px solid rgba(0, 0, 0, 0.6)',
									color: 'rgba(0, 0, 0, 0.8)',
									padding: `${1}em 2em`,
									display: 'block',
									marginLeft: 'auto',
									backgroundColor: 'rgba(0, 0, 0, 0)',
									marginRight: 'auto',
									cursor: 'pointer',
									bottom: '2em'
								}}
								onClick={() => this.props.onClick(document.getElementById('Begin-button'))}
							>
								<small>START</small>
							</button>
						</div>
					);
				}
			}
			</Motion>
		)
	}
}
