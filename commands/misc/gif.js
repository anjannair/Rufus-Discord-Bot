const discord = require("discord.js");
const fetch = require("node-fetch");
module.exports.run = async (bot, message, args) => {
    var query = args.join(' ');
    fetch(`https://api.tenor.com/v1/random?q=${query}&key=`+process.env.TENOR)  //get from the Tenor website
      .then(res => res.json())
      .then(json => message.channel.send(json.results[0].url))
      .catch(e => {
        message.channel.send('Failed to find a gif that matched your query');
        // console.error(e);
        return;
      });
};

module.exports.help = {
	name: "gif",
  aliases: []
};