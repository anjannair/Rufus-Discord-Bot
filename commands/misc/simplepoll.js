const discord = require("discord.js");
/***
* @param {Discord.client} bot the discord bot client.
* @param {Discord.messsage} message the initial message sent by the user.
* @param {array} args an array of arguments
 */
module.exports.run = async (bot, message, args) => {
    var a = message.id;
    message.channel.messages.fetch(a).then(msg => msg.delete({ timeout: 100 }));
    const emotes = ['🇦','🇧','🇨','🇩','🇪','🇫','🇬','🇭','🇮','🇯'];
    var neb = args.join(' ');
    var text = "";
    var words = neb.split('"');
    var finalwords = [];
    for(var i = 0;i<words.length;i++){
        if(i%2!=0){
            finalwords.push(words[i]);
        }
    }
    if(finalwords.length>11) return message.reply("Woah chill! Keep it less than 10 options");
    for(var i=1;i<finalwords.length;i++){
        text+=emotes[i-1]+" "+finalwords[i]+"\n";
    }
    var embed = new discord.MessageEmbed()
        .setTitle(finalwords[0])
        .setDescription(text)
        .addField("Poll by: ", message.author);
    message.channel.send(embed).then(msg =>{
        for(var i=1;i<finalwords.length;i++){
            try{
                msg.react(emotes[i-1]);
            }
            catch(error){
                console.log(error);
            }
        }

    });
};

module.exports.help = {
	name: "poll",
    aliases: []
};