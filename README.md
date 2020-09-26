# Rufus

Rufus is a dicord bot with the intention of replacing MEE6. This uses javascript as its programming language and has no SQL database to change the prefix.

The extensive guide to building a Javascript bot can be found [here](discordjs.guide).

This is no way affliated to the company Rufus

<div align="center">
<img src="https://github.com/anjannair/Rufus-Discord-Bot/blob/master/images/Rufus.png" >
<p>The Pacman inspired logo</p>
</div>

# Features
• Automeme feature - Post memes every one hour (time can be changed) from an array of subreddits at random. The API link in the array can be edited to add more subreddits.


• Manuals - A lot of my friends were new to the enviornment of discord. To easen them up they only had to remember one prefix only and a the bot name they wanted to know about.

• Moderation - Ban, kick, warn, prune messages, mute and unmute all and muting and unmuting a user (same goes for deafening) features are included with appropriate permissions.

• Games - Currently 8ball and TicTacToe are included.

• QR code generator for links.

• API integrations - Currently ReviewMeta API, Reddit meme API, Urban Dictionary API, Number API, CatFact API, Dogpile API, NASA API and Tenor API are being used.

• Heroku integration - A free cloud hosting for small bots for few guilds (servers). The bot remains online 24/7.

# How to host your own bot
It's really very simple.

### STEP 1
Head over to the [developers](discord.com/developers) and create an app.

### STEP 2
Once done add a good name and icon for your bot. The proceed to OAuth2 and scroll to `scopes` and select the `bot` option.
Scroll further down and select the `permissions` your bot needs. (I prefer giving it the `Administrator` permission for easy purposes).

### STEP 3 
A link should be generated between `scopes` and `permissions`. Copy and paste it in your new browser. This link invites your bot to your guild.

### STEP 4
If you have git pre installed on your laptop just clone this repo using `git clone https://github.com/anjannair/Rufus-Discord-Bot.git`

If you don't have git download the code from `https://github.com/anjannair/Rufus-Discord-Bot/archive/master.zip` and extract it. 

### STEP 5
Modify the code to your suiting.

After modifying it create your repo and upload the code there.

**Important** : If you intend to change the index.js file to anything else like for example bot.js then change the name of the file in the *Procfile* file from `Worker: node index.js` to `Worker: node bot.js`

### STEP 6

After modifying the code, create an app on Heroku and link your github repo (private or public anything is fine) to it.

Head over to app settings > Config Vars > Reveal config vars and input your KEY name as TOKEN and VALUE as the discord bot token

Do the same for the other API's

Hit **Deploy branch** 

Note: Automatic Deployment is totally optional. You will have to manually deploy the branch everytime your code changes on github if automatic deployment is disabled.

### STEP 7
Go to resources and switch off the web dyno and turn on your worker dyno. Your bot is good to go! 

After deploying the bot there may be issues in finding the dynos in the resources page. Just refresh it and its there!!

If incase your bot fails to show up or you encounter any error check the app logs
