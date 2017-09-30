import React, { Component } from 'react';
import BackgroundCanvas from './BackgroundCanvas';
import { Link } from 'react-router-dom';
import anime from 'animejs';
import moment from 'moment';
import './FrontSlide.css';

class Title extends Component {
	componentDidMount() {
		const letters = document.querySelectorAll('.Title-letter')
		this.animation = anime({
			targets: letters,
			translateY: [ '100%', '0%' ],
			opacity: [ 0, 1 ],
			delay: (el, i, l) => {
				return i * 50
			},
			duration: 2000,
		})
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
			<div className="FrontSlide-wrapper">
				<div className="FrontSlide" ref="frontSlide">
					<Title value="PECFEST" />
					<div className="FrontSlide-Dates">
						<small style={{fontWeight: '700', display: 'block', marginBottom: '2em'}}><span style={{color: 'white'}}>27</span>th October - <span style={{color: 'white'}}>29</span>th October</small>
					</div>
					<div className="divider" />
					<div className="FrontSlide-register">
						<Link className="FrontSlide-registerLink" to="/register">Register</Link>
					</div>
				</div>
			</div>
		)
	}
}
