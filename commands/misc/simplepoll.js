const discord = require("discord.js");
const { Command } = require('discord.js-commando');

module.exports = class rufus extends Command {
    constructor(client) {
        super(client, {
            name: 'poll',
            group: 'misc',
            memberName: 'poll',
            description: 'Hold simple polls like the ones held by SimplePoll',
            guildOnly: true,
            args: [{
                key: 'poll',
                prompt: 'Input poll in this format: `"QUESTION","FIRST OPTION","SECOND OPTION"...`',
                type: 'string',
            }]
        });
    }

    async run(message, { poll }) {
        var a = message.id;
        message.channel.messages.fetch(a).then(msg => msg.delete({ timeout: 100 }));
        const emotes = ['🇦', '🇧', '🇨', '🇩', '🇪', '🇫', '🇬', '🇭', '🇮', '🇯'];
        var neb = poll;
        var text = "";
        var words = neb.split('"');
        var finalwords = [];
        for (var i = 0; i < words.length; i++) {
            if (i % 2 == 0) {
                finalwords.push(words[i]);
            }
        }
        if (finalwords.length > 11) return message.reply("Woah chill! Keep it less than 10 options");
        for (var i = 1; i < finalwords.length; i++) {
            text += emotes[i - 1] + " " + finalwords[i] + "\n";
        }
        var embed = new discord.MessageEmbed()
            .setTitle(finalwords[0])
            .setDescription(text)
            .addField("Poll by: ", message.author);
        message.channel.send(embed).then(msg => {
            for (var i = 1; i < finalwords.length; i++) {
                try {
                    msg.react(emotes[i - 1]);
                }
                catch (error) {
                    console.log(error);
                }
            }

        });
    }
};