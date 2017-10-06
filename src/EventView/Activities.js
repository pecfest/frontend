import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { StaggeredMotion, spring } from 'react-motion';
import Divider from '../Divider';
import ComingSoon from '../ComingSoon';
import Dialog from '../Dialog';
import anime from 'animejs';

import { activities } from '../eventdb';

import './Activities.css';

class Activity extends Component {
	state = {
		mouseOver: false
	}

	handleClick = () => {
		if (!this.props.selected)
			this.props.onActivitySelect(this.props.activity);
		else {
			this.handleClose();
		}
	}

	handleMouseOver = () => {
		this.setState({ mouseOver: true })
	}

	handleMouseOut = () => {
		this.setState({ mouseOver: false });
	}

	handleClose = () => {

		if (window.checkIfMobile()) {
			return this.props.onActivitySelect(this.props.activity);
		}
		this.anim = anime.timeline()
		this.anim.add({
			targets: '.slideUp',
			opacity: [ 1, 0],
			easing: 'easeOutExpo',
			duration: 300,
		}).add({
			targets: '.Expanded-box',
			height: [400, 0],
			easing: 'easeOutExpo',
			duration: 500,
		});

		this.timer = setTimeout(() => this.refs.activity.style.flex = "1", 300);

		this.anim.complete = this.props.onActivitySelect;
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevProps.selected != this.props.selected && this.props.selected && !window.checkIfMobile()) {
			this.anim = anime.timeline()
			this.anim.add({
				targets: '.Expanded-box',
				height: [ 0, 400 ],
				easing: 'easeOutExpo',
				duration: 500,
			}).add({
				targets: '.slideUp',
				opacity: [ 0, 1],
				translateY: [ 100, 0 ],
				easing: 'easeOutExpo',
				delay: (el, i, l) => i * 100
			})
		}
	}

	componentWillUnmount() {
		clearTimeout(this.timer);
	}

	render() {
		const style = { flex: this.state.mouseOver ? 1.1 : 1 };
		const dividerStyle= { display: 'block', marginLeft: '0', backgroundColor: 'rgba(165, 97, 44, 0.6)'};

		if (this.props.selected) {
			style.flex = 5;
		}
		return (
			<div className="Activity-wrapper" ref="activity"
				 id={this.props.id}
				 style={Object.assign({}, style, this.props.style)}
				>
				<div className="Activity"
					onMouseOver={this.handleMouseOver}
					onMouseOut={this.handleMouseOut}
					onClick={this.handleClick}
					onWheel={this.handleMouseWheel}
					>
					<div className="vertically-aligned">
						<div className="Activity-title">
							<h2 className="Activity-heading">{this.props.activity.parent_category}</h2>
						</div>

						{
							this.props.selected ?
								<div className="Expanded-box">
									<div className="SelectedActivity-description slideUp">
										<p>{
											this.props.activity.description.length === 0 ?
											<ComingSoon /> :
											this.props.activity.description
										}</p>
									</div>

									<br />
									<br />
									{
										this.props.activity.description.length === 0 ? "" :
										<Link to={"/activities/" + this.props.activity.parent_category + "/events"}
												className="SelectedActivity-link slideUp">
											Go to events <i className="fa fa-long-arrow-right" />
										</Link>
									}
									</div> : ""
						}
					</div>
				</div>
			</div>
		)
	}
}

class SelectedActivity extends Component {
	render() {
		const dividerStyle= { display: 'block', marginLeft: '0', backgroundColor: 'rgba(165, 97, 44, 0.6)'};
		return (
			<div className="SelectedActivity-wrapper">
				<div className="SelectedActivity">
					<div className="SelectedActivity-title">
						{this.props.activity.parent_category}
					</div>
					<br />
					<Divider style={dividerStyle}/>
					<br />

					<div className="SelectedActivity-description">
						{
							this.props.activity.description.length === 0 ?
							<ComingSoon /> :
							this.props.activity.description
						}
					</div>

					<br />
					<Divider style={ dividerStyle }/>
					<br />
					{
						this.props.activity.description.length === 0 ? "" :
						<Link to={"/activities/" + this.props.activity.parent_category + "/events"}
								className="SelectedActivity-link">
							Go to events <i className="fa fa-long-arrow-right" />
						</Link>
					}
				</div>
			</div>
		)
	}
}

export default class Activities extends Component {
	state = {
		activitySelected: false,
		activity: {},
		loading: true,
	}

	handleActivitySelect = activity => {
		let activitySelected = true;
		if (activity.parent_category === this.state.activity.parent_category)
			activitySelected = !this.state.activitySelected;

		this.setState({ activitySelected, activity })
	}

	handleTransition = (value, opposite) => {
		const scale = value.y / 1000;
		this.refs.activities.style.transform = `scale(${1 - scale}) translateY(${-value.y}%)`;
		this.refs.activities.style.opacity = 1 - value.y / 100;
	}

	componentDidMount() {
		this.anim = anime.timeline();
		this.anim.add({
			targets: '.Activity-wrapper',
			opacity: [0 , 1],
			translateY: [ '100%', '0%'],
			delay: (el, i, l) => i * 100,
			easing: 'easeOutExpo'
		}).add({
			targets: '.Activity-title',
			opacity: [0, 1],
			translateY: ['100px', '0px'],
			delay: (el, i, l) => i * 50,
		})
	}

	componentWillUnmount() {
	}


	render() {
		return (
			<div className="Activities-wrapper wrapper">
				<div className="Activities" ref="activities">
					{
						activities.map((activity, i) => {
							return (
								<Activity
									activity={activity}
									onActivitySelect={this.handleActivitySelect}
									key={i}
									selected={this.state.activitySelected && this.state.activity.parent_category === activity.parent_category}
									id={"Activity-" + i}
								/>
							);
						})
					}
				</div>
			</div>
		)
	}
}
