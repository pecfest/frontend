/* eslint-env jquery */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { StaggeredMotion, spring } from 'react-motion';
import Event from '../Event';
import Dialog from '../Dialog';

import ShortEvent from './ShortEvent';
import { events } from '../eventdb';

import './Events.css';

const config = {
	precision: 1
}

export default class Events extends Component {
	state = {
		eventSelected: false,
		events: events,
		fetchedAll: 0
	}

	handleClick = event => {
		this.setState({ eventSelected: true, event })
	}

	handleClose = event => {
		this.setState({ eventSelected: false })
	}

	componentDidMount() {
		this.bodyColor = document.body.style.backgroundColor;
		document.body.style.backgroundColor = 'white';
		document.body.style.overflow = 'auto';

	}

	componentWillUnmount() {
		document.body.style.backgroundColor = this.bodyColor;
		document.body.style.overflow = 'hidden';
	}

	render() {
		if (this.state.fetchedAll > 0) {
			return (
				<div className="Events-wrapper wrapper">
					<div className="Events-heading center">
						{this.state.fetchedAll} objects left.
					</div>
				</div>
			)
		}

		return (
			<div className="White-background-wrapper">
			<div className="Events-wrapper wrapper">
				<div className="Events-heading">
					<small>Events</small>
				</div>
				<StaggeredMotion
					defaultStyles={events.map(() => ({ h: 0 }))}
					styles={
						prevInterpolatedStyles => prevInterpolatedStyles.map((_, i) => {
							return i === 0 ?
								({ h: spring(100, config) }) :
								({ h: spring(prevInterpolatedStyles[i - 1].h, config) })
						})
					}
				>
				{
					styles => (
						<div className="Events" onWheel={event=> event.stopPropagation() }>
							{ styles.map((style, i) => {
								return (
									<ShortEvent style={{
											transform: `translateY(${100 - style.h}%)`,
											opacity: style.h / 100,
										}}
										event={events[i]}
										id={"Event-" + events[i].id}
										key={i}
										onClick={this.handleClick}
									/>
								)
							})
						}
						</div>
					)
				}
				</StaggeredMotion>
			</div>

			{
				this.state.eventSelected ?
					<Event event={this.state.event} onClose={this.handleClose} /> :
					""
			}
			</div>
		)
	}
}