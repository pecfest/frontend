import React, { Component } from 'react';
import Event from '../Event';
import { activities, api } from '../eventdb';
import { Link, withRouter } from 'react-router-dom';
import anime from 'animejs';
import Loader from '../Loader';

import './ShortEvent.css';

class EventSummary extends Component {
	render() {
		const event = this.props.event;
		return (
			<Link to={'/events/' + event.id} className={"EventLink " + this.props.forCat }>
				<div className="EventLink-heading">
					{event.name}
				</div>
				<div className="EventLink-shortDescription">
					{event.shortDescription}
					{event.shortDescription.trim().length > 0 && event.prize.length > 0 ? <span style={{fontWeight: 'bold'}}>&nbsp; · &nbsp;</span> : "" }
					{event.prize.length > 0 ? `Prize: ${event.prize.split(';')[0]}` : ""}
				</div>
			</Link>
		)
	}
}

class AnimatedEvents extends Component {
	componentDidMount() {
		const height = this.refs.container.getBoundingClientRect().height;
		const anim = anime.timeline();
		anim.add({
			targets: this.refs.container,
			height: [0,  height ],
		})
		.add({
			targets: '.' + this.props.forCat,
			translateX: ['10px', '0px'],
			opacity: [ 0, 1 ],
			delay: (el, i, l) => i * 100,
			easing: 'easeOutExpo'
		})
	}

	render() {
		return (
			<div className="AnimatedEvents" ref="container">
			{
				this.props.events.map((event, i) => (
					<EventSummary event={event} key={i} forCat={this.props.forCat} />
				))
			}
			</div>
		)
	}
}

class EventLinks extends Component {
	state = {
		loading: true,
		closing: false,
		events: [],
		close: true,
	}

	handleClick = () => {
		this.setState({ close: true })
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

	componentDidUpdate() {
		if (this.props.close) {
			const timeline = anime.timeline();

			if (!this.props.loading) {
				timeline.add({
					targets: '.EventLinks-heading, .Event-loading, .ComingSoon, .AnimatedEvents',
					opacity: [1, 0],
					duration: 500,
					easing: 'linear'
				})
			}

			timeline.add({
				targets: this.refs.container,
				height: [ this.refs.container.getBoundingClientRect().height, 0 ],
				easing: 'easeOutExpo',
				duration: 500,
			}).complete = this.props.onClose;
		}
	}

	render() {
		const eventsToShow = this.state.events;
		const shouldClose = this.props.close || this.state.close;
		return (
			<div className="EventLinks" ref="container">
				<div className="EventLinks-heading">
					<small>Events</small>
					<button onClick={this.handleClick} className="EventLinks-close">
						<i className="fa fa-times" />
					</button>
				</div>
				{
					!this.state.loading && eventsToShow.length === 0 ? <h3 className="ComingSoon">Failed to load events!</h3> :
						(this.state.loading ? <div className="Event-loading"><Loader color="rgba(0, 0, 0, 0.5)" /></div> :
							<AnimatedEvents events={eventsToShow} forCat={'Cat-' + this.props.forCategory.id} />)
				}
			</div>
		)
	}
}


class ShortEvent extends Component {
	state = {
		selected: false,
		close: true,
	}
	count = 0

	handleClick = () => {
		if (this.count % 2) {
			this.setState({ close: true });
		} else {
			this.setState({ selected: true, close: false })
		}

		this.count++;
	}

	handleClose = () => {
		this.setState({ selected: false, mouseOver: false, close: true });
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
				{this.state.selected ? <EventLinks close={this.state.close} forCategory={this.props.subcategory} onClose={this.handleClose} /> : "" }
			</div>
		)
	}
}

export default withRouter(ShortEvent);
