const discord = require("discord.js");
const { Command } = require('discord.js-commando');

module.exports = class rufus extends Command {
	constructor(client) {
		super(client, {
			name: 'amonguswiki',
			group: 'newbie',
            memberName: 'amonguswiki',
            aliases:['auwiki','amwiki'],
			description: 'Search the Among Us Wiki',
            guildOnly: true,
            args:[{
                key:'query',
                prompt:'What do you want about Among Us from its Wiki?',
                type:'string',
            }]
		});
	}

	async run(message,{query}) {
        var neb = query;
        if(!neb) return message.channel.send("Input something to search for!");
        message.channel.send("https://among-us-wiki.fandom.com/wiki/"+neb);
	}
};