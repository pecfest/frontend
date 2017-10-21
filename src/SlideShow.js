import React, { Component } from 'react';
import { TransitionMotion, spring } from 'react-motion';
import SlideShowControlButtons from './SlideShowControlButtons';
import FrontSlide from './FrontSlide';
import MegaShows from './MegaShows/MegaShows';
import BackgroundCanvas from './BackgroundCanvas';

import './SlideShow.css';

class FirstSlide extends Component {
	state = {
		loading: true,
	}

	shouldComponentUpdate(nextProps, nextState) {
		return this.state.loading != nextState.loading;
	}

	handleComplete = () => {
		this.setState({ loading: false });
	}

	render() {
		return (
			<div style={{width: '100%'}}>
				<FrontSlide loading={this.state.loading} />
				<BackgroundCanvas onComplete={this.handleComplete} />
			</div>
		)
	}
}

class SecondSlide extends Component {
	shouldComponentUpdate() {
		return false;
	}

	render() {
		return (
			<MegaShows />
		)
	}
}

class Slide extends Component {
	render() {
		return (
			<div className="Slide" style={{
				// opacity: (100 - Math.abs(this.props.style.x)) / 100,
				transform: `translateY(${-this.props.style.x}%)`
			}}>
				{this.props.k ? <SecondSlide /> : <FirstSlide />}
				<div className="Controls">
					<button className="ControlButton" onClick={this.props.onNext} />
				</div>
			</div>
		)
	}
}

export default class SlideShow extends Component {
	state = {
		key: 0
	}

	willEnter() {
		return {x: -100}
	}

	willLeave() {
		return { x: spring(100) }
	}

	handleNext = () => {
		if (this.state.key + 1 > 1) {
			this.setState({ key: 0 })
		} else {
			this.setState({ key: 1 })
		}
	}

	render() {
		return (
			<TransitionMotion
				willEnter={this.willEnter}
				willLeave={this.willLeave}
				defaultStyles={
					[
						{
							key: this.state.key.toString(),
							style: {
								x: -100
							}
						}
					]
				}
				styles={
					[{
						key: this.state.key,
						style: {
							x: spring(0)
						}
					}]
				}>
				{
					styles => <div className="SlideShow-wrapper" style={{ color: 'white' }}>
						{
							styles.map(style => {
								return (
									<Slide k={parseInt(style.key)} onNext={this.handleNext} key={style.key} style={style.style} />
								)
							})
						}
					</div>
				}
			</TransitionMotion>
		)
	}
}
