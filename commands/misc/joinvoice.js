const discord = require("discord.js");
const { Command } = require('discord.js-commando');

module.exports = class rufus extends Command {
    constructor(client) {
        super(client, {
            name: 'join',
            group: 'misc',
            memberName: 'join',
            description: 'Joins voice',
            guildOnly: true,
        });
    }

    async run(message) {
        var a = message.id;
        message.channel.messages.fetch(a).then(msg => msg.delete({ timeout: 1000 }));
        if (message.member.voice.channel) {
            await message.member.voice.channel.join();
            message.channel.send(`Joined!!`)
                .then((msg) => {
                    if (msg) msg.delete({ timeout: 10000 });
                });
        }
        if (!message.member.voice.channel) return message.reply("You are not in a voice channel");
    }
};