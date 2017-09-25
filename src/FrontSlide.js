import React, { Component } from 'react';
import anime from 'animejs';
import moment from 'moment';
import './FrontSlide.css';

class Title extends Component {
	componentDidMount() {

	}

	render() {
		const letters = this.props.value.split('').map((letter, i) => {
			return (
				<span className="Title-letter" key={i}>{letter}</span>
			)
		});

		return (
			<h1 ref="h1" className="Title" style={{}}>{letters}</h1>
		)
	}
}

export default class FrontSlide extends Component {
	componentDidMount() {

	}

	render() {
		return (
			<div className="FrontSlide-wrapper"
				style={{
					transformOrigin: 'center',
					marginTop: '4em',
					transform: `translateY(${this.props.transition.h}%)`,
					opacity: 1 - this.props.transition.h / 100,
					perspective: '20px',
				}}
			>
				<div className="FrontSlide" ref="frontSlide">
					<Title value="PECFEST" />
					<div className="FrontSlide-Dates">
						<small><span style={{color: 'white'}}>27</span>th October - <span style={{color: 'white'}}>29</span>th October</small>
					</div>
					<div className="FrontSlide-Timeleft">
						<small>Only <span style={{ color: 'white' }}>{moment([2017, 10, 27]).fromNow(true)}</span> left</small>
					</div>
				</div>
			</div>
		)
	}
}
