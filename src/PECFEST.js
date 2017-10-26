import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Activities from './EventView/Activities';
import Events from './EventView/Events';
import PecFest2016 from './PecFest2016';
import Hospi from './Hospi';
import Team from './Team';
import Lectures from './Lectures';
import Event from './Event';
import IntroSlides from './IntroSlides';
import SignUpOrLogInForm from './SignUpOrLogInForm';
import Sponsors from './napp';
import sponsors from './sponsors';
import YWC from './youwecan';
import NavigationButton from './NavigationButton';
import FeedbackDialogBox from './FeedbackDialogBox';

import './PECFEST.css';

class NotFound extends Component {
	render() {
		return (
			<h2>Page you are looking for does not exist.</h2>
		)
	}
}

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
						<Route path="/hospitality" exact component={Hospi} />
						<Route path="/team" exact component={Team} />
						<Route path="/sponsors" exact component={() => <Sponsors data={sponsors} />} />
						<Route path="/social" exact component={() => <YWC data={sponsors} />} />
						<Route path="/register" exact component={SignUpOrLogInForm} />
						<Route path="/activities/Lectures" exact component={Lectures} />
					</div>
					<NavigationButton />
					<FeedbackDialogBox />
				</div>
			</BrowserRouter>
		)
	}
}