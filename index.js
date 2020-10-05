const fs = require("fs");
const Discord = require('discord.js');
const Canvas = require('canvas');
const lineReader = require('line-reader');
const request = require("request");
const config = require("./config.json");
const TicTacToe = require('discord-tictactoe');
const { fips } = require("crypto");
const bot = new Discord.Client({ ws: { intents: Discord.Intents.ALL } });
bot.aliases = new Discord.Collection();
bot.dsd = new Discord.Collection();
bot.admin = new Discord.Collection();
bot.newbie = new Discord.Collection();
bot.commands = new Discord.Collection();

//exports
// add stuff you need from the main file into this object
// then use 
/*
 const index = require('./index');
 const something = index.something;
*/
module.exports = {
	client: bot,
}

// add events by using this format
/* 
	module.exports = parameter => {
		code
	}
	module.exports.help = {
		event: 'EVENTNAME
	}
*/

fs.readdir('./events', (err, files) => {
	if (err) return console.log(err)
	let jsFiles = files.filter(file => file.split('.').pop() === 'js');
	jsFiles.forEach(file => {
		const prop = require(`./events/${file}`)
		bot.on(prop.help.event, prop)
	})
})


//commands
//add commands by either adding them into the folders, or create a new folder.
//When adding new folders, the folders must match up with the collections unless there is no collection in which you have to edit line number 66 and add that folder

fs.readdir('./commands/', (err, files) => {
	const folders = files.filter(item => !item.includes('.'));
	folders.forEach(folder => {
		fs.readdir(`./commands/${folder}`, (er, f) => {
			const jsFiles = f.filter(file => file.split('.').pop() === 'js');
			if (jsFiles.length <= 0) {
				console.log(`${folder} conversions couldn't load`);
				return;
			}

			console.log(`loading ${jsFiles.length} ${folder} commands...`);
			jsFiles.forEach(singleFile => {

				let props = require(`./commands/${folder}/${singleFile}`);
				console.log(`${singleFile} loaded`);
				if (folder !== 'misc') {
					bot[folder].set(props.help.name, props);
				}
				props.help.aliases.forEach(alias => {
					bot.aliases.set(alias, props.help.name);
				});
			});
		});
	});
})

//from the package TicTackToe for the game tictactoe
new TicTacToe({
	language: 'en',
	command: '*ttt'
}, bot);


bot.login(process.env.TOKEN)