const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
	const rythmembed = new discord.MessageEmbed()
		.setColor('#E7A700')
		.setTitle('RYTHM BOT MANUAL')
		.setDescription(`

		\`\`\`1) +p SONG_NAME\`\`\`  Enter this command but replace SONG_NAME with the song you want to play

		\`\`\`2) +fs\`\`\`  Force skips the song(Don't use this unless the song is really bad)

		\`\`\`3) +skip\`\`\`  Skips the song after taking a vote count by the listeners

		\`\`\`4) +q\`\`\`  If you play more than one song it gets added to the queue. View those songs using this.

		\`\`\`5) +shuffle\`\`\`  Shuffles the queue

		\`\`\`6) +lyrics\`\`\`  Provides the lyrics of the song

		\`\`\`7) +np\`\`\`  Shows what the bot is currently playing

		\`\`\`8) +seek\`\`\`  Goes to a particular timestamp of the song

		\`\`\`9) +stop\`\`\`  Stops the song

		\`\`\`10) +pause\`\`\`  Pauses the song

		\`\`\`11) +resume\`\`\`  Resumes the song after pausing it

		\`\`\`12) +loop\`\`\`  Loops the current song
	 

	THESE ARE THE MAIN COMMANDS AND APPLICABLE ON ALL SERVERS`)
		.setImage('https://rythmbot.co/assets/img/rythm-min.png');
	message.channel.send(rythmembed);
};

module.exports.help = {
	name: "rythm",
    aliases: ['rythmbot']
};