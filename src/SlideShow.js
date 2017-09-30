import React, { Component } from 'react';
import { TransitionMotion, spring } from 'react-motion';
import SlideShowControlButtons from './SlideShowControlButtons';
import FrontSlide from './FrontSlide';
import BackgroundCanvas from './BackgroundCanvas';

import './SlideShow.css';

export default class SlideShow extends Component {
	render() {

		return (
			<div className="SlideShow-wrapper" style={{ color: 'white' }}>
				<div className="Slide">
					<FrontSlide />
				</div>
				<BackgroundCanvas />
			</div>
		)
	}
}
