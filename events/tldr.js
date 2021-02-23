/* eslint-disable no-useless-escape */
const Discord = require('discord.js');
const lineReader = require('line-reader');
const config = require('../config.json');
require('dotenv').config();
const index = require('../index');
const fetch = require('node-fetch');
const bot = index.client;
module.exports = async message => {
	function isValidURL(string) {
		//regex for link
		const res = string.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
		return (res !== null);
	}
	if (isValidURL(message.content.toLowerCase()) == true) {
		let storyfetcher = `https://api.smmry.com/&SM_API_KEY=${process.env.TLDR}&SM_URL=${message.content.toLowerCase()}`;
		let response = await fetch(storyfetcher).catch(err => {
			console.log("error");
			return;
		});
		let data = await response.json().catch(err => {
			return;
		});
		if (!data) return;
		if (data.sm_api_error) return;
		let summary = data.sm_api_content;
		await message.react('❓');
		const newfilter = (reaction, user) => {
			return ['❓'].includes(reaction.emoji.name) && user.bot == false;
		};
		await message.awaitReactions(newfilter, { max: 1, time: 300000, errors: ['time'] })
			.then(async collected => {
				const waitreaction = collected.first();
				var reacted_user = collected.first().users.cache.map(user => user.username + "#" + user.discriminator);
				if (waitreaction.emoji.name === '❓') {
					message.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));

					//To handle the limitations of text by discord 
					if (data.sm_api_character_count > 2048) {
						summary = data.sm_api_content.substring(0, 2044) + "...";
						const embed = new Discord.MessageEmbed()
							.setTitle(data.sm_api_title)
							.setColor('#FF7F50')
							.setDescription(summary)
							.setFooter(`Click on the forward button to go to the next page.\nPage [1/2]\nRequested by ${reacted_user[1]}`);

						const filter = (reaction, user) => {
							return ['⏩'].includes(reaction.emoji.name) && user.id === message.author.id;
						};

						message.channel.send(embed).then(sentembed => {
							sentembed.react('⏩');
							sentembed.awaitReactions(filter, { max: 1, time: 300000, errors: ['time'] })
								.then(collected => {
									const reaction = collected.first();
									if (reaction.emoji.name === '⏩') {
										const editembed = new Discord.MessageEmbed()
											.setTitle(data.sm_api_title)
											.setColor('#FF7F50')
											.setDescription(data.sm_api_content.substring(2043, data.sm_api_content.length))
											.setFooter(`I have reduced the article for you by ${data.sm_api_content_reduced}\nPage[2/2]\nRequested by ${reacted_user[1]}`);
										sentembed.edit(editembed);
									}
								});
						});
					}
					//for normal summaries
					else {
						const embed = new Discord.MessageEmbed()
							.setTitle(data.sm_api_title)
							.setColor('#FF7F50')
							.setDescription(summary)
							.setFooter(`I have reduced the article for you by ${data.sm_api_content_reduced}\nRequested by ${reacted_user[1]}`);
						message.channel.send(embed);
					}
				}
			})
			.catch(collected => {
				message.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));
			});
	}
};

module.exports.help = {
	event: 'message'
};