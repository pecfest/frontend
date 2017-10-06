import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Activities from './EventView/Activities';
import Events from './EventView/Events';
import PecFest2016 from './PecFest2016';
import Event from './Event';
import IntroSlides from './IntroSlides';
import SignUpOrLogInForm from './SignUpOrLogInForm';

import NavigationButton from './NavigationButton';

import './PECFEST.css';

export default class PECFEST extends Component {
	render() {
		return (
			<BrowserRouter>
				<div className="PECFEST-root">
					<div className="content">
						<Route path="/" exact component={IntroSlides} />
						<Route path="/activities" exact component={Activities} />
						<Route
							path="/activities/:activityId/events"
							exact
							component={Events}
						/>
						<Route path="/events/:eventId" exact component={Event} />
						<Route path="/pecfest2016" exact component={PecFest2016} />
						<Route path="/register" exact component={SignUpOrLogInForm} />
					</div>
					<NavigationButton />
				</div>
			</BrowserRouter>
		)
	}
}