const discord = require("discord.js");
const { Command } = require('discord.js-commando');

module.exports = class rufus extends Command {
    constructor(client) {
        super(client, {
            name: 'bintooct',
            group: 'dsd',
            memberName: 'bintooct',
            description: 'Convert binary to octal',
            guildOnly: true,
            args: [{
                key: 'binary',
                prompt: 'Input the binary to convert',
                type: 'integer',
            }]
        });
    }

    async run(message, { binary }) {
        var zap = binary;
        var yam = "" + zap;
        var k = 0;
        var res = "";
        var abc = "";
        var xyz = "";
        for (var i = 0; i < yam.length; i++) {
            if (yam.charAt(i) == ".") {
                k = i;
            }
        }
        if (k == 0) {
            if (yam.length % 3 != 0) {
                while (true) {
                    yam = "0" + yam;
                    if (yam.length % 3 == 0) break;
                }
            }
            var octal = parseInt(yam, 2).toString(8);
            message.channel.send(octal);
        }
        else {
            for (var z = 0; z < k; z++) {
                xyz += yam.charAt(z);
            }
            if (xyz.length % 3 != 0) {
                while (true) {
                    xyz = "0" + xyz;
                    if (xyz.length % 3 == 0) break;
                }
            }
            var oct = parseInt(xyz, 2).toString(8);
            for (var i = 0; i < yam.length; i++) {
                if (yam.charAt(i) == ".") {
                    k = i;
                }
            }
            for (var j = k + 1; j < yam.length; j++) {
                abc += yam.charAt(j);
            }
            if (abc.length % 3 != 0) {
                while (true) {
                    abc = abc + "0";
                    if (abc.length % 3 == 0) break;
                }
            }
            var octal = parseInt(abc, 2).toString(8);
            message.channel.send(oct + "." + octal);
        }
    }
};