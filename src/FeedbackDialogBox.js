import React, { Component } from 'react';
import anime from 'animejs';
import user from './user';

import './FeedbackDialogBox.css';

export default class FeedbackDialog extends Component {
	state = {
		removeSurvey: false,
	}

	handleClose = () => {
		anime({
			targets: '.FeedbackDialog-wrapper',
			translateY: ['0%', '100%'],
			easing: 'easeInOutQuad',
		}).complete = () => this.setState({ removeSurvey: true })
	}

	componentDidMount() {
		const result = user.getPreference('survey');

		if (result) {
			this.setState({ removeSurvey: true })
		} else {
			anime({
				targets: '.FeedbackDialog-wrapper',
				translateY: ['100%', '0'],
				easing: 'easeInOutQuad',
				duration: 2000,
			})
		}
	}

	handleSubmit = () => {
		user.savePreference('survey', true);
		this.handleClose();
	}

	render() {
		if (this.state.removeSurvey) {
			return <div />
		}
		return (
			<div className="FeedbackDialog-wrapper">
				<a onClick={this.handleSubmit} className="Survey-button" href="https://goo.gl/forms/F3TNJZfHAT9SS9eI3" target="_blank">
					Feedback <i className="fa fa-external-link" />
				</a>
			</div>
		);
	}
}
