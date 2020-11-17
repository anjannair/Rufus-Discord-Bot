const discord = require("discord.js");

/***
* @param {Discord.client} bot the discord bot client.
* @param {Discord.messsage} message the initial message sent by the user.
* @param {array} args an array of arguments
 */


module.exports.run = async (bot, message, args) => {
    if (!message.member.hasPermission('ADMINISTRATOR')) return message.reply("You do not have the permission to do that!");

    const emote = '📍';
    var neb = args.join(' ');
    var chnl = message.mentions.channels.first();
    if (!chnl) return message.reply("No channel is mentioned");
    if (neb.startsWith("default")) {
        const default_rules = `${emote}\`1\`\nNo spamming, trolling or advertising. Lets build a healthy server and have a blast!\n${emote}\`2\`\nNo NSFW (18+) content to be shared. A direct ban will be awarded.\n${emote}\`3\`\nDo not direct message anyone unless you already know them personally\n${emote}\`4\`\nAbusing is allowed but stay in your limits\n${emote}\`5\`\nLast but not the least, be respectful of others! This includes but not limited to, refrain from being toxic, using hate speech, racism and sexual harassment.`;
        const embs = new discord.MessageEmbed()
            .setTitle(`${chnl.guild.name}'s Rules`)
            .setColor("#E7A700")
            .setDescription(default_rules)
            .setTimestamp()
            .setFooter("Sincerely, Your Admin", "https://emoji.gg/assets/emoji/9192_random_tick.png");
        bot.channels.cache.get(chnl.id).send(embs);
    }
    else {
        var words = neb.split('\n');
        var input_rules = "";
        for (var i = 1; i < words.length; i++) {
            input_rules += `${emote}\`${i}\`\n${words[i].trim()}\n`;
        }
        const embs = new discord.MessageEmbed()
            .setTitle(`${chnl.guild.name}'s Rules`)
            .setColor("#E7A700")
            .setDescription(input_rules)
            .setTimestamp()
            .setFooter("Sincerely, Your Admin", "https://emoji.gg/assets/emoji/9192_random_tick.png");
        bot.channels.cache.get(chnl.id).send(embs);
    }

};

/***
 * Exports the rules command to the help object
 */

module.exports.help = {
    name: "rules",
    aliases: ['r', 'rule']
};