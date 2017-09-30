import React, { Component } from 'react';
import { StaggeredMotion, spring } from 'react-motion';
import SlideShow from './SlideShow';
import './IntroSlides.css';

class TransitionLeft extends Component {
	state = {
		ended: false,
	}

	handleEnd = () => {
		setTimeout(this.props.onEnd, 0);
	}

	render() {
		const divs = [
			<div className="IntroSlides-transition black" />,
			<div className="IntroSlides-transition white" />,
			<div className="IntroSlides-transition black" />
		];

		return (
			<StaggeredMotion
				defaultStyles={divs.map(() => ({ h: 0 }))}
				styles={prevStyles => prevStyles.map((_, i) => {
					return i === 0 ? { h: spring(100) } : { h: spring(prevStyles[i - 1].h)};
				})}
			>
			{
				styles => {
					if (styles[styles.length - 1].h === 100) {
						this.handleEnd();
					}

					return (
						<div className="IntroSlides-wrapper">
							{
								styles.map((style, i) => (
									<div className={"IntroSlides-transition " +  (i%2 || i == 0 ? 'white' : 'black')}
										style={{
											transform: `translateX(${100 - style.h}%)`
										}}
										key={i}
									/>
								))
							}
						</div>
					)
				}
			}
			</StaggeredMotion>
		)
	}
}

export default class IntroSlides extends Component {
	state = {
		loading: true,
	}

	componentDidMount() {
	}

	render() {
		if (this.state.loading) {
			return (
				<TransitionLeft onEnd={() => this.setState({loading: false})} />
			)
		}
		return (
			<SlideShow />
		)
	}
}