import React, { Component } from 'react';
import Event from '../Event';
import Dialog from '../Dialog';
import { activities, api } from '../eventdb';
import { Link, withRouter } from 'react-router-dom';
import { Motion, spring } from 'react-motion';
import rebound from 'rebound';

import './ShortEvent.css';

class EventLinks extends Component {
	state = {
		loading: true,
		closing: false,
		events: [],
	}

	handleClick = () => {
		this.setState({ closing: true });
	}

	handleRest = () => {
		if (this.state.closing) {
			this.props.onClose();
		}
	}

	handleSuccess = (events) => {
		this.setState({ loading: false, events });
	}

	handleFailed = () => {
		this.setState({ error: true, loading: false });
	}

	componentDidMount() {
		api.getEventsForCategory(this.props.forCategory, {
			onSuccess: this.handleSuccess,
			onFailed: this.handleFailed
		});
	}

	render() {
		const eventsToShow = this.state.events;
		return (
			<div className="EventLinks">
				<div className="EventLinks-heading">
					<small>Events</small>
					<button onClick={this.props.onClose} className="EventLinks-close">
						<i className="fa fa-times" />
					</button>
				</div>
				{
					!this.state.loading && eventsToShow.length === 0 ? <h3 className="ComingSoon">Coming soon!</h3> :
						(this.state.loading ? <h3 className="ComingSoon">Loading events...</h3> :
							eventsToShow.map((event, i) => (
								<Link key={i} to={'/events/' + event.id} className="EventLink">
									{
										event.name
									}
								</Link>
							)))
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
			backgroundColor: `#196070`
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
				onClick={this.handleClick}
				id={this.props.id}
			>
				<div className="ShortEvent" ref="subcategory">
					<div className="ShortEvent-background" style={backgroundStyle} />
					<div className="ShortEvent-description">
						<div className="ShortEvent-title">{category.name.toUpperCase()}</div>
					</div>

				</div>
				{ this.state.selected ? <EventLinks forCategory={this.props.subcategory} onClose={this.handleClose} /> : ""}
			</div>
		)
	}
}

export default withRouter(ShortEvent);
