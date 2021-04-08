const { Command } = require('discord.js-commando');
const Discord = require("discord.js");

module.exports = class verify extends Command {
    constructor(client) {
        super(client, {
            name: 'whois',
            group: 'admin',
            memberName: 'whois',
            description: 'Conduct a whois to know who the user is incase of an infraction (can be used by admins and moderators only)',
            guildOnly: true,
            args: [{
                key: 'who',
                prompt: 'Whom do you want to know about?',
                type: 'user',
            }],
        });
    }

    async run(message, { who }) {
        message.delete({ timeout: 60000 });
        //user
        let accountcreatedate = who.createdAt.toString();
        let useravatar = who.displayAvatarURL({ dynamic: true });
        let userpresence = who.presence.status;
        let usertag = who.tag;

        //member
        let guild = message.guild;
        if (guild.member(who.id)) {
            let member = guild.member(who.id);
            let lastmessage;
            let lastmessageid;
            let lastmessagechannel;
            if (who.lastMessage) {
                lastmessage = who.lastMessage.content;
                lastmessageid = who.lastMessageID;
                await this.client.channels.fetch(who.lastMessageChannelID)
                    .then(channel => { lastmessagechannel = "#" + channel.name; });
            }
            else {
                lastmessage = "None detected";
                lastmessageid = "None";
                lastmessagechannel = "None";
            }
            let guildjoin = member.joinedAt.toString();
            let roles = member.roles.cache.map(role => role.name).join(',');

            const embed = new Discord.MessageEmbed()
                .setColor('#FF7F50')
                .setTitle("Whois of " + usertag)
                .addField("Display name: ", member.displayName)
                .addField("Account created on: ", accountcreatedate)
                .addField("Current user activity: ", userpresence)
                .setThumbnail(useravatar)
                .addField("Joined guild on: ", guildjoin)
                .addField("Roles recieved: ", roles)
                .addField("All permissions of the user: ", member.permissions.toArray().join('\n'))
                .addField("Last message sent in guild: ", lastmessage)
                .addField("ID of last message sent: ", lastmessageid)
                .addField("Last message channel: ", lastmessagechannel)
                .setFooter(`Requested by ${message.author.tag}`, `${message.author.avatarURL({ dynamic: true })}`)
                .setTimestamp();
            //auto delete text to prevent spam
            message.channel.send(embed).then((msg) => {
                if (msg) msg.delete({ timeout: 60000 });
            });

        }
        else {
            const embed = new Discord.MessageEmbed()
                .setColor('#FF7F50')
                .setTitle("Whois of " + usertag)
                .addField("Account created on: ", accountcreatedate)
                .addField("Current user activity: ", userpresence)
                .setThumbnail(useravatar)
                .setFooter(`Requested by ${message.author.tag}`, `${message.author.avatarURL({ dynamic: true })}`)
                .setTimestamp();

            message.channel.send(embed).then((msg) => {
                if (msg) msg.delete({ timeout: 60000 });
            });
        }

    }
};