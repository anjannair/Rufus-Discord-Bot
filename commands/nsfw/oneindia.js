const Discord = require("discord.js");
const fetch = require('node-fetch');
const { Command } = require('discord.js-commando');

module.exports = class rufus extends Command {
	constructor(client) {
		super(client, {
			name: 'nsfw',
			group: 'nsfw',
			memberName: 'nsfw',
			description: 'Indian content fetched from reddit (Works in NSFW channels)',
			guildOnly: true,
			clientPermissions: ['ATTACH_FILES'],
			userPermissions: ['ATTACH_FILES'],
			args: [{
				key: 'specific',
				type: 'string',
				prompt: 'What type do you want?',
				default: 'indian',
				oneOf: ['indian', 'teen', 'thots'],
			}]
		});
	}

	async run(message, { specific }) {
		if (!message.channel.nsfw) return message.reply("This command can be only used in an NSFW channel");
		if (specific.toLowerCase() == 'indian') {
			let url = "https://meme-api.herokuapp.com/gimme/indiansgonewild";

			let datafetcher = url;
			let response = await fetch(datafetcher);
			let data = await response.json();

			let content = new Discord.MessageEmbed()
				.setColor('#E7A700')
				.setTitle("Post by : " + data.author)
				.setImage(data.url);

			message.channel.send(content).catch(console.error);
		}
		if (specific.toLowerCase() == 'teen') {
			let urls = ["https://meme-api.herokuapp.com/gimme/legalteens","https://meme-api.herokuapp.com/gimme/18_19"];
			let url = urls[Math.floor(Math.random() * urls.length)];
			let datafetcher = url;
			let response = await fetch(datafetcher);
			let data = await response.json();
			let content = new Discord.MessageEmbed()
				.setColor('#E7A700')
				.setTitle("Post by : " + data.author)
				.setImage(data.url);

			message.channel.send(content).catch(console.error);
		}
		if(specific.toLowerCase() == 'thots'){
			let urls = ["https://meme-api.herokuapp.com/gimme/SuperModelIndia","https://meme-api.herokuapp.com/gimme/GirlswithGlasses"];
			let url = urls[Math.floor(Math.random() * urls.length)];
			let datafetcher = url;
			let response = await fetch(datafetcher);
			let data = await response.json();
			let content = new Discord.MessageEmbed()
				.setColor('#E7A700')
				.setTitle("Post by : " + data.author)
				.setImage(data.url);

			message.channel.send(content).catch(console.error);
		}
	}
};