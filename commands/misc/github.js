const discord = require("discord.js");
const { Command } = require('discord.js-commando');
const fetch = require('node-fetch');

module.exports = class rufus extends Command {
    constructor(client) {
        super(client, {
            name: 'github',
            group: 'misc',
            memberName: 'github',
            aliases: ['git'],
            description: 'Explore Github from Discord',
            guildOnly: true,
            args: [
                {
                    key: 'user',
                    prompt: 'What is the username of the Github account?',
                    type: 'string'
                },
                {
                    key: 'repo',
                    prompt: 'What is the repository name?',
                    type: 'string'
                }
            ]
        });
    }

    async run(message, { user, repo }) {
        let uri = await fetch(`https://api.github.com/repos/${user}/${repo}`);

        // Check the fetch status, if it's 200 then return embed with information
        if (uri.status === 200) {
            let uriJson = await uri.json();
            let embed = new discord.MessageEmbed()
                .setAuthor(uriJson.owner.login, uriJson.owner.avatar_url)
                .setDescription(`${uriJson.description}\n[Repository Link](${uriJson.html_url})\n`)
                .addField("Repo Name :notepad_spiral:", `${uriJson.name}`, true)
                .addField("Stars :star:", `${uriJson.stargazers_count}`, true)
                .addField("Forks :gear:", `${uriJson.forks}`, true)
                .addField("Language :desktop:", `${uriJson.language}`, true)
                .setImage(uriJson.owner.avatar_url)
                .setColor("#ffff");
            return message.channel.send(embed);
        } else {
            return message.channel.send("Unable to find the mentioned repository. Please make sure you have entered the correct user/repository. `*github [user] [repository]`");
        }
    }
};