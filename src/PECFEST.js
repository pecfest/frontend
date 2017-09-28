import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Activities from './EventView/Activities';
import Events from './EventView/Events';
import Event from './Event';
import IntroSlides from './IntroSlides';

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
					</div>
					<NavigationButton />
				</div>

			</BrowserRouter>
		)
	}
}