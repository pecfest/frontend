import React, { Component } from 'react';
import Event from '../Event';
import Dialog from '../Dialog';
import { events } from '../eventdb';
import { Link, withRouter } from 'react-router-dom';
import { Motion, spring } from 'react-motion'
import rebound from 'rebound';

import './ShortEvent.css';

class EventLinks extends Component {
	state = {
		closing: false
	}

	handleClick = () => {
		this.setState({ closing: true });
	}

	handleRest = () => {
		if (this.state.closing) {
			this.props.onClose();
		}
	}

	render() {
		const eventsToShow = events.filter(event => event.activityId === this.props.id);
		console.log(eventsToShow);
		return (
			<div className="EventLinks">
				<div className="EventLinks-heading">
					<small>Events</small>
					<button onClick={this.props.onClose} className="EventLinks-close">
						<i className="fa fa-times" />
					</button>
				</div>
				{
					events.map(event => (
						<Link key={event.id} to={'/events/' + event.id} className="EventLink">
							{
								event.title
							}
						</Link>
					))
				}
			</div>
		)
	}
}


class ShortEvent extends Component {
	state = {
		selected: false,
	}

	handleClick = () => {
		this.setState({selected: !this.state.selected});
	}

	handleOnRest = () => {
		if (this.state.selected == true) {
			this.props.history.push('/events/' + this.props.subcategory.id);
		}
	}

	handleClose = () => {
		this.setState({ selected: false, mouseOver: false });
	}

	render() {
		const category = this.props.subcategory;

		const bstyle = {
			background: `url(${category.backgroundImageUrl}) center center no-repeat /cover`
		}

		const fstyle = {};

		if (this.state.mouseOver) {
			fstyle.filter = 'none';
		}

		const backgroundStyle = Object.assign({}, bstyle, fstyle);

		return (
			<div className="ShortEvent-wrapper"
				style={Object.assign({},this.props.style)}
				onMouseOver={() => this.setState({ mouseOver: true })}
				onMouseOut={() => this.setState({ mouseOver: false })}
				onTouchStart={()=> this.setState({ mouseOver: true })}
				onTouchEnd={() => this.setState({mouseOver: false })}
				onTouchCancel={() => this.setState({ mouseOver: false })}
				id={this.props.id}
			>
				<div className="ShortEvent" ref="subcategory"
					onClick={this.handleClick}
						>
					<div className="ShortEvent-background" style={backgroundStyle} />
					<div className="ShortEvent-description">
						<div className="ShortEvent-title">{category.name.toUpperCase()}</div>
					</div>

				</div>
				{ this.state.selected ? <EventLinks forCategory={this.props.subcategory.id} onClose={this.handleClose} /> : ""}
			</div>
		)
	}
}

export default withRouter(ShortEvent);
