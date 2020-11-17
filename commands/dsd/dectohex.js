const discord = require("discord.js");
const { Command } = require('discord.js-commando');

module.exports = class rufus extends Command {
    constructor(client) {
        super(client, {
            name: 'dectohex',
            group: 'dsd',
            memberName: 'dectohex',
            description: 'Convert decimal to hexadecimal',
            guildOnly: true,
            args: [{
                key: 'decimal',
                prompt: 'Input the decimal to convert',
                type: 'integer',
            }]
        });
    }

    async run(message, { decimal }) {
        var ant = decimal;
        var boy = "" + ant;
        var cat = "";
        var nook = "";
        var lol = 0;
        for (var i = 0; i < boy.length; i++) {
            if (boy.charAt(i) == ".") {
                lol++;//counter for demcial
                break;
            }
            cat = cat + boy.charAt(i);
        }
        var fur = "";
        var goat = "";
        var dog = parseInt(cat);
        var hat = (ant % 1).toFixed(2);//calculates 2 decimal places
        var ice = Math.floor(hat * 16);
        if (ice == 10) nook += "A";
        else if (ice == 11) nook += "B";
        else if (ice == 12) nook += "C";
        else if (ice == 13) nook += "D";
        else if (ice == 14) nook += "E";
        else if (ice == 15) nook += "F";
        else nook += ice;
        var joke = (ant % 1).toFixed(1);//calculates 1 decimal place
        var king = Math.floor(joke * 16);
        if (king == 10) nook += "A";
        else if (king == 11) nook += "B";
        else if (king == 12) nook += "C";
        else if (king == 13) nook += "D";
        else if (king == 14) nook += "E";
        else if (king == 15) nook += "F";
        else nook += king;

        while (dog >= 1) {
            var ear = dog % 16;
            if (ear == 10) fur += "A";
            else if (ear == 11) fur += "B";
            else if (ear == 12) fur += "C";
            else if (ear == 13) fur += "D";
            else if (ear == 14) fur += "E";
            else if (ear == 15) fur += "F";
            else fur += ear;
            dog = Math.floor(dog / 16);
        }

        for (var i = fur.length; i >= 0; i--) {
            goat = goat + fur.charAt(i);
        }

        if (lol == 0) message.channel.send(goat);//if no decimal
        if (lol == 1) message.channel.send(goat + "." + nook);//if decimal
    }
};