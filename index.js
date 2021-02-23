/* eslint-disable no-useless-escape */
const { CommandoClient } = require('discord.js-commando');
const fs = require("fs");
const Discord = require("discord.js");
const path = require('path');
const TicTacToe = require('discord-tictactoe');
const Heroku = require('heroku-client');
require('dotenv').config();
const heroku = new Heroku({ token: process.env.HEROKU_API_TOKEN });
const config = require(path.resolve(__dirname, "config.json"));

const client = new CommandoClient({
	commandPrefix: config.prefix,
	owner: process.env.OWNERS.split(','),	//if you're helping in developing this add your ID
	ws: { intents: Discord.Intents.ALL },
	partials: ['MESSAGE']
});

client.registry
	.registerDefaultTypes()
	.registerGroups([ //Classifies each command and sorts it
		['admin', 'All the tools for the server'],	//for all the tools
		['dsd', 'All conversions for Digital System Designs'],
		['misc', 'Miscellaneous games and stuff'],
		['fun', 'All fun commands'],
		['newbie', 'All information for newbies'],
	])
	.registerDefaultGroups()
	.registerDefaultCommands({
		help: false,
		ping: false,
		prefix: false,
		commandState: false,
		unknownCommand: false,
	})
	.registerCommandsIn(path.join(__dirname, 'commands'));

//on ready
client.once('ready', async () => {
	console.log(`${client.user.username} is ready for action!`);
	var interval = setInterval(function () {
		var p = Math.floor(Math.random() * 6);
		if (p == 1) {
			client.user.setActivity(`${client.guilds.cache.size} servers`, { type: 'WATCHING' });
		}
		if (p == 2) {
			client.user.setActivity(`${client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)} members`, { type: 'WATCHING' });
		}
		if (p == 3) {
			client.user.setActivity(config.activity.game1, { type: 'WATCHING' });
		}
		if (p == 4) {
			client.user.setActivity(config.activity.game2, { type: 'PLAYING' });
		}
		if (p == 5) {
			client.user.setActivity(config.activity.game3, { type: 'PLAYING' });
		}
		if (p == 6) {
			client.user.setActivity(config.activity.game4, { type: 'STREAMING' });
		}
		if (p == 7) {
			client.user.setActivity(config.activity.game5, { type: 'STREAMING' });
		}
	}, 1 * 40000);

	//reaction role
	const channel = client.channels.cache.find((channel) => channel.name === config.channel);

	// channel will not contain messages after it is found
	try {
		await channel.messages.fetch();
	} catch (err) {
		console.error('Error fetching channel messages for reaction role');
		return;
	}

	console.log(`Watching message '${config.message_id}' for reactions...`);
	
	/*
	I implemented this feature so that I can know when the bot is deployed on Heroku
	Usually to check if the bot is deployed I need to open Heroku and login everytime
	This can be improvised using this feature
	*/

	const user = client.users.cache.get('<user id>');
	await heroku.get('/apps').then(apps => {
		const embed = new Discord.MessageEmbed()
		.setColor("#E7A700")
		.setDescription("**"+apps[0].name+"** is up and running!")
		.addField("Date",apps[0].updated_at.split('T')[0])
		.addField("UTC Time (+5:30 IST)",apps[0].updated_at.split('T')[1].split('Z')[0]);
		user.send(embed);
	});

});


//parsing events
fs.readdir('./events', (err, files) => {
	if (err) return console.log(err);
	let jsFiles = files.filter(file => file.split('.').pop() === 'js');
	jsFiles.forEach(file => {
		const prop = require(`./events/${file}`);
		client.on(prop.help.event, prop);
	});
});

//from the package TicTackToe for the game tictactoe
new TicTacToe({
	language: 'en',
	command: '*ttt'
}, client);

client.on('error', console.error);

client.login(process.env.TOKEN);