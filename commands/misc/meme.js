const Discord = require("discord.js");
const request = require("request");
const { Command } = require('discord.js-commando');

module.exports = class rufus extends Command {
	constructor(client) {
		super(client, {
			name: 'meme',
			group: 'misc',
			memberName: 'meme',
			aliases: ['memes'],
			description: 'Hot memes from Reddit',
			guildOnly: true,
			clientPermissions: ['ATTACH_FILES'],
			userPermissions: ['ATTACH_FILES'],
		});
	}

	async run(message) {
		//var interval = setInterval (function () {
		let urls = ["https://meme-api.herokuapp.com/gimme/dankmemes", "https://meme-api.herokuapp.com/gimme/wholesomememes", "https://meme-api.herokuapp.com/gimme/memes"];

		let subreddit = urls[Math.floor(Math.random() * urls.length)];
		return request(subreddit, (err, response, body) => {
			if (err) throw (err);
			var data = JSON.parse(body);

			let meme = new Discord.MessageEmbed()
				.setColor('#E7A700')
				.setTitle(data.title)
				.setImage(data.url);

			message.channel.send(meme).catch(console.error);

			/*let postLink = new Discord.MessageEmbed()
			.setColor('#E7A700')
			.addField('Post link', data.postLink)
	
			message.channel.send(postLink);*/
		});
		// }, 1 * 3600000);
	}
};
