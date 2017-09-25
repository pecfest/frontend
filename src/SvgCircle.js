import React, { Component } from 'react';
import Background from './Background';
import anime from 'animejs';

import './SvgCircle.css';

export default class SvgCircle extends Component {
	state = {
		resize: 1
	}

	resizeHandler =  () => this.setState({ resize: this.state.resize + 1 })

	componentDidMount() {
		window.addEventListener('resize', this.resizeHandler);

		this.anim = anime({
			targets: 'circle',
			scale: 0.7,
			opacity: 1,
			rotateY: '0.5turn',
			easing: 'easeOutExpo',
			duration: 3000
		});

		const radius = window.innerHeight / 2;
		const perimeter = 2 * Math.PI * radius;

		this.refs.circle.style.strokeDashoffset = -perimeter + 1;
		this.refs.circle.style.transition = 'stroke-dashoffset 1s';
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.resizeHandler);
	}

	componentDidUpdate() {
		const radius = window.innerHeight / 2;
		const perimeter = 2 * Math.PI * radius;
		const progress = perimeter * this.props.progress / 100;
		this.refs.circle.style.strokeDashoffset = -perimeter + progress;
	}

	render() {
		const radius = window.innerHeight / 2;
		const perimeter = 2 * Math.PI * radius;
		const progress = perimeter * this.props.progress / 100;

		return (
			<Background>
				<svg id="Progress-background" width={window.innerWidth} height={window.innerHeight}>
					<circle
						cx={window.innerWidth / 2}
						cy={window.innerHeight / 2}
						r={radius}
						stroke="rgba(0, 0, 0, 0.5)"
						style={{ strokeWidth: 0.5, fill: 'none', transformOrigin: 'center' }}
					/>
					<circle id="progress" ref="circle"
						onTransitionEnd={this.props.onTransitionEnd}
						cx={window.innerWidth / 2}
						cy={window.innerHeight / 2}
						r={radius}
						stroke="rgba(0, 0, 0, 1)"
						strokeDasharray={perimeter}
						strokeDashoffset={0}
						style={{ strokeWidth: 1, fill: 'none', transformOrigin: 'center', transform: 'rotateZ(90deg)' }}
					/>
				</svg>
			</Background>
		)
	}
}