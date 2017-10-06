import React, { Component } from 'react';

import './Loader.css'

/* https://codepen.io/tashfene/pen/raEqrJ */
export default class Loader extends Component {
	componentDidMount() {
		this.loader.addEventListener('animationiteration', this.props.onAnimationIteration);
		if (this.props.getRef)
			this.props.getRef(this.loader);
	}

	render() {

		const style = {}
		const innerStyle = {}
		if (typeof this.props.color !== 'undefined') {
			innerStyle.backgroundColor = this.props.color;
			style.border = '2px solid ' + this.props.color;
		}
		return (
			<span ref={ref => this.loader = ref} className="loader" style={style}><span style={innerStyle} className="loader-inner"></span></span>
		)
	}
}
