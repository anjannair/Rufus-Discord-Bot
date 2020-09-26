const discord = require("discord.js");
const fetch = require('node-fetch');
const querystring = require('querystring');

module.exports.run = async (bot, message, args) => {
if (!args.length) return message.channel.send('You need to supply a search term!');

const query = querystring.stringify({ term: args.join(' ') });

const { list } = await fetch(`https://api.urbandictionary.com/v0/define?${query}`).then(response => response.json());

if (!list.length) return message.channel.send(`No results found for **${args.join(' ')}**.`);

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
};

module.exports.help = {
	name: "urban",
    aliases: ['urbandict']
};