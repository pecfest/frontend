import { api } from './eventdb';

window._user = {
	currentUser: {
		name: 'pecfest_id',
		pecfestId: 'pecfest_id',
	},

	loggedIn: false,

	isLoggedIn() {
		if (window.localStorage) {
			if (window.localStorage.getItem('pecfestId')) {
				const pecfestId = window.localStorage.getItem('pecfestId')
				if (pecfestId.length > 1) {
					this.currentUser.pecfestId = pecfestId
					return true
				}
			}
		}
		return false;
	},

	logout(userId, callback) {
		if (window.localStorage) {
			if (window.localStorage.getItem('pecfestId')) {
				window.setItem('pecfestId', '')
				setTimeout(callback);
			}
		}
	},

	login(userId, config) {
		fetch(api.url + 'user/' + userId.toUpperCase())
			.then(data => data.json())
			.then(user => {
				if (user.ACK !== 'SUCCESS') {
					config.onFailed(user);
					return;
				}
				this.currentUser = user;
				this.loggedIn = true;
				if (typeof window.localStorage !== 'undefined') {
					window.localStorage.setItem('pecfestId', user.pecfestId)
				}
				config.onSuccess(user);
			})
			.catch(err => {
				console.log("This should not happen");
				config.onFailed(err);
			})
	},

	signUp(data, config) {
		fetch(api.url + 'user/create', {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		})
			.then(data => data.json())
			.then(res => {
				if (res.ACK !== 'SUCCESS') {
					config.onFailed(res);
				}

				config.onSuccess(res);
			})
			.catch(err => {
				console.log("This should not happen");
				config.onFailed(err);
			})
	},

	verifyOtp(otp, mobile, config) {
		fetch(api.url + 'user/verify', {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ otp, mobile }),
		})
			.then(data => data.json())
			.then(res => {
				if (res.ACK !== 'SUCCESS') {
					config.onFailed(res);
				}

				config.onSuccess(res.pecfestId);
			})
			.catch(err => {
				console.log("This should not happen");
				config.onFailed(err);
			})
	},

	registerEvent(event, users, leader, config) {
		fetch(api.url + 'event/register', {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ eventId: event.id, team: users, leader })
		})
			.then(data => data.json())
			.then(res => {
				if (res.ACK === 'SUCCESS') {
					config.onSuccess(res)
				} else {
					config.onFailed(res)
				}
			}).catch(res => {
				config.onFailed(res);
			})
	},

	isRegistered(eventId) {
		return false;
	}
}

let user = window._user;

export default user;
