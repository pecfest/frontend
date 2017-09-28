function validateId(pecfestId, config) {
	if (typeof pecfestId !== 'string' || pecfestId.length < 5) {
		setTimeout(config.onError);
	}

	setTimeout(pecfestId === 'prince' ? config.onSuccess : config.onError, 1000);
}

export { validateId };
