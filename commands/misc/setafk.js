const discord = require("discord.js");
const fetch = require("node-fetch");
require('dotenv').config();
var memjs = require('memjs');
const { Command } = require('discord.js-commando');

var store = memjs.Client.create(process.env.MEMCACHEDCLOUD_SERVERS, {
    username: process.env.MEMCACHEDCLOUD_USERNAME,
    password: process.env.MEMCACHEDCLOUD_PASSWORD
});

module.exports = class rufus extends Command {
    constructor(client) {
        super(client, {
            name: 'setafk',
            group: 'misc',
            memberName: 'setafk',
            description: 'Set yourself as AFK on all guilds the bot is on',
            guildOnly: true,
            args: [{
                key: 'answer',
                prompt: 'Set AFK as ON or OFF?',
                type: 'string',
                oneOf: ['on', 'off']
            }]
        });
    }

    async run(message, { answer }) {
        store.set(message.author.id, answer, function(err, val) {
        });
        message.reply("SET AS "+answer.toUpperCase()).then(msg => msg.delete({ timeout: 10000 }));
        message.channel.messages.fetch(message.id).then(msg => msg.delete({ timeout: 10000 }));
    }
};