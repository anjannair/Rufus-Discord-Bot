const Discord = require("discord.js");
const request = require("request");

/***
* @param {Discord.client} bot the discord bot client.
* @param {Discord.messsage} message the initial message sent by the user.
* @param {array} args an array of arguments
 */
module.exports.run = async (bot, message, args) => {
	let url = "https://covid19.mathdro.id/api/countries/IN";

	return request(url, (err, response, body) => {
			if (err) throw(err);
			var data = JSON.parse(body);

			let vaccine = new Discord.MessageEmbed()
				.setColor('#E7A700')
				.setTitle("COVID-19 in India")
                .addField("Confirmed Cases", data.confirmed.value)
                .addField("Recovered", data.recovered.value)
                .addField("Deaths",data.deaths.value)
                .setImage("https://covid19.mathdro.id/api/countries/IN/og");

			message.channel.send(vaccine).catch(console.error);			
        });
        
};

module.exports.help = {
	name: "covid",
    aliases: ['corona','covid19','coronavirus']
};
