/* eslint-disable no-useless-escape */
const { CommandoClient } = require('discord.js-commando');
const fs = require("fs");
const Discord = require("discord.js");
const fetch = require('node-fetch');
const Canvas = require('canvas');
const path = require('path');
const request = require('request');
const TicTacToe = require('discord-tictactoe');
const lineReader = require('line-reader');
require('dotenv').config();
const config = require(path.resolve(__dirname, "config.json"));

const client = new CommandoClient({
	commandPrefix: config.prefix,
	owner: process.env.OWNERS.split(','),	//if you're helping in developing this add your ID
	disableMentions: 'everyone',
	ws: { intents: Discord.Intents.ALL }
});

client.registry
	.registerDefaultTypes()
	.registerGroups([ //Classifies each command and sorts it
		['admin', 'All the tools for the server'],	//for all the tools
		['dsd', 'All conversions for Digital System Designs'],
		['misc', 'Miscellaneous games and stuff'],
		['newbie', 'All information for newbies'],
	])
	.registerDefaultGroups()
	.registerDefaultCommands({
		ping: false,
		prefix: false,
		commandState: false,
		unknownCommand: false,
	})
	.registerCommandsIn(path.join(__dirname, 'commands'));

//on ready
client.once('ready', () => {
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
			client.user.setActivity(config.activity.game4, { type: 'PLAYING' });
		}
	}, 1 * 40000);
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