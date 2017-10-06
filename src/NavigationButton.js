import React, { Component } from 'react';
import NavigationDialog from './NavigationDialog';
import { withRouter } from 'react-router-dom';
import Navbar from './Navbar';

import './NavigationButton.css';

class NavigationButton extends Component {
	state = {
		compact: true
	}

	handleClick = () => {
		this.setState({ navigation: true });
	}

	handleClose = () => {
		this.setState({ navigation: false });
	}

	componentDidMount() {
		const { history } = this.props;

		this.unsubscribe = history.listen(this.handleLocationChange);
		this.handleLocationChange(history.location);
	}

	componentWillUnmount() {
		if (this.unsubscribe) this.unsubscribe();
	}

	handleLocationChange = location => {
		if (location.pathname === '/' && !window.checkIfMobile()) {
			this.setState({ compact: false })
		} else {
			this.setState({ compact: true })
		}
	}


	render() {
		return (
			<div className="Navigation-wrapper">
				{
					this.state.compact ?
						<div>
							<button className="Button NavigationButton" onClick={this.handleClick}>
								<i className={"fa fa-" + (this.state.navigation ? 'times' : 'bars')} />
							</button>
							{
								this.state.navigation ? <NavigationDialog onTransition={()=>{}} onClose={this.handleClose} /> : ""
							}
						</div> :
						<Navbar />
				}
			</div>
		)
	}
}

export default withRouter(NavigationButton);
