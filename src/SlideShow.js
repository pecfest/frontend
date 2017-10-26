import React, { Component } from 'react';
import { TransitionMotion, spring } from 'react-motion';
import SlideShowControlButtons from './SlideShowControlButtons';
import FrontSlide from './FrontSlide';
import MegaShows from './MegaShows/MegaShows';
import Swipeable from './Swipeable';
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
		key: 0,
		prev: false,
	}

	willEnter = () => {
		return {x: this.state.prev ? 100 : -100}
	}

	willLeave = () => {
		return { x: spring(this.state.prev ? -100 : 100) }
	}

	handleNext = () => {
		if (this.state.key + 1 > 1) {
			this.setState({ key: 0, prev: false })
		} else {
			this.setState({ key: 1, prev: false })
		}
	}

	handlePrev = () => {
		if (this.state.key - 1 < 0) {
			this.setState({ key: 1, prev: true })
		} else {
			this.setState({ key: 0, prev: true })
		}
	}

	handleSwipe = (dir) => {
		if (dir == 'up') {
			this.handleNext();
		} else if (dir == 'down') {
			this.handlePrev();
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
								x: this.state.prev ? 100 : -100
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
					styles => <Swipeable onSwipe={this.handleSwipe} className="SlideShow-wrapper" style={{ color: 'white' }}>
						{
							styles.map(style => {
								return (
									<Slide k={parseInt(style.key)} onNext={this.handleNext} key={style.key} style={style.style} />
								)
							})
						}
					</Swipeable>
				}
			</TransitionMotion>
		)
	}
}
