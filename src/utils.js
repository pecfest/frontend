import { api } from './eventdb';

function validateId(pecfestId, config) {
	if (typeof pecfestId !== 'string' || pecfestId.length < 5) {
		setTimeout(config.onError);
	}

	fetch(api.url + 'user/' + pecfestId)
		.then(data => data.json())
		.then(user => {
			if (user.ACK === 'SUCCESS') {
				config.onSuccess(user);
			} else {
				config.onError(user);
			}
		})
		.catch(err => config.onError(err));
}

export { validateId };
