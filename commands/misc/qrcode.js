const discord = require("discord.js");
const { Command } = require('discord.js-commando');

module.exports = class rufus extends Command {
	constructor(client) {
		super(client, {
			name: 'qr',
			group: 'misc',
			aliases: ['qrcode'],
			memberName: 'qr',
			description: 'Generate QR code of links',
			guildOnly: true,
			args: [{
				key: 'query',
				prompt: 'Which link do you want to convert to QR?',
				type: 'string',
			}],
			clientPermissions: ['ATTACH_FILES'],
			userPermissions: ['ATTACH_FILES'],
		});
	}

	async run(message, { query }) {
		const neb = query;
		function isValidURL(string) {
			// eslint-disable-next-line no-useless-escape
			const res = string.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
			return (res !== null);
		}
		if (isValidURL(neb) == true) {
			const url = `http://api.qrserver.com/v1/create-qr-code/?data=${neb}&size=100x100`;

			const embed = new discord.MessageEmbed()
				.setColor('#E7A700')
				.setTitle('QR CODE')
				.setImage(url);
			await message.channel.send(embed);
		}
		else return message.reply("Please enter a valid url in the format http(s)://www.example.com");
	}
};