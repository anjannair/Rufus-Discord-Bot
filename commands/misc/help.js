const discord = require("discord.js");
const { Command } = require('discord.js-commando');

module.exports = class rufus extends Command {
    constructor(client) {
        super(client, {
            name: 'help',
            group: 'misc',
            memberName: 'help',
            description: 'Help command for the bot',
            guildOnly: true,
            args: [{
                key: 'query',
                prompt: 'What help do you want?',
                default: '',
                type: 'string'
            }]
        });
    }

    async run(message, { query }) {
        if (!query) {
            if (message.guild.id != '740983497199452231') {
                const set = this.client.emojis.cache.get("797167346863046736");
                const admin = this.client.emojis.cache.get("700339051214929920");
                const misc = this.client.emojis.cache.get("747417484537233408");
                const newbie = this.client.emojis.cache.get("797173169454186557");
                const fun = this.client.emojis.cache.get("700342559930843211");
                const helpembed = new discord.MessageEmbed()
                    .setTitle(`${set} Commands for Rufus ${set}`)
                    .setColor('#FF7F50')
                    .addField(`${admin} Moderation`, `\`*help moderation\``)
                    .addField(`${fun} Fun`, `\`*help fun\``)
                    .addField(`${misc} Utility`, `\`*help util\``)
                    .addField(`${newbie} Newbie`, `\`*help newbie\``)
                    .setImage('https://i.imgur.com/obojRZ5.gif')
                    .setFooter(`Requested by ${message.author.tag}`, `${message.author.avatarURL({ dynamic: true })}`);
                message.channel.send(helpembed);
            }
            else {
                const set = this.client.emojis.cache.get("797167346863046736");
                const admin = this.client.emojis.cache.get("700339051214929920");
                const misc = this.client.emojis.cache.get("747417484537233408");
                const newbie = this.client.emojis.cache.get("797173169454186557");
                const fun = this.client.emojis.cache.get("700342559930843211");
                const helpembed = new discord.MessageEmbed()
                    .setTitle(`${set} Commands for Rufus ${set}`)
                    .setColor('#FF7F50')
                    .addField(`${admin} Moderation`, `\`*help moderation\``)
                    .addField(`${fun} Fun`, `\`*help fun\``)
                    .addField(`${misc} Utility`, `\`*help util\``)
                    .addField(`${newbie} Newbie`, `\`*help newbie\``)
                    .addField(`📝 DSD`, `*help dsd`)
                    .setImage('https://i.imgur.com/obojRZ5.gif')
                    .setFooter(`Requested by ${message.author.tag}`, `${message.author.avatarURL({ dynamic: true })}`);
                message.channel.send(helpembed);
            }
        }
        if (query == "mod" || query == "moderation") {
            let embeds = "";
            for (const group of this.client.registry.groups.values()) {
                const owner = this.client.isOwner(message.author);
                const commands = group.commands.filter(cmd => {
                    if (owner) return true;
                    if (cmd.ownerOnly || cmd.hidden) return false;
                    if (cmd.nsfw && !message.channel.nsfw) return false;
                    return true;
                });
                if (!commands.size) continue;
                if (group.id == "admin") {
                    embeds += (`${group.name}`, commands.map(cmd => `\`${cmd.name}\` : ${cmd.description}`).join('\n'));
                }
            }
            const helpembed = new discord.MessageEmbed()
                .setTitle("Moderation Commands")
                .setColor('#FF7F50')
                .setDescription(embeds);
            message.reply("Sent you a DM with that information!");
            message.author.send(helpembed);
        }
        if (query == "fun") {
            let embeds = "";
            for (const group of this.client.registry.groups.values()) {
                const owner = this.client.isOwner(message.author);
                const commands = group.commands.filter(cmd => {
                    if (owner) return true;
                    if (cmd.ownerOnly || cmd.hidden) return false;
                    if (cmd.nsfw && !message.channel.nsfw) return false;
                    return true;
                });
                if (!commands.size) continue;
                if (group.id == "fun") {
                    embeds += (`${group.name}`, commands.map(cmd => `\`${cmd.name}\` : ${cmd.description}`).join('\n'));
                }
            }
            const helpembed = new discord.MessageEmbed()
                .setTitle("Fun Commands")
                .setColor('#FF7F50')
                .setDescription(embeds);
            message.reply("Sent you a DM with that information!");
            message.author.send(helpembed);
        }
        if (query == "util" || query == "utility") {
            let embeds = "";
            for (const group of this.client.registry.groups.values()) {
                const owner = this.client.isOwner(message.author);
                const commands = group.commands.filter(cmd => {
                    if (owner) return true;
                    if (cmd.ownerOnly || cmd.hidden) return false;
                    if (cmd.nsfw && !message.channel.nsfw) return false;
                    return true;
                });
                if (!commands.size) continue;
                if (group.id == "misc") {
                    embeds += (`${group.name}`, commands.map(cmd => `\`${cmd.name}\` : ${cmd.description}`).join('\n'));
                }
            }
            const helpembed = new discord.MessageEmbed()
                .setTitle("Utility Commands")
                .setColor('#FF7F50')
                .setDescription(embeds);
            message.reply("Sent you a DM with that information!");
            message.author.send(helpembed);
        }
        if (query == "newbie") {
            let embeds = "";
            for (const group of this.client.registry.groups.values()) {
                const owner = this.client.isOwner(message.author);
                const commands = group.commands.filter(cmd => {
                    if (owner) return true;
                    if (cmd.ownerOnly || cmd.hidden) return false;
                    if (cmd.nsfw && !message.channel.nsfw) return false;
                    return true;
                });
                if (!commands.size) continue;
                if (group.id == "newbie") {
                    embeds += (`${group.name}`, commands.map(cmd => `\`${cmd.name}\` : ${cmd.description}`).join('\n'));
                }
            }
            const helpembed = new discord.MessageEmbed()
                .setTitle("Newbie Commands")
                .setColor('#FF7F50')
                .setDescription(embeds);
            message.reply("Sent you a DM with that information!");
            message.author.send(helpembed);
        }
        if (query == "dsd") {
            let embeds = "";
            for (const group of this.client.registry.groups.values()) {
                const owner = this.client.isOwner(message.author);
                const commands = group.commands.filter(cmd => {
                    if (owner) return true;
                    if (cmd.ownerOnly || cmd.hidden) return false;
                    if (cmd.nsfw && !message.channel.nsfw) return false;
                    return true;
                });
                if (!commands.size) continue;
                if (group.id == "dsd") {
                    embeds += (`${group.name}`, commands.map(cmd => `\`${cmd.name}\` : ${cmd.description}`).join('\n'));
                }
            }
            const helpembed = new discord.MessageEmbed()
                .setTitle("Digital System and Design Commands")
                .setColor('#FF7F50')
                .setDescription(embeds);
            message.reply("Sent you a DM with that information!");
            message.author.send(helpembed);
        }
    }
};