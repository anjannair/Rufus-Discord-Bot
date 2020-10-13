const Discord = require("discord.js");
const Canvas = require('canvas');

const config = require('../config.json');
const index = require('../index');
const bot = index.client;

/*
If you want to include captchas for all the servers your bot is in remove the else statement and everything under it completely.
Remove the if statement but the code inside it will be used
Make sure you have a unverified role which restricts the user

If you want to include captchas for specific servers only follow this code and replace GUILD ID with the guild id to be included
*/


module.exports = async (member) => {
    if(member.user.bot) return;
 if(member.guild.id == "GUILD ID"){//this was you can seperate the guild from the non captcha guild
    let welcomemrole1 = member.guild.roles.cache.find(role => role.name === `unverified`);
    if(welcomemrole1) member.roles.add(welcomemrole1);
    if(!welcomemrole1) console.log("No welcome rolefound");
    const captcha = Math.random().toString(36).slice(2, 8);
	const canvas = Canvas.createCanvas(700, 250);
    const ctx = canvas.getContext('2d');


    const background = await Canvas.loadImage('images/captcha.jpg');
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);


    ctx.strokeStyle = '#74037b';
    ctx.strokeRect(0, 0, canvas.width, canvas.height);


    ctx.font = '28px sans-serif';
    ctx.fillStyle = '#121111';
	ctx.fillText(captcha, canvas.width / 2.5, canvas.height / 1.8);
	const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'captcha.jpg');
    
	try {
        const msg = await member.send(`**Please enter the given captcha below to verify yourself**. \n(*__you have 30 minutes to enter the captcha or you will be kicked__*)`,attachment);
        try {
            const filter = m => {
                if(m.author.bot) return;
                if(m.author.id === member.id && m.content === captcha) return true;
                else {
                    m.channel.send('You entered the captcha incorrectly.');
                    return false;
                }
            };
            const response = await msg.channel.awaitMessages(filter, { max: 1, time: 600000, errors: ['time']});
            if(response) {
				var embs = new Discord.MessageEmbed()
					.setColor('#E7A700')
					.setTitle(`Welcome to ${member.guild.name}`)
					.setDescription(`You are now with ${member.guild.memberCount} members\n\nIf you find yourself facing any difficulties contact the admins of the server`);
				await msg.channel.send('You have verified yourself!');
				await msg.channel.send(embs);
				let removerole = member.guild.roles.cache.find(role => role.name === `unverified`);
				if(removerole) member.roles.remove(removerole);
				if(!removerole) console.log("No unverified tag");

                const applyText = (canvas, text) => {
                    const ctx = canvas.getContext('2d');
                    let fontSize = 70;
            
                    do {
                        ctx.font = `${fontSize -= 10}px sans-serif`;
                    } while (ctx.measureText(text).width > canvas.width - 300);
            
                    return ctx.font;
                };
				
				var channel = member.guild.channels.cache.find(ch => ch.name === 'welcome');
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
                
            }
        }
        catch(err) {
            console.log(err);
            await msg.channel.send('You did not solve the captcha correctly on time.');
			await member.kick();
		}
	}catch(err) {
        console.log(err);
    }
 }
 else{
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

	
	var channel = member.guild.channels.cache.find(ch => ch.name === 'welcome');
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
    }
};
module.exports.help = {
	event: 'guildMemberAdd',
};