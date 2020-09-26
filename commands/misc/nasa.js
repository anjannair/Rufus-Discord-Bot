const Discord = require("discord.js");
const fetch = require("node-fetch");

module.exports.run = async (bot, message, args) => {
	if(!args){
        message.channel.send("Enter a valid term to search for!");
    }
        let term = args.join(' ');
        let response = await fetch(`https://images-api.nasa.gov/search?q=${term}`);
        let data = await response.json();
        if (!data.collection.items[0].data[0].description) {
             let msg = await message.channel.send(`Couldn't find any results for ${term}`);
             msg.delete({timeout: 10000});
             return message.react('❌');
        }
        let nasasearchembed = new Discord.MessageEmbed()
            .setColor('#00ffbb')
            .setTitle(data.collection.items[0].data[0].title)
            .setDescription(data.collection.items[0].data[0].description)
            .setImage(data.collection.items[0].links[0].href.split(' ').join('%20'))
            .setTimestamp();
        await message.channel.send(nasasearchembed);
        message.react('✔️');
};

module.exports.help = {
	name: "nasa",
    aliases: []
};
