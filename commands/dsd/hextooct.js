const discord = require("discord.js");
//the variables may confuse but its implementation is correct
module.exports.run = async (bot, message, args) => {
    if(!args) return message.reply("You cant leave this empty!");
    var zap = args;
    var yam = ""+zap;
    var xek = "";
    var uv = "";
    var k = 0;
    for(var j=0;j<yam.length;j++){
        if(yam.charAt(j)=="."){
            k=j;
        }
    }
    if(k==0){
    for(var i =0;i<yam.length;i++){
        var a = yam.charAt(i).toUpperCase();    //hex to oct values
        let b;
        if(a=="0") b="0000";
        if(a=="1") b="0001";
        if(a=="2") b="0010";
        if(a=="3") b="0011";
        if(a=="4") b="0100";
        if(a=="5") b="0101";
        if(a=="6") b="0110";
        if(a=="7") b="0111";
        if(a=="8") b="1000";
        if(a=="A") b="1010";
        if(a=="B") b="1011";
        if(a=="C") b="1100";
        if(a=="D") b="1101";
        if(a=="E") b="1110";
        if(a=="F") b="1111";
        xek+=b;
    }
    if(xek.length % 3 !=0){
        while(true){
            xek = "0"+xek;
            if(xek.length % 3 == 0) break;
        }
    }
    var octal = parseInt(xek, 2).toString(8);
    message.channel.send(octal);
    //message.channel.send(xek);
    }
    else{
        for(var i=0;i<k;i++){
            var a = yam.charAt(i).toUpperCase();
            let b;
            if(a=="0") b="000";
            if(a=="1") b="001";
            if(a=="2") b="010";
            if(a=="3") b="011";
            if(a=="4") b="100";
            if(a=="5") b="101";
            if(a=="6") b="110";
            if(a=="7") b="111";
            if(a=="8") b="1000";
            if(a=="A") b="1010";
            if(a=="B") b="1011";
            if(a=="C") b="1100";
            if(a=="D") b="1101";
            if(a=="E") b="1110";
            if(a=="F") b="1111";
            xek+=b;
        }

        if(xek.length % 3 !=0){
            while(true){
                xek = "0"+xek;
                if(xek.length % 3 == 0) break;
            }
        }
        var octal = parseInt(xek, 2).toString(8);

        for(var j=k+1;j<yam.length;j++){
            var c = yam.charAt(j).toUpperCase();
            let d;
            if(c=="0") d="000";
            if(c=="1") d="001";
            if(c=="2") d="010";
            if(c=="3") d="011";
            if(c=="4") d="100";
            if(c=="5") d="101";
            if(c=="6") d="110";
            if(c=="7") d="111";
            if(c=="8") d="1000";
            if(c=="A") d="1010";
            if(c=="B") d="1011";
            if(c=="C") d="1100";
            if(c=="D") d="1101";
            if(c=="E") d="1110";
            if(c=="F") d="1111";
            uv+=d;
        }

        if(uv.length % 3 !=0){
            while(true){
                uv = uv + "0";
                if(uv.length % 3 == 0) break;
            }
        }
        var oct = parseInt(uv, 2).toString(8);

        message.channel.send(octal+"."+oct);
    }
};

module.exports.help = {
	name: "hextooct",
    aliases: ['ho']
};