const discord = require("discord.js");
/***
* @param {Discord.client} bot the discord bot client.
* @param {Discord.messsage} message the initial message sent by the user.
* @param {array} args an array of arguments
 */
module.exports.run = async (bot, message, args) => {
    var neb = args.join(' ');
    const ayy = bot.emojis.cache.get("756082462677008394");
    const ayy1 = bot.emojis.cache.get("756083219337576481");
    const ayy2 = bot.emojis.cache.get("756082294930014229");
    const ayy3 = bot.emojis.cache.get("756082791019446365");
    const ayy4 = bot.emojis.cache.get("756082699969757264");
    const ayy5 = bot.emojis.cache.get("756143535555870841");

    // eslint-disable-next-line no-useless-escape
    if (!neb) return message.channel.send("\`\`\`Input something to search for example *am map\`\`\`");
    if (neb.toLowerCase() == "maps" || neb.toLowerCase() == "map") {
        var embs = new discord.MessageEmbed()
            .setColor('#FF0000')
            .setTitle(`${ayy} AMONG US MAPS`)
            .addField(`${ayy1} Polus: `, "[Click here](https://cdn.discordapp.com/attachments/754031126149988453/754033354852270190/POLUS_MAP_GUIDE.png)", true)
            .addField(`${ayy2} Mira HQ: `, "[Click here](https://i.redd.it/8i1kd1mp9ij51.png)", true)
            .addField(`${ayy3} The Skeld: `, "[Click here](https://cdn.discordapp.com/attachments/756025344993263658/758574260724695080/skeldmapguidev2.png)", true)
            .setFooter(`These are the full and detailed maps of Among Us! Click on any one of the links to see full detailed and HD maps`);
        message.channel.send(embs);
    }
    else if (neb.toLowerCase() == "info" || neb.toLowerCase() == "among us info" || neb.toLowerCase() == "information" || neb == "among us information") {
        var embs1 = new discord.MessageEmbed()
            .setColor('#FF0000')
            .setTitle(`${ayy3} AMONG US INFORMATION`)
            .addField(`${ayy4} Full Guide/Tips: `, "[Click here](https://www.reddit.com/r/AmongUs/comments/gfulqt/effort_post_complete_guide_to_playing_as_impostor/)", true)
            .addField(`${ayy5} Impostor: `, "[Click here](https://www.bluestacks.com/blog/game-guides/among-us/amongus-smooth-criminal-guide-en.html)", true)
            .addField(`${ayy1} Crewmate: `, "[Click here](https://www.bluestacks.com/blog/game-guides/among-us/amongus-crewmate-guide-en.html)", true)
            .setFooter("These are the full and detailed instructions for Among Us with some tips in the guide which you may not know");
        message.channel.send(embs1);
    }

};

module.exports.help = {
    name: "amongus",
    aliases: ['au', 'am']
};