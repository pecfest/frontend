import React, { Component } from 'react';
import { Motion, spring } from 'react-motion';
import SvgCircle from './SvgCircle';
import './Progress.css';

export default class Progress extends Component {
	state = {
		working: true,
		progress: 0,
	}

	prevProgress = 0

	handleTransitionEnd = () => {
		if (this.props.progress >= this.props.total) {
			this.setState({ working: false });
		}

		if (this.state.working == false) {
			this.props.onComplete();
			return;
		}
	}

	render() {
		const progress = this.props.progress / this.props.total * 100;


		const styles = {};

		if (!this.state.working) {
			styles.height = 0;
		} else {
			styles.height = '2em'
		}

		return (
			<div className="Progress-wrapper" style={Object.assign({}, { opacity: this.state.working ? 1 : 0, transition: 'all 1s' }, styles)} onTransitionEnd={this.handleTransitionEnd}>
				<div className="Progress">
					<Motion defaultStyle={{ value: this.prevProgress }} style={{ value: spring(progress) }}>
					{
						value => (<div className="Progress-percent">{(this.prevProgress = value.value).toFixed()}%</div>)
					}
					</Motion>
				</div>
				<SvgCircle progress={progress}
					onTransitionEnd={this.handleTransitionEnd} />
			</div>
		)
	}
}
