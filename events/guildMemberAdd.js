const Discord = require("discord.js");
const Canvas = require('canvas');

const config = require('../config.json');
const index = require('../index');
const bot = index.client;


module.exports = async (member) => {

	var embs = new Discord.MessageEmbed()
		.setColor('#E7A700')
		.setTitle(`Welcome to ${member.guild.name}`)
		.setDescription(`You are now with ${member.guild.memberCount} members\n\nIf you find yourself facing any difficulties contact the admins of the server`);
	member.send(embs);


	const applyText = (canvas, text) => {
		const ctx = canvas.getContext('2d');
		let fontSize = 70;

		do {
			ctx.font = `${fontSize -= 10}px sans-serif`;
		} while (ctx.measureText(text).width > canvas.width - 300);

		return ctx.font;
	};

	var channel = member.guild.channels.cache.find(ch => ch.name === 'welcome'); //make sure the channel has a welcome channel
	if (!channel) return console.log('Bot failed to find a "Welcome Channel". Please ensure a welcome channel is set');


	const canvas = Canvas.createCanvas(700, 250);
	const ctx = canvas.getContext('2d');


	const background = await Canvas.loadImage('images/wallpaper.jpeg');
	ctx.drawImage(background, 0, 0, canvas.width, canvas.height);


	ctx.strokeStyle = '#74037b';
	ctx.strokeRect(0, 0, canvas.width, canvas.height);


	ctx.font = '28px sans-serif';
	ctx.fillStyle = '#ffffff';
	ctx.fillText('Welcome to the server,', canvas.width / 2.5, canvas.height / 3.5);


	ctx.font = applyText(canvas, `${member.displayName}!`);
	ctx.fillStyle = '#ffffff';
	ctx.fillText(`${member.displayName}!`, canvas.width / 2.5, canvas.height / 1.8);


	ctx.beginPath();
	ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
	ctx.closePath();
	ctx.clip();


	const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'jpg' }));
	ctx.drawImage(avatar, 25, 25, 200, 200);


	const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome-image.png');

	channel.send(`Welcome to the server, ${member}!`, attachment);
};
module.exports.help = {
	event: 'guildMemberAdd',
};