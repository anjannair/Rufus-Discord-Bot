const discord = require("discord.js");
const { Command } = require('discord.js-commando');

module.exports = class rufus extends Command {
    constructor(client) {
        super(client, {
            name: 'send',
            group: 'admin',
            memberName: 'send',
            description: 'Send an embed to a particular channel',
            guildOnly: true,
            userPermissions: ['ADMINISTRATOR'],
            clientPermissions: ['EMBED_LINKS'],
            args: [
                {
                    key: 'channel',
                    prompt: 'Which channel do you want to send it to?',
                    type: 'channel',
                }]
        });
    }

    async run(message, { channel }) {
        //Title
        message.reply("What title would you like to set?");
        let title;
        try {
            const filter = m => {
                if (m.author.bot) return false;
                if (m.author == message.author) return true;
            };
            title = await message.channel.awaitMessages(filter, { max: 1, time: 600000, errors: ['time'] });
            if (title) {
                message.channel.send("Title set!");
            }
        } catch (err) {
            return message.reply("Title name setting cancelled");
        }

        //Description
        message.reply("What description would you like to set?");
        let description;
        try {
            const filter = m => {
                if (m.author.bot) return false;
                if (m.author == message.author) return true;
            };
            description = await message.channel.awaitMessages(filter, { max: 1, time: 600000, errors: ['time'] });
            if (description) {
                message.channel.send("Description name set");
            }
        } catch (err) {
            return message.reply("Description name setting cancelled");
        }

        //Thumbnail image
        message.reply("Would you like to set a thumbnail image? (y/n)");
        let answer;
        let thumbimage;
        try {
            const filter = m => {
                if (m.author.bot) return false;
                if (m.author == message.author) return true;
            };
            answer = await message.channel.awaitMessages(filter, { max: 1, time: 600000, errors: ['time'] });
            if (answer) {
                var b = answer.map(m => m.content);
                if (b == "y" || b == "Y") {
                    message.reply("Send the valid image link\n\nNote: If the link is not valid no thumbnail image will appear so make sure your link is valid. If you're using Google to take an image be sure to copy image link and open in new tab.");
                    try {
                        const filter = m => {
                            if (m.author.bot) return false;
                            if (m.author == message.author) return true;
                        };
                        thumbimage = await message.channel.awaitMessages(filter, { max: 1, time: 600000, errors: ['time'] });
                        if (thumbimage) {
                            message.channel.send("Thumbnail image set");
                        }
                    } catch (err) {
                        message.reply("Thumbnail image setting cancelled");
                    }
                }
                if (b == "n" || b == "N") {
                    message.reply("Ok moving ahead");
                }
            }
        } catch (err) {
            message.reply("Thumbnail image setting cancelled");
        }

        //Embed Image
        message.reply("Would you like to embed an image? (y/n)");
        let answer2;
        let image;
        try {
            const filter = m => {
                if (m.author.bot) return false;
                if (m.author == message.author) return true;
            };
            answer2 = await message.channel.awaitMessages(filter, { max: 1, time: 600000, errors: ['time'] });
            if (answer2) {
                var a = answer2.map(m => m.content);
                if (a == "y" || a == "Y") {
                    message.reply("Send the valid image link\n\nNote: If the link is not valid no Image will appear so make sure your link is valid. If you're using Google to take an image be sure to copy image link and open in new tab.");
                    try {
                        const filter = m => {
                            if (m.author.bot) return false;
                            if (m.author == message.author) return true;
                        };
                        image = await message.channel.awaitMessages(filter, { max: 1, time: 600000, errors: ['time'] });
                        if (image) {
                            message.channel.send("Image set");
                        }
                    } catch (err) {
                        message.reply("Image setting cancelled");
                    }
                }
                if (a == "n" || a == "N") {
                    message.reply("Moving ahead");
                }
            }
        } catch (err) {
            message.reply("Image setting cancelled");
        }

        //Mention role
        message.reply("Would you like to mention role/everyone? (y/n)");
        let answer3;
        let role;
        try {
            const filter = m => {
                if (m.author.bot) return false;
                if (m.author == message.author) return true;
            };
            answer3 = await message.channel.awaitMessages(filter, { max: 1, time: 600000, errors: ['time'] });
            if (answer3) {
                var a = answer3.map(m => m.content);
                if (a == "y" || a == "Y") {
                    message.reply("Mention the role or mention everyone");
                    try {
                        const filter = m => {
                            if (m.author.bot) return false;
                            if (m.author == message.author) return true;
                        };
                        role = await message.channel.awaitMessages(filter, { max: 1, time: 600000, errors: ['time'] });
                        if (role) {
                            message.channel.send("Mention set");
                        }
                    } catch (err) {
                        message.reply("Mention setting cancelled");
                    }
                }
                if (a == "n" || a == "N") {
                    message.reply("Aight");
                }
            }
        } catch (err) {
            message.reply("Mention setting cancelled");
        }

        if (thumbimage && image) {
            var embed = new discord.MessageEmbed()
                .setTitle(title.map(m => m.content))
                .setColor('RANDOM')
                .setDescription(description.map(m => m.content))
                .setThumbnail(thumbimage.map(m => m.content)[0])
                .setImage(image.map(m => m.content)[0])
                .setFooter(`Message by ${message.author.tag}`, `${message.author.avatarURL({ dynamic: true })}`);
        }
        if (!thumbimage && image) {
            var embed = new discord.MessageEmbed()
                .setTitle(title.map(m => m.content))
                .setColor('RANDOM')
                .setDescription(description.map(m => m.content))
                .setImage(image.map(m => m.content)[0])
                .setFooter(`Message by ${message.author.tag}`, `${message.author.avatarURL({ dynamic: true })}`);
        }
        if (!thumbimage && !image) {
            var embed = new discord.MessageEmbed()
                .setTitle(title.map(m => m.content))
                .setColor('RANDOM')
                .setDescription(description.map(m => m.content))
                .setFooter(`Message by ${message.author.tag}`, `${message.author.avatarURL({ dynamic: true })}`);
        }
        if (thumbimage && !image) {
            var embed = new discord.MessageEmbed()
                .setTitle(title.map(m => m.content))
                .setColor('RANDOM')
                .setDescription(description.map(m => m.content))
                .setThumbnail(thumbimage.map(m => m.content)[0])
                .setFooter(`Message by ${message.author.tag}`, `${message.author.avatarURL({ dynamic: true })}`);
        }

        //Checking if user is satisfied with the setup
        message.reply("Is this the final message?");
        if (!role) {
            message.channel.send(embed).then(m => {
                m.react('✔️');
                m.react('❌');
                const newfilter = (reaction, user) => {
                    return ['✔️', '❌'].includes(reaction.emoji.name) && user.bot == false && user == message.author;
                };
                m.awaitReactions(newfilter, { max: 1, time: 300000, errors: ['time'] })
                    .then(async collected => {
                        const waitreaction = collected.first();
                        if (waitreaction.emoji.name === '✔️') {
                            message.reply(`Alright! Sending the details to the channel`);
                            channel.send(embed);
                        }
                        if (waitreaction.emoji.name === '❌') {
                            return message.reply("Terminating session..!\nPro tip: Take your time to write the message you have 10 minutes per question!");
                        }
                    });
            }).catch(err => {
                return message.reply("The link you entered in the thumbnail/image is incorrect please recheck");
            });
        }
        if (role) {
            message.channel.send(role.map(r => r.content), embed).then(m => {
                m.react('✔️');
                m.react('❌');
                const newfilter = (reaction, user) => {
                    return ['✔️', '❌'].includes(reaction.emoji.name) && user.bot == false && user == message.author;
                };
                m.awaitReactions(newfilter, { max: 1, time: 300000, errors: ['time'] })
                    .then(async collected => {
                        const waitreaction = collected.first();
                        if (waitreaction.emoji.name === '✔️') {
                            message.reply(`Alright! Sending the details to the channel`);
                            channel.send(role.map(r => r.content),embed);
                        }
                        if (waitreaction.emoji.name === '❌') {
                            return message.reply("Terminating session..!\nPro tip: Take your time to write the message you have 10 minutes per question!");
                        }
                    });
            }).catch(err => {
                return message.reply("The link you entered in the thumbnail/image is incorrect please recheck");
            });
        }

    }
};