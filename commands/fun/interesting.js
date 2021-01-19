const Discord = require("discord.js");
const fetch = require("node-fetch");
const { Command } = require('discord.js-commando');

module.exports = class rufus extends Command {
	constructor(client) {
		super(client, {
			name: 'interesting',
			group: 'misc',
			memberName: 'interesting',
			description: 'Interesting facts and posts!',
			guildOnly: true,
		});
	}

	async run(message) {
		//var interval = setInterval (function () {
		let urls = ["https://meme-api.herokuapp.com/gimme/mildlyinteresting", "https://meme-api.herokuapp.com/gimme/interestingasfuck", "https://meme-api.herokuapp.com/gimme/damnthatsinteresting"];

		let subreddit = urls[Math.floor(Math.random() * urls.length)];
		let datafetcher = subreddit;
        let response = await fetch(datafetcher);
        let data = await response.json();

		let meme = new Discord.MessageEmbed()
			.setColor('#E7A700')
			.setTitle(data.title)
			.setImage(data.url);

		message.channel.send(meme).catch(console.error);
	}
};
