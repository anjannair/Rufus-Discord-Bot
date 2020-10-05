const Discord = require('discord.js');
const lineReader = require('line-reader');
module.exports = message => {
	if (!message.guild) return;
	if (message.guild.id == '756813837218349056' && message.channel.id != '758267577683804171') { //you can customize the guild and channel you want it in like this. Remove the if statement to implement it globally
		var j = 0;
		var plit = message.content.toLowerCase();
		var words = plit.split(" ");
		lineReader.eachLine('../commands/admin/bannedwords.txt', (line, last) => { //create a banned.txt
			for (var i = 0; i < words.length; i++) {
				if (words[i].trim().includes(line)) {
					console.log(plit); //incase you want to improve the filter
					message.delete({ timeout: 1000 });
					j++;
					break;
				}
			}
			if (j > 0) {
				var embs = new Discord.MessageEmbed()
					.setColor('#FF0000')
					.setTitle(`WARNED`)
					.setDescription(`Do NOT use cuss words here!! \n\nIf you think this is an error contact <@414992506665828364> as this filter is still in beta`);
				message.channel.send(embs);
				return false;
			}
		});
	}
};
module.exports.help = {
	event: 'message'
};