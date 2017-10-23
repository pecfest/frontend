import React, { Component } from 'react';
import Loader from './Loader';
import { Link } from 'react-router-dom';
import user from './user';

import './Profile.css';

class AccomodationForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			accomo: props.accomo,
			changed: false,
			email: '',
			message: '',
			messageType: 0,
			status: 'Save'
		}
	}

	handleChange = ({target}) => {
		this.setState({ accomo: target.checked, changed: true })
	}

	handleSubmit = event => {
		event.preventDefault();
		event.stopPropagation();
		if (!this.state.changed) {
			return;
		}
		if (this.state.email.length < 1) {
			this.setState({ message: 'Please check the Email ID.', messageType: 1, status: 'Save' })
			return;
		}

		console.log(this.state.accomo)
		user.changeDetails(this.state.email, this.state.accomo, {
			onSuccess: () => {
				this.setState({ changed: false, message: 'Successfully updated information.', messageType: 0, status: 'Save' })
			},
			onFailed: (err) => {
				this.setState({ message: err.message || 'Unable to update information.', status: 'Save', messageType: 1 });
			}
		});

		this.setState({ status: 'Saving' })
	}

	handlePhone = ({target}) => {
		this.setState({ email: target.value });
	}

	render() {
		return (
			<form className={"AccomodationForm" + " " + (this.state.changed && "Accomo-changed") } onSubmit={this.handleSubmit}>
				<div className={"Accomo-" + (this.state.messageType == 1 ? "error" : "success")}>{this.state.message}</div>
				<div className="AccomoElement">
					<label className="Acco-label" htmlFor="accmodation">Accomodation: </label>
					<input type="checkbox" defaultChecked={this.props.accomo} onChange={this.handleChange} />
				</div>
				{
					this.state.changed ?
						<div>
							<div className="AccomoElement">
								<label className="Acco-label" htmlFor="email">Enter your email ID: </label>
								<input type="email" onChange={this.handlePhone} />
							</div>
							<div className="">
								<input type="submit" className="FormButton" value={this.state.status} disabled={this.state.status !== 'Save'} />
								<input type="button" className="FormButton" value="Cancel" disabled={this.state.status !== 'Save'} onClick={() => this.setState({ changed: false })} />
							</div>
						</div> : ""
				}
			</form>
		)
	}
}

export default class Profile extends Component {
	state = {
		loading: true,
		showMessage: !user.isLoggedIn(),
	}

	componentDidMount() {
		user.getUser({
			onSuccess: (user) => {
				this.setState({ user, loading: false });
			},
			onFailed: (err) => {
				if (err) {
					this.setState({ message: err.message || 'Failed to login', showMessage: true})
				} else {
					this.setState({ message: 'Failed to login', showMessage: true });
				}
			}
		});
	}


	render() {
		console.log(this.state)
		if (this.state.showMessage) {
			return (
				<div className="Profile-wrapper">
					<div className="Profile-message">
						<p>Please login to view/update profile information.</p>
						<p><Link to="/register?continue=/profile">Login</Link></p>
					</div>
				</div>
			)
		}


		const user_ = this.state.user;

		return (
			<div className="Profile-wrapper">
			{
				this.state.loading ? <Loader color="rgba(0, 0, 0, 0.7)" /> :
					<div className="Profile">
						<small className="Profile-short">PECFEST ID</small>
						<div className="Profile-pecfestId Profile-information">
							{ user_.pecfestId }
						</div>
						<small className="Profile-short">Name</small>
						<div className="Profile-name Profile-information">
							{ user_.name }
						</div>
						<small className="Profile-short">College</small>
						<div className="Profile-college Profile-information">
							{ user_.college }
						</div>
						<small className="Profile-short">Other details</small>
						<div className="Profile-accomodation Profile-information">
							<AccomodationForm accomo={!!parseInt(user_.accomodation)} />
						</div>
					</div>
			}
			</div>
		)
	}
}
