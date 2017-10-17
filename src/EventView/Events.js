/* eslint-env jquery */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Event from '../Event';

import ShortEvent from './ShortEvent';
import { activities } from '../eventdb';

import './Events.css';

class StaticCategories extends Component {
	render() {
		return (
			<div className="Events">
				{ this.props.subcategories.map((subcategory, i) => {
					return (
						<ShortEvent style={this.props.style}
							subcategory={subcategory}
							id={"Event-" + i}
							key={i}
						/>
					)
				})
			}
			</div>
		)
	}
}

class AnimatedCategories extends Component {
	render() {
		const subcategories = this.props.subcategories;
		return (
			<StaticCategories
				subcategories={subcategories}
				/>
		)
	}
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
				{
					window.checkIfMobile() ?
						<StaticCategories subcategories={subcategories} /> :
						<AnimatedCategories subcategories={subcategories} />
				}
			</div>
			</div>
		)
	}
}