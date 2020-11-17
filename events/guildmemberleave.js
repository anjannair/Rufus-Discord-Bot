module.exports = async member => {
	if (member.user.bot) return;

	if (member.guild.name.toLowerCase() == 'ace extc 1') {
		var channel = member.guild.channels.cache.find(ch => ch.name === '░°new-user°░👋');
	}
	else {
		var channel = member.guild.channels.cache.find(ch => ch.name === 'welcome');
	}
	if (!channel) return;


	channel.send(`${member.user.username} has left the server. RIP 😢.`);
};
module.exports.help = {
	event: 'guildMemberRemove'
};