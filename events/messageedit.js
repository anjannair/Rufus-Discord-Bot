module.exports = (oldMessage, newMessage) => {
    const content = newMessage.content;
    if (content.toLowerCase().includes("https://discord.gg") || content.toLowerCase().includes("http://discord.gg" || content.toLowerCase().includes("https://discord.com/invite/")) || content.toLowerCase().includes("http://discord.com/invite/") || content.toLowerCase().includes("discord.gg") || content.toLowerCase().includes("discord.com/invite/")) {
        if (!newMessage.member.hasPermission('ADMINISTRATOR')) {
          newMessage.delete({ timeout: 10 });
          newMessage.reply("Only Admins are authorized to send invite links");
          newMessage.author.send("Only admins are authorized to send invite links!!");
        }
      }
};
module.exports.help = {
	event: 'messageUpdate'
};