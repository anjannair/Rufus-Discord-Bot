const Discord = require("discord.js");
const { Command } = require('discord.js-commando');

module.exports = class rufus extends Command {
    constructor(client) {
        super(client, {
            name: 'addrole',
            aliases: ['ar'],
            group: 'admin',
            memberName: 'addrole',
            description: 'Adds role for mentioned user',
            guildOnly: true,
            clientPermissions: ['MANAGE_ROLES'],
            userPermissions: ['MANAGE_ROLES'],
            args: [{
                key: 'user',
                prompt: 'Whom do you want to add role to?',
                type: 'member',
            },
            {
                key: 'role',
                prompt: 'What role do you want to add?',
                type: 'role',
            }
            ]
        });
    }

    async run(message, { role, user }) {
        var a = message.id;
        let jad;
        var mentionedRole = role;
        var roleMember = user;
        if (!mentionedRole) return message.reply(`I am unable to find role: ${mentionedRole}`);
        roleMember.roles.add(mentionedRole).catch(err => {
            jad = err;
            message.channel.send("An error occured. This may happen when my heirachy is lower\nHandy Link: https://discordcaptcha.xyz/hc/doku.php?id=captchabot:role_hierarchy");
        });
        if (!jad) {
            message.channel.send("Role successfully added.");
        }
        message.channel.messages.fetch(a).then(msg => msg.delete({ timeout: 1000 }));
    }
};