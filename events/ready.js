const config = require('../config.json');
const index = require('../index');
const bot = index.client;


module.exports = () => {
	console.log(`${bot.user.username} is ready for action!`);
	var interval = setInterval(function () {
		var p = Math.floor(Math.random() * 6);
		if (p == 1) {
			bot.user.setActivity(`${bot.guilds.cache.size} servers`, { type: 'WATCHING' });
		}
		if (p == 2) {
			bot.user.setActivity(`${bot.guilds.cache.reduce((a, g) => a + g.memberCount, 0)} members`, { type: 'WATCHING' });
		}
		if (p == 3) {
			bot.user.setActivity(config.activity.game1, { type: 'WATCHING' });
		}
		if (p == 4) {
			bot.user.setActivity(config.activity.game2, { type: 'PLAYING' });
		}
		if (p == 5) {
			bot.user.setActivity(config.activity.game3, { type: 'PLAYING' });
		}
		if (p == 6) {
			bot.user.setActivity(config.activity.game4, { type: 'PLAYING' });
		}
	}, 1 * 40000);
};

module.exports.help = {
	event: 'ready'
};
