import React, { Component } from 'react';
import { Motion, spring } from 'react-motion';

import './Dialog.css';

const springConfig = {
	precision: 0.1
}

export default class Dialog extends Component {
	state = {
		initialValue: 0,
		finalValue: 90,
		closing: false,
	}

	handleRest = () => {
		if (this.state.closing) {
			this.props.onClose();
		}
	}

	handleClick = () => {
		this.setState({ initialValue: 90, finalValue: 0, closing: true })
	}

	handleTouchStart = (event) => {
		const touches = event.touches;

		if (touches.length === 1) {
			this.setState({ touchstartx: touches[0].clientX, touchstarty: touches[0].clientY });
		}
	}

	handleTouchMove = (event) => {
		const touches = event.touches;

		if (touches.length === 1) {
			this.setState({ touchendx: touches[0].clientX, touchendy: touches[0].clientY });
		}
	}

	handleTouchEnd = (event) => {
		if (-(this.state.touchstarty - this.state.touchendy) > 30)
			this.handleClick();
	}

	handleWheel = (event) => {
		if (event.deltaY < 0) {
			this.handleClick();
		}
	}

	render() {
		return (
			<Motion defaultStyle={{ y: this.state.initialValue }} style={{ y: spring(this.state.finalValue, springConfig) }} onRest={this.handleRest}>
				{
					value => {
						if (typeof this.props.onTransition !== 'undefined') {
							this.props.onTransition(value, this.state.closing);
						}
						return (
							<div className="Dialog"
								onTouchStart={this.handleTouchStart}
								onTouchMove={this.handleTouchMove}
								onTouchEnd={this.handleTouchEnd}
								onWheel={this.handleWheel}
								style={{
									transform: `translateY(${ (100 - value.y) }%)`,
								}}>
								{this.props.children}

								<button className="Button SelectedActivity-button" onClick={this.handleClick}>
									<i className="fa fa-times" />
								</button>
							</div>
						);
					}
				}

			</Motion>
		)
	}
}

