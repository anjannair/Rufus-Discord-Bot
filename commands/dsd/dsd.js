const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
	const tutembed = new discord.MessageEmbed()
		.setColor('#E7A700')
		.setTitle('Digital System Design')
		.setDescription(`
		The default prefix for this bot is * 
		\`\`\`*dectobin\`\`\` Convert decimal to binary accurate upto 2 decimal places
		\`\`\`*dectooct\`\`\` Convert decimal to octal accurate upto 2 decimal places
		\`\`\`*dectohex\`\`\` Convert decimal to hex accurate upto 2 decimal places
		\`\`\`*bintodec\`\`\` Convert binary to decimal
		\`\`\`*bintooct\`\`\` Convert binary to octal
		\`\`\`*bintohex\`\`\` Convert binary to hex
		\`\`\`*octtodec\`\`\` Convert octal to decimal
		\`\`\`*octtobin\`\`\` Convert octal to binary
		\`\`\`*octtohex\`\`\` Convert octal to hex
		\`\`\`*hextodec\`\`\` Convert hex to decimal
		\`\`\`*hextobin\`\`\` Convert hex to binary
		\`\`\`*hextooct\`\`\` Convert hex to oct`);
		message.channel.send(tutembed);
};

module.exports.help = {
	name: "dsd",
    aliases: []
};