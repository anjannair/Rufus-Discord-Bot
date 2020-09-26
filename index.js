const discord = require("discord.js");
const Intents = require("discord.js");
const fs = require("fs");
const Discord = require('discord.js');
const Canvas = require('canvas');
const lineReader = require('line-reader');
const request = require("request");
const config = require("./config.json");
const TicTacToe = require('discord-tictactoe');
const bot = new discord.Client({ ws: { intents: Intents.ALL } });

//bot ready
bot.on("ready", async () => {
	console.log(`${bot.user.username} is ready for action!`);
	bot.user.setActivity(config.activity.game, {type: 'WATCHING'});
});

//load dsd commands
bot.aliases = new discord.Collection();
bot.dsd = new discord.Collection();
fs.readdir("./commands/dsd", (err, files) => {
	if(err) console.error(err);
	let jsfiles = files.filter(f => f.split(".").pop() === "js");

	if(jsfiles.length <=0){
		console.log("DSD conversions couldn't load");
		return;
	}

	console.log(`loading ${jsfiles.length} dsd commands...`);
	jsfiles.forEach((f,i) => {
		let props = require(`./commands/dsd/${f}`);
		console.log(`${i+1}: ${f} loaded`);
		bot.dsd.set(props.help.name, props);
		props.help.aliases.forEach(alias =>{
			bot.aliases.set(alias, props.help.name);
		});
	});
});

//load admin commands
bot.admin = new discord.Collection();
fs.readdir("./commands/admin", (err, files) => {
	if(err) console.error(err);
	let jsfiles = files.filter(f => f.split(".").pop() === "js");

	if(jsfiles.length <=0){
		console.log("Admin commands couldn't load");
		return;
	}

	console.log(`loading ${jsfiles.length} admin commands...`);
	jsfiles.forEach((f,i) => {
		let props = require(`./commands/admin/${f}`);
		console.log(`${i+1}: ${f} loaded`);
		bot.admin.set(props.help.name, props);
		props.help.aliases.forEach(alias =>{
			bot.aliases.set(alias, props.help.name);
		});
	});
});

//load commands for newbies
bot.newbie = new discord.Collection();
fs.readdir("./commands/newbies", (err, files) => {
	if(err) console.error(err);
	let jsfiles = files.filter(f => f.split(".").pop() === "js");

	if(jsfiles.length <=0){
		console.log("Newbie commands couldn't load");
		return;
	}

	console.log(`loading ${jsfiles.length} newbie commands...`);
	jsfiles.forEach((f,i) => {
		let props = require(`./commands/newbies/${f}`);
		console.log(`${i+1}: ${f} loaded`);
		bot.newbie.set(props.help.name, props);
		props.help.aliases.forEach(alias =>{
			bot.aliases.set(alias, props.help.name);
		});
	});
});

//load misc commands
bot.commands = new discord.Collection();
fs.readdir("./commands/misc/", (err, files) => {
	if (err) console.error(err);
	let jsfiles = files.filter(f => f.split(".").pop() === "js");

	if(jsfiles.length <= 0){
		console.log("There are no misc commands to load...");
		return;
	}

	console.log(`loading ${jsfiles.length} misc commands...`);
	jsfiles.forEach((f, i) => {
		let props = require(`./commands/misc/${f}`);
		console.log(`${i+1}: ${f} loaded`);
		bot.commands.set(props.help.name, props);
		props.help.aliases.forEach(alias =>{
			bot.aliases.set(alias, props.help.name);
		});
	});
});

//message event
bot.on("message", async message => {
	if(message.author.bot) return;
	if (message.channel.type === "dm") return;

	let prefix = config.prefix;
	let args = message.content.slice(prefix.length).trim().split(' ');
	let rope = args.shift().toLowerCase();
	let fan;
	let fan1;
	let fan2;
	let fan3;

	if(!message.content.startsWith(prefix)) return;

	//for dsd
	if (bot.dsd.has(rope)){
		fan = bot.dsd.get(rope);
	}
	else{
		fan = bot.dsd.get(bot.aliases.get(rope));
	}
	if(fan) fan.run(bot, message, args);

	//for admin
	if (bot.admin.has(rope)){
		fan1 = bot.admin.get(rope);
	}
	else{
		fan1 = bot.admin.get(bot.aliases.get(rope));
	}
	if(fan1) fan1.run(bot, message, args);

	//for newbie
	if (bot.newbie.has(rope)){
		fan2 = bot.newbie.get(rope);
	}
	else{
		fan2 = bot.newbie.get(bot.aliases.get(rope));
	}
	if(fan2) fan2.run(bot, message, args);

	//for misc
	if (bot.commands.has(rope)){
		fan3 = bot.commands.get(rope);
	}
	else{
		fan3 = bot.commands.get(bot.aliases.get(rope));
	}
	if(fan3) fan3.run(bot, message, args);
});

//from the package TicTackToe for the game tictactoe
new TicTacToe({
  language: 'en',
  command: '*ttt'
}, bot);

//reaction event for fruits

//You can make such for anything. Let your imagination run wild

bot.on('message', message => {
	if (message.content.toLowerCase() === 'fruits') {
		message.react('🍎')
			.then(() => message.react('🍊'))
			.then(() => message.react('🍇'))
			.catch(() => console.error('One of the emojis failed to react.'));
	}
});

//reaction event for noob
bot.on('message', message => {
	if (message.content.toLowerCase() === 'noob') {
		message.react('😑')
			.catch(() => console.error('One of the emojis failed to react.'));
	}
});

//send user message on joining
bot.on('guildMemberAdd' , async member =>{
	var embs = new discord.MessageEmbed()
		.setColor('#E7A700')
		.setTitle(`Welcome to ${member.guild.name}`)
		.setDescription(`You are now with ${member.guild.memberCount} members\n\nIf you find yourself facing any difficulties contact the admins of the server`);
	member.send(embs);
});

//member welcome!
bot.on('guildMemberAdd', async (member,message) =>{
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
});

//member leave or kicked or ban
bot.on('guildMemberRemove', async member =>{
	
	var channel = member.guild.channels.cache.find(ch => ch.name === 'welcome');//leave channel can be same as welcome channel
	if (!channel) return console.log('Bot failed to find a "Welcome Channel". Please ensure a welcome channel is set');
	
	channel.send(`${member.user.username} has left the server. RIP 😢.`);
});

//link scanner
bot.on('message', message => {
	var j = 0;
	function isValidURL(string) {
		//regex for link
		// eslint-disable-next-line no-useless-escape
		const res = string.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
		return (res !== null);
		}
	if(isValidURL(message.content.toLowerCase())==true){
		var a = message.id;
		//do not open any link mentioned in the dangurls text file. You have been warned
		lineReader.eachLine('commands/admin/dangurls.txt', (line, last) => {
			if(message.content.toLowerCase().startsWith("https://www."+line) || (message.content.toLowerCase().startsWith("http://www."+line)) || (message.content.toLowerCase().startsWith(line)) || (message.content.toLowerCase().startsWith("http://"+line)) || (message.content.toLowerCase().startsWith("https://"+line))){
				message.channel.messages.fetch(a).then(msg => msg.delete({ timeout: 1000 }));
			let links = new Discord.MessageEmbed()
				.setColor('#E7A700')
				.setTitle(`⚠ This link is DANGEROUS ⚠`)
				.setDescription(`${message.author}`)
				.setFooter("This filter is in beta. False negatives are possible but very rare. If you got this warning be careful of the link");

			message.reply(links).catch(err =>{
				message.reply("An error occured");
			});
			j++;
			return false;
			}
		});
	}
	if(j>0){
		const nvt = require('node-virustotal');
		const defaultTimedInstance = nvt.makeAPI();
		const theSameObject = defaultTimedInstance.domainLookup(message.content.toLowerCase(), function(err, res){
  if (err) {
    console.log('Virustotal API did not work because:');
    console.log(err);
    return;
  }
  var road = JSON.parse(res);
  if(road.data.attributes.last_analysis_results.Kaspersky.result != "clean"){
	let links = new Discord.MessageEmbed()
				.setColor('#E7A700')
				.setTitle(`⚠ This link is ${road.data.attributes.last_analysis_results.Kaspersky.result.toUpperCase()} ⚠`)
				.setDescription(`${message.author}`)
				.setFooter("This filter is in beta. False negatives are possible but very rare. If you got this warning be careful of the link");

			message.reply(links).catch(err =>{
				return message.reply("An error occured");
			});
  }
});
	}
});

//banned words
bot.on('message', message => {
	if(!message.guild) return;
	if(message.guild.id == '756813837218349056' && message.channel.id != '758267577683804171'){
	var j = 0;
	var plit = message.content.toLowerCase();
	var words = plit.split(" ");
    lineReader.eachLine('commands/admin/bannedwords.txt', (line, last) => { //create a banned.txt
		for(var i = 0; i<words.length; i++){
			if(words[i].trim().includes(line)){
				console.log(plit); //incase you want to improve the filter
				message.delete({timeout :1000});
				j++;
				break;
			}
		}
	if(j>0){
	var embs = new discord.MessageEmbed()
    .setColor('#FF0000')
    .setTitle(`WARNED`)
	.setDescription(`Do NOT use cuss words here!! \n\nIf you think this is an error contact <@414992506665828364> as this filter is still in beta`);
	message.channel.send(embs);
			return false;
	}
	});
	}
});

//ReviewMeta API
bot.on('message', async message => {
	if (message.content.startsWith("https://www.amazon.in")) {
		var code = null;
var finlink = message.content.split('');
for(var i = 0;i<finlink.length;i++)
{
	if(finlink[i] == "B" && finlink[i+1] == "0")//This method can be used for Amazon.com/ any country's Amazon site too
	{
	code = finlink[i]+finlink[i+1]+finlink[i+2]+finlink[i+3]+finlink[i+4]+finlink[i+5]+finlink[i+6]+finlink[i+7]+finlink[i+8]+finlink[i+9];
	break;
	}
}

/*If you notice the ReviewMeta website it uses a code which is found in amazons link 
We find the code, store it and utilize it*/

if(!code) return message.channel.send("Are you sure that is a product?");
	var url = `https://reviewmeta.com/api/amazon-in/${code}`;
	return request(url, (err, response, body) =>{
	if (err) throw(err);
	var data = JSON.parse(body);
	const embed = new discord.MessageEmbed()
			.setColor('#EFFF00')
			.setTitle(data.title)
			.setURL(data.href)
			.setImage(data.image)
			.addFields(
				{ name: 'ReviewMeta Rating', value: data.rating }
			)
			.setFooter('\n\nSometimes the rating may not load due to caching issues. Just click on the link to get the review.');
			
	message.channel.send(embed).catch(console.error);
    });
}
});

bot.login(process.env.TOKEN);//finally the token
