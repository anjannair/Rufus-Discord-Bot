const config = require('../config.json');
const index = require('../index');
const bot = index.client;
var memjs = require('memjs');


module.exports = async message => {

	//using memcache 
	var client = memjs.Client.create(process.env.MEMCACHEDCLOUD_SERVERS, {
		username: process.env.MEMCACHEDCLOUD_USERNAME,
		password: process.env.MEMCACHEDCLOUD_PASSWORD
	});
	//let prefix;
	if (message.author.bot) return;
	if (message.channel.type === "dm") return;

	//checking for set prefix
	client.get(message.guild.id, function (err, value, key) {
		if (value != null) {
			let prefix = value.toString();
			let args = message.content.slice(prefix.length).trim().split(' ');
	let rope = args.shift().toLowerCase();
	let fan;
	let fan1;
	let fan2;
	let fan3;
	let fan4;

	if (!message.content.startsWith(prefix)) return;

	//for dsd
	if (bot.dsd.has(rope)) {
		fan = bot.dsd.get(rope);
	}
	else {
		fan = bot.dsd.get(bot.aliases.get(rope));
	}
	if (fan) fan.run(bot, message, args);

	//for admin
	if (bot.admin.has(rope)) {
		fan1 = bot.admin.get(rope);
	}
	else {
		fan1 = bot.admin.get(bot.aliases.get(rope));
	}
	if (fan1) fan1.run(bot, message, args);

	//for newbie
	if (bot.newbie.has(rope)) {
		fan2 = bot.newbie.get(rope);
	}
	else {
		fan2 = bot.newbie.get(bot.aliases.get(rope));
	}
	if (fan2) fan2.run(bot, message, args);

	//for misc
	if (bot.misc.has(rope)) {
		fan3 = bot.misc.get(rope);
	}
	else {
		fan3 = bot.misc.get(bot.aliases.get(rope));
	}
	if (fan3) fan3.run(bot, message, args);
	//for songs
	if (bot.song.has(rope)) {
		fan4 = bot.song.get(rope);
	}
	else{
		fan4 = bot.song.get(bot.aliases.get(rope));
	}
	if(fan4) fan4.run(bot,message,args);
}

	else{
	let prefix = config.prefix;
	let args = message.content.slice(prefix.length).trim().split(' ');
	let rope = args.shift().toLowerCase();
	let fan;
	let fan1;
	let fan2;
	let fan3;
	let fan4;

	if (!message.content.startsWith(prefix)) return;

	//for dsd
	if (bot.dsd.has(rope)) {
		fan = bot.dsd.get(rope);
	}
	else {
		fan = bot.dsd.get(bot.aliases.get(rope));
	}
	if (fan) fan.run(bot, message, args);

	//for admin
	if (bot.admin.has(rope)) {
		fan1 = bot.admin.get(rope);
	}
	else {
		fan1 = bot.admin.get(bot.aliases.get(rope));
	}
	if (fan1) fan1.run(bot, message, args);

	//for newbie
	if (bot.newbie.has(rope)) {
		fan2 = bot.newbie.get(rope);
	}
	else {
		fan2 = bot.newbie.get(bot.aliases.get(rope));
	}
	if (fan2) fan2.run(bot, message, args);

	//for misc
	if (bot.misc.has(rope)) {
		fan3 = bot.misc.get(rope);
	}
	else {
		fan3 = bot.misc.get(bot.aliases.get(rope));
	}
	if (fan3) fan3.run(bot, message, args);

	//for songs
	if (bot.song.has(rope)) {
		fan4 = bot.song.get(rope);
	}
	else{
		fan4 = bot.song.get(bot.aliases.get(rope));
	}
	if(fan4) fan4.run(bot,message,args);
}
});
};
module.exports.help = {
	event: 'message'
};