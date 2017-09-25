import React, { Component } from 'react';
import { TransitionMotion, spring } from 'react-motion';
import SlideShowControlButtons from './SlideShowControlButtons';
import FrontSlide from './FrontSlide';
import tinycolor from 'tinycolor2';

import './SlideShow.css';

function FakeSlide(prop) {
	return <div className="FakeSlide-wrapper"><h1>FakeSlide: #{prop.n}</h1></div>
}

const slides = [
	{
		slide: <FrontSlide />,
		backgroundColor: 'black',
	},
	{
		slide: <FakeSlide n={1} />,
		backgroundColor: 'darkgray',
	},
	{
		slide: <FakeSlide n={2} />,
		backgroundColor: 'gray'
	}
];

class Slide extends Component {
	render() {
		return (
			<div className="Slide" style={{
				backgroundColor: slides[parseInt(this.props.slideNumber)].backgroundColor,
				transform: `translateY(${this.props.style.h}%)`,
			}}>
				{ React.cloneElement(slides[this.props.slideNumber].slide,
					{ transition: this.props.style }) }
			</div>
		)
	}
}

export default class SlideShow extends Component {
	state = {
		current: 0,
		direction: 'right',
		transitioning: false,
	}

	willLeave = () => {
		return { h: spring(this.state.direction === 'right' ? -100 : 100) };
	}

	willEnter = () => {
		return { h: this.state.direction === 'right' ? 100 : -100 };
	}

	didLeave = left => {
		this.setState({ transitioning: false });
	}

	handlePrevSlide = () => {
		const next = this.state.current === 0 ? slides.length - 1 : this.state.current - 1;
		this.setState({ current: next, direction: 'left', transitioning: true });
	}

	handleNextSlide = () => {
		const next = this.state.current === slides.length - 1 ? 0 : this.state.current + 1;
		this.setState({ current: next, direction: 'right', transitioning: true });
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
		const diff = (this.state.touchstarty - this.state.touchendy)
		if (diff > 100)
			this.handleNextSlide();
		else if (diff < -100)
			this.handlePrevSlide();
	}

	handleWheel = (event) => {
		const d = event.deltaY;
		if (this.state.transitioning)
			return

		if (d > 0) {
			this.handleNextSlide();
		} else if (d < 0) {
			this.handlePrevSlide();
		}
	}

	render() {
		const color = tinycolor(slides[this.state.current].backgroundColor);
		window.color = color;

		return (
			<div className="SlideShow-wrapper" style={{ color: color }}
				onTouchStart={this.handleTouchStart}
				onTouchMove={this.handleTouchMove}
				onTouchEnd={this.handleTouchEnd}
				onWheel={this.handleWheel}
				>
				<TransitionMotion
					styles={
						[
							{
								key: this.state.current.toString(),
								style: {
									h: spring(0),
								},
							},
						]
					}
					willLeave={this.willLeave}
					willEnter={this.willEnter}
					didLeave={this.didLeave}
				>
				{
					configs => (
						<div>
						{
							configs.map(config => {
								return (
									<Slide key={config.key} slideNumber={config.key} style={config.style} />
								)
							})
						}
						</div>
					)
				}
				</TransitionMotion>

				<SlideShowControlButtons
					onNext={this.handleNextSlide}
					onPrev={this.handlePrevSlide}
					background={color.isDark() ? color.brighten(50) : color.darken(50)}
				/>
			</div>
		)
	}
}
