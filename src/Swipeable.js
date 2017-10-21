import React, { Component } from 'react';

export default class Swipeable extends Component {
	state = {
		startX: 0,
		startY: 0,
	}

	handleTouchStart = event => {
		const touches = event.touches;

		console.log(touches);
		this.setState({startX: touches[0].clientX, startY: touches[0].clientY, currentX: touches[0].clientX, currentY: touches[0].clientY });
	}

	handleTouchMove = event => {
		const touches = event.touches;
		this.setState({ currentX: touches[0].clientX, currentY: touches[0].clientY });
		return this.props.onSwiping && this.props.onSwiping(touches[0].clientX, touches[0].clientY);
	}

	handleTouchEnd = event => {
		const touches = event.touches;
		const threshold = this.props.threshold || 50;
		if (this.props.onSwipe) {
			if (this.state.startX - this.state.currentX > threshold) {
				this.props.onSwipe('left');
			} else if (this.state.startX - this.state.currentX < -threshold) {
				this.props.onSwipe('right');
			} else if (this.props.onCancel) {
				this.props.onCancel();
			}
		}
	}

	handleKeyUp = event => {
		console.log(event);
	}

	render() {
		return (
			<div {...this.props}
				onTouchStart={this.handleTouchStart}
				onTouchEnd={this.handleTouchEnd}
				onTouchMove={this.handleTouchMove}
				onKeyPress={this.handleKeyUp}
				>
				{this.props.children}
			</div>
		)
	}
}
