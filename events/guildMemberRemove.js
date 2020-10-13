module.exports = async member => {
	if(member.user.bot) return;

	var channel = member.guild.channels.cache.find(ch => ch.name === 'welcome');//leave channel can be same as welcome channel
	if (!channel) return console.log('Bot failed to find a "Welcome Channel". Please ensure a welcome channel is set');

	channel.send(`${member.user.username} has left the server. RIP 😢.`);
};
module.exports.help = {
	event: 'guildMemberRemove'
};