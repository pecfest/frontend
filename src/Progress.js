import React, { Component } from 'react';
import { Motion, spring } from 'react-motion';
import Loader from './Loader';
// import SvgCircle from './SvgCircle';
import './Progress.css';

export default class Progress extends Component {
	handleTransitionEnd = () => {
		if (this.props.working) {
			this.loader.style.animation = '';
			this.loader.children[0].style.animation = '';
			this.loader.removeEventListener('animationiteration', this.handleTransitionEnd);
			this.props.onComplete();
		}
	}

	render() {
		return (
			<div className="Progress-wrapper">
				<Loader color="black" getRef={ref => this.loader = ref} onAnimationCancel={this.handleAnimationCancel} onAnimationIteration={this.handleTransitionEnd} />
			</div>
		)
	}
}
