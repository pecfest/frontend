import React, { Component } from 'react';
import anime from 'animejs';

import './Divider.css';

class Divider extends Component {
	componentDidMount() {
		this.anim = anime({
			target: this.refs.divider,
			width: '100%',
			easing: 'easeInQuad',
			delay: 100,
		})
	}

	componentWillUnmount() {
		this.anim.pause();
	}

	render() {
		return (
			<div ref="divider" className="Divider" {...this.props} />
		)
	}
}

export default Divider;
