import React, { Component } from 'react';
import NavigationDialog from './NavigationDialog';

import './NavigationButton.css';

export default class NavigationButton extends Component {
	state = {
		navigation: false,
	}

	handleClick = () => {
		this.setState({ navigation: true });
	}

	handleClose = () => {
		this.setState({ navigation: false });
	}

	render() {
		return (
			<div className="Navigation-wrapper">
				<button className="Button NavigationButton" onClick={this.handleClick}>
					<i className={"fa fa-" + (this.state.navigation ? 'times' : 'bars')} />
				</button>
				{
					this.state.navigation ? <NavigationDialog onTransition={()=>{}} onClose={this.handleClose} /> : ""
				}
			</div>
		)
	}
}
