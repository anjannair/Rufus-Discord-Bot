const Discord = require('discord.js');
const lineReader = require('line-reader');
const config = require('../config.json');
const index = require('../index');
const bot = index.client;
module.exports = message => {
	var j = 0;
	function isValidURL(string) {
		//regex for link
		// eslint-disable-next-line no-useless-escape
		const res = string.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
		return (res !== null);
	}
	if (isValidURL(message.content.toLowerCase()) == true) {
		var a = message.id;
		//do not open any link mentioned in the dangurls text file. You have been warned
		lineReader.eachLine('commands/admin/dangurls.txt', (line, last) => {
			if (message.content.toLowerCase().startsWith("https://www." + line) || (message.content.toLowerCase().startsWith("http://www." + line)) || (message.content.toLowerCase().startsWith(line)) || (message.content.toLowerCase().startsWith("http://" + line)) || (message.content.toLowerCase().startsWith("https://" + line))) {
				message.channel.messages.fetch(a).then(msg => msg.delete({ timeout: 1000 }));
				let links = new Discord.MessageEmbed()
					.setColor('#E7A700')
					.setTitle(`⚠ This link is DANGEROUS ⚠`)
					.setDescription(`${message.author}`)
					.setFooter("This filter is in beta. False negatives are possible but very rare. If you got this warning be careful of the link");

				message.reply(links).catch(err => {
					message.reply("An error occured");
				});
				j++;
				return false;
			}
		});
	}
	if (j > 0) {
		const nvt = require('node-virustotal');
		const defaultTimedInstance = nvt.makeAPI();
		const theSameObject = defaultTimedInstance.domainLookup(message.content.toLowerCase(), function (err, res) {
			if (err) {
				console.log('Virustotal API did not work because:');
				console.log(err);
				return;
			}
			var road = JSON.parse(res);
			if (road.data.attributes.last_analysis_results.Kaspersky.result != "clean") {
				let links = new Discord.MessageEmbed()
					.setColor('#E7A700')
					.setTitle(`⚠ This link is ${road.data.attributes.last_analysis_results.Kaspersky.result.toUpperCase()} ⚠`)
					.setDescription(`${message.author}`)
					.setFooter("This filter is in beta. False negatives are possible but very rare. If you got this warning be careful of the link");

				message.reply(links).catch(err => {
					return message.reply("An error occured");
				});
			}
		});
	}
};

module.exports.help = {
	event: 'message'
};