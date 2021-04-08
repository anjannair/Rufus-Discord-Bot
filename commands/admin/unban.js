const discord = require("discord.js");
const { Command } = require('discord.js-commando');

module.exports = class rufus extends Command {
    constructor(client) {
        super(client, {
            name: 'unban',
            group: 'admin',
            memberName: 'unban',
            description: 'Unbans a user from the server',
            guildOnly: true,
            clientPermissions: ['BAN_MEMBERS'],
            userPermissions: ['BAN_MEMBERS'],
            args: [{
                key: 'user',
                prompt: 'Whom do you want to unban?',
                type: 'user',
            }
            ]
        });
    }

    async run(message, { user }) {
        var a = message.id;
        let jad;

        var embs = new discord.MessageEmbed()
            .setColor('#E7A700')
            .setFooter(`${user.tag} was unbanned by ${message.author.tag}`, `${message.author.avatarURL({ dynamic: true })}`);
        const unbanned = this.client.users.cache.get(user.id);

        message.guild.fetchBans().then(async bans => {
            if (bans.size == 0) return message.channel.send('This server has not banned anyone');
            let bUser = bans.find(b => b.user.id == user.id);
            if (!bUser) return message.channel.send('The user ID stated is not banned.');

            await message.guild.members.unban(user.id).catch(err => {
                jad = err;
            });
            message.channel.messages.fetch(a).then(msg => msg.delete({ timeout: 1000 }));
            if (!jad) {
                await message.channel.send(embs);
            }
            else {
                return message.reply("An error occured");
            }
        });
    }
};