const config = require('../config.json');
const index = require('../index');
const bot = index.client;


module.exports = () => {
	console.log(`${bot.user.username} is ready for action!`);
	bot.user.setActivity(config.activity.game, { type: 'WATCHING' });
};

module.exports.help = {
	event: 'ready'
};