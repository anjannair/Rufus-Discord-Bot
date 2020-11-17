const discord = require("discord.js");
const fetch = require('node-fetch');
const querystring = require('querystring');
const { Command } = require('discord.js-commando');

module.exports = class rufus extends Command {
	constructor(client) {
		super(client, {
			name: 'urban',
			group: 'misc',
			memberName: 'urban',
			description: 'Search the urban dictionary',
			guildOnly: true,
			args: [{
				key: 'search',
				prompt: 'What would you like to search?',
				type: 'string',
			}]
		});
	}

	async run(message, { search }) {

		const query = querystring.stringify({ term: search });

		const { list } = await fetch(`https://api.urbandictionary.com/v0/define?${query}`).then(response => response.json());

		if (!list.length) return message.channel.send(`No results found for that.`);

		const [answer] = list;

		const embed = new discord.MessageEmbed()
			.setColor('#EFFF00')
			.setTitle(answer.word)
			.setURL(answer.permalink)
			.addFields(
				{ name: 'Definition', value: answer.definition },
				{ name: 'Example', value: answer.example },
				{ name: 'Rating', value: `${answer.thumbs_up} thumbs up. ${answer.thumbs_down} thumbs down.` },
			);
		message.channel.send(embed);
	}
};