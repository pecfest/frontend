import React, { Component } from 'react';
import anime from 'animejs';
import { Link } from 'react-router-dom';

import links from './links';

import './Navbar.css';

export default class Navbar extends Component {
	componentDidMount() {
		anime({
			targets: '.Navbar-link',
			translateY: [ '-100px', '0%'],
			opacity: [0 , 1],
			delay: (el, i, l) => 2000 + i * 100,
			easing: 'easeOutExpo'
		});
	}

	render() {
		return (
			<div className="Navbar-wrapper">
			<nav className="Navbar">
			{
				links.map(link => (
					<Link className="Navbar-link" key={link.to} to={link.to}>{link.name}</Link>
				))
			}
			</nav>
			</div>
		)
	}
}
