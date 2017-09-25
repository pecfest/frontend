import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { StaggeredMotion, spring } from 'react-motion';
import Divider from '../Divider';
import Dialog from '../Dialog';

import { activities } from '../eventdb';

import './Activities.css';

class Activity extends Component {
	state = {
		mouseOver: false
	}

	handleClick = () => {
		this.props.onActivitySelect(this.props.activity);
	}

	handleMouseOver = () => {
		this.setState({ mouseOver: true })
	}

	handleMouseOut = () => {
		this.setState({ mouseOver: false });
	}

	handleMouseWheel = event => {

		if (event.deltaY > event.deltaX) {
			if (event.deltaY > 0) {
				this.props.onActivitySelect(this.props.activity);
			}
		}
	}

	render() {
		return (
			<div className="Activity-wrapper" id={this.props.id} style={this.props.style}>
				<div className="Activity"
					onMouseOver={this.handleMouseOver}
					onMouseOut={this.handleMouseOut}
					onClick={this.handleClick}
					onWheel={this.handleMouseWheel}
					>
					<div className="Activity-title">
						<h2 className="Activity-heading">{this.props.activity.title}</h2>
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
						{this.props.activity.title}
					</div>
					<br />
					<Divider style={dividerStyle}/>
					<br />

					<div className="SelectedActivity-description">
						{this.props.activity.description}
					</div>

					<br />
					<Divider style={ dividerStyle }/>
					<br />

					<Link to={"/activities/" + this.props.activity.id + "/events"}
							className="SelectedActivity-link">
						Go to events <i className="fa fa-long-arrow-right" />
					</Link>
				</div>
			</div>
		)
	}
}

export default class Activities extends Component {
	state = {
		activitySelected: false,
		activity: {}
	}

	handleActivitySelect = activity => {
		this.setState({ activitySelected: true, activity });
	}

	handleTransition = (value, opposite) => {
		const scale = value.y / 1000;
		this.refs.activities.style.transform = `scale(${1 - scale}) translateY(${-value.y}%)`;
		this.refs.activities.style.opacity = 1 - value.y / 100;
	}

	componentDidMount() {
	}

	componentWillUnmount() {
	}

	render() {
		return (
			<div className="Activities-wrapper wrapper">
				<div className="Activities" ref="activities">
				<StaggeredMotion
					defaultStyles={activities.map(() => ({ h : 0 }))}
					styles={
						prevInterpolatedStyles => prevInterpolatedStyles.map((_, i) => {
							return i == 0 ?
								({ h: spring(100) }) :
								({ h: spring(prevInterpolatedStyles[i-1].h)} )
						})
					}
				>
					{

						styles => (
							<div>
								{
									styles.map((style, i) => {
										return (
											<Activity
												activity={activities[i]}
												onActivitySelect={this.handleActivitySelect}
												style={{
													transform: `translateY(${100 - style.h}%)`,
													opacity: style.h / 100
												}}
												key={i}
												id={"Activity-" + i}
											/>
										);
									})
								}
							</div>
						)
					}
				</StaggeredMotion>
				</div>
					{
						this.state.activitySelected ?
							<Dialog onClose={() => this.setState({ activitySelected: false })}
								onTransition={this.handleTransition}
								backgroundGradient={this.state.activity.imageUrl}
							>
								<SelectedActivity activity={this.state.activity}
									/>
							</Dialog>
						: ""
					}
			</div>
		)
	}
}
