module.exports = message => {
	var plit = message.content.toLowerCase();
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
	else if (message.content.startsWith("https://www.youtube.com") || message.content.startsWith("https://youtu.be")) {
		var a = Math.floor(Math.random() * 2);
		if (a == 1) {
			message.react('🇴')
				.then(() => message.react('🅾️'))
				.then(() => message.react('🇫'));
		}

		else if (a == 2) {
			message.react('🇭')
				.then(() => message.react('Ⓜ️'))
				.then(() => message.react('🇲'));
		}

		else {
			message.react('🇳')
				.then(() => message.react('🇴'));
		}
	}
	else if (message.content.toLowerCase() === '69') {
		message.react('🇳')
			.then(() => message.react('ℹ️'))
			.then(() => message.react('🇨'))
			.then(() => message.react('🇪'))
			.catch(() => console.error('One of the emojis failed to react.'));
	}
	else if (plit == "coming" || plit == "coming?" || plit == "anyone coming?" || plit == "anyone coming") {
		message.react('💦')
			.catch(() => console.error('One of the emojis failed to react.'));
	}

};
module.exports.help = {
	event: 'message'
};