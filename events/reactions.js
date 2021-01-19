module.exports = message => {
	if (message.content.toLowerCase() === 'fruits') {
		message.react('🍎')
			.then(() => message.react('🍊'))
			.then(() => message.react('🍇'))
			.catch(() => console.error('One of the emojis failed to react.'));
	}
	else if (message.content.toLowerCase() === 'noob') {
		message.react('😑')
			.catch(() => console.error('One of the emojis failed to react.'));
	}
	else if (message.content.toLowerCase() === '69') {
		message.react('🇳')
			.then(() => message.react('ℹ️'))
			.then(() => message.react('🇨'))
			.then(() => message.react('🇪'))
			.catch(() => console.error('One of the emojis failed to react.'));
	}

};
module.exports.help = {
	event: 'message'
};