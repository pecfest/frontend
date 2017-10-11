import React, { Component } from 'react';
import { activities } from './eventdb';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import './Lectures.css';

class Lecture extends Component {
	render() {
		const lecture = this.props.lecture;
		return (
			<article className="Lecture">
				<ReactCSSTransitionGroup
					component={(props) => <div className="Lecture-part">{props.children}</div>}
					transitionName="Lecture-content-transition"
					transitionEnterTimeout={500}
					transitionLeaveTimeout={500}
					>
					<div className="Lecture-content" key={lecture.id}>
						<div className="Lecture-heading">
							<h2 className="Lecture-name">{lecture.name}</h2>
							<h3 className="Lecture-lecturer">By <span className="Lecture-lecturerName">{lecture.lecturer}</span></h3>
						</div>
						<div className="Lecture-smallDesc">
							<div className="Lecture-date">On {lecture.date}</div>
							<div className="Lecture-venue">Location: {lecture.venue}</div>
						</div>
						<div className="Lecture-details">
							<p className="Lecture-description" dangerouslySetInnerHTML={{
								__html: lecture.description
							}} />
							<div className="Lecture-poster">
								<a href={lecture.posterUrl} target="blank_">Download poster</a>
							</div>
						</div>
					</div>
				</ReactCSSTransitionGroup>
				<ReactCSSTransitionGroup
					component={(props) => <div className="Lecture-part">{props.children}</div>}
					transitionName="Lecture-background-transition"
					transitionEnterTimeout={500}
					transitionLeaveTimeout={500}
					>
					<div className="Lecture-background" key={lecture.id} style={{background: `url(${lecture.backgroundImageUrl}) center top /cover`}} />
				</ReactCSSTransitionGroup>
			</article>
		)
	}
}


export default class Lectures extends Component {
	state = {
		current: 0,
		lectures: activities.find(activity => activity.parent_category == 'Lectures').sub_categories,
	}

	handleNext = () => {
		const next = this.state.current + 1 === this.state.lectures.length ? 0 : this.state.current + 1;
		this.setState({ current: next });
	}

	handlePrev = () => {
		const prev = this.state.current - 1 < 0 ? this.state.lectures.length - 1 : this.state.current - 1;
		this.setState({ current: prev });
	}

	componentDidMount() {
		if (window.checkIfMobile()) {
			this.scroll = document.body.style.overflow;
			document.body.style.overflow = 'auto';
		}
	}

	componentWillUnmount() {
		if (window.checkIfMobile())
			document.body.style.overflow = '';
	}

	render() {
		return (
			<div className="Lectures">
				{
					this.state.lectures.length > 1 && !window.checkIfMobile() ?
					<div className="Lectures-controlbuttons">
						<div className="Lectures-prevButton">
							<button className="btn Lectures-button" onClick={this.handlePrev}>Previous</button>
						</div>
						<div className="Lectures-nextButton">
							<button className="btn Lectures-button" onClick={this.handleNext}>Next</button>
						</div>
					</div> : ""
				}
				<div className="Lecture-slide">
					<Lecture lecture={this.state.lectures[this.state.current]} key={this.state.current} />
				</div>
			</div>
		)
	}
}
