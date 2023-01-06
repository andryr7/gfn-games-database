function addDelay (waitTime) {
	return new Promise ((resolve) => {
		setTimeout(() => {
		resolve(true);
		}, waitTime);
	});
};

module.exports = addDelay;