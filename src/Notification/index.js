import React, { Component } from 'react';
import Loader from '../Loader';
import './index.css';

export default class NotificationPanel extends Component {
	render() {
		return (
			<div className="NotificationPanel">
				<div className="NotificationPanel-header">
 					Notifications
				</div>
				<div className="Notifications">
					{
						this.state.loading ?
							<Loader />
							: <Notifications notification={this.state.notifications} />
					}
				</div>
			</div>
		)
	}
}
