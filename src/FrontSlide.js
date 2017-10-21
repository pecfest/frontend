import React, { Component } from 'react';
import BackgroundCanvas from './BackgroundCanvas';
import { Link } from 'react-router-dom';
import anime from 'animejs';
import moment from 'moment';
import user from './user';
import Divider from './Divider';
import Loader from './Loader';
import './FrontSlide.css';

class Title extends Component {
	render() {
		const letters = this.props.value.split('').map((letter, i) => {
			return (
				<span className="Title-letter" key={i}>{letter}</span>
			)
		})
		return (
			<h1 ref="h1" className="Title">{letters}</h1>
		)
	}
}

class UserInfo extends Component {
	state = {
		loading: true,
	}

	componentDidMount() {
		user.login(user.currentUser.pecfestId, {
			onSuccess: () => {
				this.setState({ loading: false })
			},
			onFailed: (err) => {
				this.handleLogout();
			}
		})
	}

	handleLogout = () => {
		user.logout(user.currentUser.pecfestId, this.props.onLogout);
	}

	render() {
		return (
			<div className="UserInfo">
				{
					this.state.loading ? <Loader /> :
						<div className="UserInfo-user">
						{
							<p style={{ textTransform: 'capitalize' }}>
							Welcome <strong style={{ color: 'white' }}>{user.currentUser.name}</strong>! <button className="FestButton" onClick={this.handleLogout}>Logout?</button>
							</p>
						}
						</div>
				}
			</div>
		)
	}
}


class SocialNetworkingLinks extends Component {
	render() {
		return (
			<div className="SocialNetworkingLinks">
				<div className="SocialNetworkingLinks-list">
					<div className="SocialNetworkingLinks-link animated">
						<a href="https://www.facebook.com/pecfestofficial" target="_blank"><i className="fa fa-facebook-official" /></a>
					</div>
					<div className="SocialNetworkingLinks-link animated">
						<a href="https://www.youtube.com/channel/UCLaByTlNKxBJDkNqbjtUmdw" target="_blank"><i className="fa fa-youtube" /></a>
					</div>
				</div>
			</div>
		)
	}
}

export default class FrontSlide extends Component {
	handleLogout = () => {
		this.setState({ loggedOut: true });
	}

	componentDidUpdate() {
		this.anim = anime.timeline();
		this.anim.add({
			targets: '.Title-letter',
			opacity: [0, 1],
			translateX: [ '20px', '0px'],
			delay: (el, i, l) => {
				return i * 100;
			},
			easing: 'easeOutExpo'
		}).add({
			targets: '.animated',
			opacity: [0, 1],
			translateY: [ '100px', '0px' ],
			delay: (el, i, l) => {
				return i * 200;
			},
			easing: 'easeOutExpo'
		})
	}

	shouldComponentUpdate(nextProps) {
		return this.props.loading != nextProps.loading;
	}

	render() {
		return (
			<div className="FrontSlide-wrapper">
			{
				this.props.loading ?
					<div className="FrontSlide" /> :
					<div className="FrontSlide" ref="frontSlide">
						<div>
							<Title value="PECFEST'17" />
						</div>
						<div className="FrontSlide-extrainfo fadeLate">
							<div className="FrontSlide-Dates animated">
								<small style={{color: 'white', fontWeight: '700', display: 'block', marginBottom: '2em'}}><span style={{color: 'white'}}>27</span>th October - <span style={{color: 'white'}}>29</span>th October</small>
							</div>
							<div className="divider animated">
								<Divider style={{ margin: 'auto', display: 'block' }} />
							</div>
							<div className="FrontSlide-register animated">
							{
								!user.isLoggedIn() ?
									<Link className="btn-2" to="/register">Register</Link>
									: <UserInfo onLogout={this.handleLogout} />
							}
							</div>
							<SocialNetworkingLinks />
						</div>
					</div>
			}
			</div>
		)
	}
}
