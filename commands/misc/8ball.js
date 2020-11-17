const discord = require("discord.js");
const responses = [
  "It is certain.", "It is decidedly so.", "Without a doubt.", "Yes - definitely.", "You may rely on it.", "As I see it, yes.",
  "Most likely.", "Outlook good.", "Yes.", "Signs point to yes.", "Reply hazy, try again.", "Ask again later.", "Better not tell you now.",
  "Cannot predict now.", "Concentrate and ask again.", "Don't count on it.", "My reply is no.", "My sources say no.", "Outlook not so good.",
  "Very doubtful.",
];
/***
* @param {Discord.client} bot the discord bot client.
* @param {Discord.messsage} message the initial message sent by the user.
* @param {array} args an array of arguments
 */
module.exports.run = async (bot, message, args) => {
  var ques = args.splice(1).join('');
  if (!ques) return message.reply("This is 8ball. You need to ask a question.");

  const number = Math.floor(Math.random() * responses.length);
  message.channel.send(responses[number]);
};

module.exports.help = {
  name: "8ball",
  aliases: []
};