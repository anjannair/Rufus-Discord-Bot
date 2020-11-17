const Discord = require("discord.js");
const request = require("request");
const { Command } = require('discord.js-commando');

module.exports = class rufus extends Command {
	constructor(client) {
		super(client, {
			name: 'fact',
			group: 'misc',
			aliases: ['mathfact'],
			memberName: 'fact',
			description: 'Random number facts',
			guildOnly: true,
		});
	}

	async run(message) {
		let urls = ["http://numbersapi.com/random/year?json", "http://numbersapi.com/random/trivia?json", "http://numbersapi.com/random/date?json", "http://numbersapi.com/random/math?json"];

		let subreddit = urls[Math.floor(Math.random() * urls.length)];
		return request(subreddit, (err, response, body) => {
			if (err) throw (err);
			var data = JSON.parse(body);

			let mathfact = new Discord.MessageEmbed()
				.setColor('#E7A700')
				.setTitle(data.text);
			message.channel.send(mathfact).catch(console.error);
		});
	}
};