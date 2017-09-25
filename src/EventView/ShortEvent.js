import React, { Component } from 'react';
import Event from '../Event';
import Dialog from '../Dialog';
import { Link } from 'react-router-dom';

import './ShortEvent.css';

export default class ShortEvent extends Component {
	handleClick = () => {
		this.props.onClick(this.props.event);
	}

	componentDidMount() {
		var selector
	}

	render() {
		const event = this.props.event;

		const backgroundStyle = {
			background: `url(${event.backgroundImageUrl})`
		}

		return (
			<div className="ShortEvent" ref="event"
					style={Object.assign({},this.props.style)}
					onClick={this.handleClick}
					id={this.props.id}
					>
				<div className="ShortEvent-background" style={backgroundStyle} />
				<div className="ShortEvent-description">
					<div className="ShortEvent-title">{event.title.toUpperCase()}</div>
				</div>
			</div>
		)
	}
}
