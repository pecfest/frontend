import React, { Component } from 'react';
import {StaggeredMotion, Motion, spring } from 'react-motion';
import { Link } from 'react-router-dom';

import './NavigationDialog.css';

const links = [
	{
		name: 'Home',
		to: '/'
	},
	{
		name: 'Events',
		to: '/activities',
	},
	{
		name: 'Sponsors',
		to: '/sponsors',
	},
	{
		name: 'Our Theme',
		to: '/our-theme',
	},
	{
		name: 'Team',
		to: '/team',
	},
	{
		name: 'PECFEST 2016',
		to: '/pecfest2016',
	}
]

class Navigation extends Component {
	getDefaultStyles() {
		return links.map(link => ({ h: 0 }))
	}

	render() {
		if (this.props.loadingDialog) {
			return <div />
		}

		return (
			<div className="Navigation">
				<StaggeredMotion defaultStyles={this.getDefaultStyles()}
					styles={
						prevInterpolatedStyles => prevInterpolatedStyles.map((_, i) => {
							return i === 0 ?
								({ h: spring(100) }) :
								({ h: spring(prevInterpolatedStyles[i-1].h)})
							}
						)
					}>
					{
						(styles) => (
							<div className="Navigation-links">
								{
									styles.map((style, i) => {
										const link = links[i];
										return (
											<Link key={i}
												onClick={this.props.onClick}
												className="Navigation-link"
												to={link.to}
												style={{ transform: `translateY(${100 - style.h}%)`, opacity: style.h / 100}}
												>
												{link.name}
											</Link>
										)
									})
								}
							</div>
						)
					}
				</StaggeredMotion>
			</div>
		)
	}
}

export default class NavigationDialog extends Component {
	state = {
		initialValue: 0,
		closing: false,
		finalValue: 90,
		opening: true,
		touchstart: {},
		touchend: {}
	}

	handleRest = () => {
		if (this.state.closing) {
			this.props.onClose();
		} else {
			this.setState({ opening: false })
		}
	}

	handleClose = () => {
		this.setState({ initialValue: 90, finalValue: 0, closing: true });
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
		if (-(this.state.touchstartx - this.state.touchendx) > 30)
			this.handleClose();
	}

	handleWheel = (event) => {
		if (event.deltaX < -50) {
			this.handleClose();
		}
	}

	render() {
		this._content = document.querySelector('.content');
		return (
			<Motion defaultStyle={{ y: this.state.initialValue }}
				style={{ y: spring(this.state.finalValue, { precision: 1}) }}
				onRest={this.handleRest}>
				{
					value => {
						if (typeof this.props.onTransition !== 'undefined') {
							this._content.style.transform = `scale(${1 - value.y / 1000})`;
							this._content.style.opacity = 1 - value.y / 100;
						}
						return (
							<div className="NavigationDialog-wrapper">
								<div className="NavigationDialog"
									onTouchStart={this.handleTouchStart}
									onTouchMove={this.handleTouchMove}
									onTouchEnd={this.handleTouchEnd}
									onWheel={this.handleWheel}
									style={{ width: `${ value.y }%`}}>
									<Navigation loadingDialog={this.state.opening} onClick={this.handleClose} />

									<button className="Button NavigationDialog-button"
										onClick={this.handleClose}>
										<i className="fa fa-times" />
									</button>
								</div>
							</div>
						)
					}
				}
			</Motion>
		)
	}
}
