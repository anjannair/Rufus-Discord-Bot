const Discord = require("discord.js");
const request = require("request");
const { Command } = require('discord.js-commando');

module.exports = class rufus extends Command {
	constructor(client) {
		super(client, {
			name: 'covid',
			group: 'misc',
			aliases: ['corona', 'coronavirus'],
			memberName: 'covid',
			description: 'Get covid stats of Mumbai',
			guildOnly: true,
		});
	}

	async run(message) {
		let url = "https://api.covid19india.org/v4/data.json";

		return request(url, (err, response, body) => {
			if (err) throw (err);
			var data = JSON.parse(body);

			let vaccine = new Discord.MessageEmbed()
				.setColor('#E7A700')
				.setTitle("COVID-19 in Mumbai")
				.addField("Confirmed Cases", data.MH.districts.Mumbai.total.confirmed)
				.addField("Recovered", data.MH.districts.Mumbai.total.recovered)
				.addField("Deaths", data.MH.districts.Mumbai.total.deceased)
				.addField("Tested", data.MH.districts.Mumbai.total.tested)
				.setImage("https://www.mumbailive.com/images/media/images/images_1585740004060_Corona.JPG?bg=dfdce0&crop=837%2C469.89473684210526%2C0%2Cnull&fit=crop&fitToScale=w%2C1368%2C768&h=768&height=569&mark=logo.png&markalpha=60&markpad=20&markpos=top-right&w=1368&width=837");

			message.channel.send(vaccine).catch(console.error);
		});

	}
};