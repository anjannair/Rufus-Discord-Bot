/*

What is to improve?
Printing embeds, handling images, attatchments etc

*/

const discord = require("discord.js");
const fs = require('fs').promises;
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const dom = new JSDOM();
const document = dom.window.document;
/***
* @param {Discord.client} bot the discord bot client.
* @param {Discord.messsage} message the initial message sent by the user.
* @param {array} args an array of arguments
 */
module.exports.run = async (bot, message, args) => {
    if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply("You need the MANAGE MESSAGE permissions to do that");
    await message.delete();
    let messageCollection = new discord.Collection();
    let channelMessages = await message.channel.messages.fetch({
        limit: 100
    }).catch(err => console.log(err));

    messageCollection = messageCollection.concat(channelMessages);

    while (channelMessages.size === 100) {
        let lastMessageId = channelMessages.lastKey();
        channelMessages = await message.channel.messages.fetch({ limit: 100, before: lastMessageId }).catch(err => console.log(err));
        if (channelMessages)
            messageCollection = messageCollection.concat(channelMessages);
    }
    let msgs = messageCollection.array().reverse();
    let data = await fs.readFile('commands/admin/template.html', 'utf8').catch(err => console.log(err));
    if (data) {
        var link = " ";
        if (!message.guild.icon) link = 'https://discord.com/assets/322c936a8c8be1b803cd94861bdfa868.png';
        else link = `https://cdn.discordapp.com/icons/${message.guild.id}/${message.guild.icon}.webp?size=1024`;
        await fs.writeFile('index.html', data).catch(err => console.log(err));
        let guildElement = document.createElement('div');
        let guildText = document.createTextNode(message.guild.name);
        let guildImg = document.createElement('img');
        guildImg.setAttribute('src', link);
        guildImg.setAttribute('width', '150');
        guildElement.appendChild(guildImg);
        guildElement.appendChild(guildText);
        console.log(guildElement.outerHTML);
        await fs.appendFile('index.html', guildElement.outerHTML).catch(err => console.log(err));

        msgs.forEach(async msg => {
            var ava = " ";
            if (!msg.author.avatarURL({ dynamic: true })) ava = msg.author.defaultAvatarURL;
            else ava = msg.author.avatarURL({ dynamic: true });
            let parentContainer = document.createElement("div");
            parentContainer.className = "parent-container";

            let avatarDiv = document.createElement("div");
            avatarDiv.className = "avatar-container";
            let img = document.createElement('img');
            img.setAttribute('src', ava);
            img.className = "avatar";
            avatarDiv.appendChild(img);

            parentContainer.appendChild(avatarDiv);

            let messageContainer = document.createElement('div');
            messageContainer.className = "message-container";

            let nameElement = document.createElement("span");
            let name = document.createTextNode(msg.author.tag + " " + msg.createdAt.toDateString() + " " + msg.createdAt.toLocaleTimeString() + " EST");
            nameElement.appendChild(name);
            messageContainer.append(nameElement);

            if (msg.content.startsWith("```")) {
                let m = msg.content.replace(/```/g, "");
                let codeNode = document.createElement("code");
                let textNode = document.createTextNode(m);
                codeNode.appendChild(textNode);
                messageContainer.appendChild(codeNode);
            }
            else if (msg.embeds.length > 0) {
                let msgNode = document.createElement('span');
                let textNode = document.createTextNode("-This message contains an embed-");
                msgNode.append(textNode);
                messageContainer.appendChild(msgNode);
            }
            else {
                let msgNode = document.createElement('span');
                let textNode = document.createTextNode(msg.content);
                msgNode.append(textNode);
                messageContainer.appendChild(msgNode);
            }
            parentContainer.appendChild(messageContainer);
            await fs.appendFile('index.html', parentContainer.outerHTML).catch(err => console.log(err));
        });
        message.channel.startTyping();
        await message.channel.send('Transcript', { files: [{ attachment: 'index.html', name: 'index.html' }] });
        message.channel.stopTyping();
    }

};

module.exports.help = {
    name: "transcript",
    aliases: ['trans']
};