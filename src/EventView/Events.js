/* eslint-env jquery */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { StaggeredMotion, spring } from 'react-motion';
import Event from '../Event';
import Dialog from '../Dialog';

import ShortEvent from './ShortEvent';
import { activities } from '../eventdb';

import './Events.css';

const config = {
	precision: 1
}

export default class Events extends Component {
	constructor(props) {
		super(props);
		let subcategories = []
		const category = activities.find((category) => category.parent_category === this.props.match.params.activityId);
		if (typeof category !== 'undefined') {
			subcategories = category.sub_categories;
		}
		this.state = {
			eventSelected: false,
			subcategories: subcategories,
			fetchedAll: 0
		}
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

		const subcategories = this.state.subcategories;

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
					<small>Showing <span style={{color: 'black', fontWeight: '700'}}>
						{this.props.match.params.activityId}
					</span> events</small>
				</div>
				<StaggeredMotion
					defaultStyles={subcategories.map(() => ({ h: 0 }))}
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
										subcategory={subcategories[i]}
										id={"Event-" + i}
										key={i}
									/>
								)
							})
						}
						</div>
					)
				}
				</StaggeredMotion>
			</div>
			</div>
		)
	}
}