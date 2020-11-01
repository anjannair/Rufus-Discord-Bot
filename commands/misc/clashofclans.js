const discord = require("discord.js");
const fetch = require("node-fetch");

module.exports.run = async (bot, message, args) => {
    var userid = args.join(``); //userid without hash
	var headers = {
        'Authorization': 'Bearer '+process.env.COC
    };
    let idfetcher = `https://api.clashofclans.com/v1/players/%23${userid}`;
    let response = await fetch(idfetcher,{method:'GET', headers:headers});
    let data = await response.json();
    console.log(data);
    let clan = "None";
    if(data.clan){
        clan = data.clan.name;
    }
    
    const embed = new discord.MessageEmbed()
        .setTitle(`Clash Of Clans stats of ${data.name}`)
        .addField('Town Hall Level: ',data.townHallLevel)
        .addField('Current Trophies: ',data.trophies)
        .addField('Best Trophies: ',data.bestTrophies)
        .addField(`Clan: `,clan)
        .setThumbnail(data.league.iconUrls.medium);
    message.channel.send(embed);
};

module.exports.help = {
	name: "coc",
    aliases: ['clashofclans']
};