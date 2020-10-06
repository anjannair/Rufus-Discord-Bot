const Discord = require('discord.js');
const config = require('../config.json');
const index = require('../index');
const bot = index.client;
const request = require('request');
module.exports = async message => {
	if (message.content.startsWith("https://www.amazon.in")) {
		var code = null;
		var finlink = message.content.split('');
		for (var i = 0; i < finlink.length; i++) {
			if (finlink[i] == "B" && finlink[i + 1] == "0")//This method can be used for Amazon.com/ any country's Amazon site too
			{
				code = finlink[i] + finlink[i + 1] + finlink[i + 2] + finlink[i + 3] + finlink[i + 4] + finlink[i + 5] + finlink[i + 6] + finlink[i + 7] + finlink[i + 8] + finlink[i + 9];
				break;
			}
		}

		/*If you notice the ReviewMeta website it uses a code which is found in amazons link 
		We find the code, store it and utilize it*/

		if (!code) return message.channel.send("Are you sure that is a product?");
		var url = `https://reviewmeta.com/api/amazon-in/${code}`;
		return request(url, (err, response, body) => {
			if (err) throw (err);
			var data = JSON.parse(body);
			const embed = new Discord.MessageEmbed()
				.setColor('#EFFF00')
				.setTitle(data.title)
				.setURL(data.href)
				.setImage(data.image)
				.addFields(
					{ name: 'ReviewMeta Rating', value: data.rating }
				)
				.setFooter('\n\nSometimes the rating may not load due to caching issues. Just click on the link to get the review.');

			message.channel.send(embed).catch(console.error);
		});
	}
};

module.exports.help = {
	event: 'message'
};