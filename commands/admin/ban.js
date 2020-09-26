const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
	var a = message.id;

	if(!message.member.hasPermission('BAN_MEMBERS')) return message.reply("You do not have the permission to do that!");

	var user = message.mentions.users.first();

	if(!user) return message.reply("You did not mention anyone");

	var reas = args.splice(1).join(' ');
	if(!reas) return message.reply("You need to give a reason");
	if(user.hasPermission('ADMINISTRATOR')) return message.reply("Sadly you cannot kick an admin");
	var jad = "";

	var embs = new discord.MessageEmbed()
		.setColor('#E7A700')		//hex color
		.setTitle(`BANNED`)
		.addField('User: ',user,true)
		.addField('By: ',message.author,true)
		.addField('Reason: ',reas);
	message.channel.messages.fetch(a).then(msg => msg.delete({ timeout: 1000 }));
	await user.send(`You were banned from ${user.guild} for: ${reas}`);
	await message.guild.members.ban(user).catch(err =>{
		jad = err;
	});
	if(!jad){
		return message.channel.send(embs);
	}
	else{
		return message.channel.send("An error occured. This happens when I don't have necessary permissions!!\n\nTip: Bots have complicated permissions. Kick them manually.");
	}

};


module.exports.help = {
	name: "ban",
    aliases: []
};
