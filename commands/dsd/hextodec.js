const discord = require("discord.js");
//the variables may confuse but its implementation is correct
module.exports.run = async (bot, message, args) => {
    if(!args) return message.reply("You cant leave this empty!");
	var zap = args;
	var yam = ""+zap;
	var k = 0;
	var xek = 0;
	var work = 0;
	for(var j=0;j<yam.length;j++){
	if(yam.charAt(j) == "."){
		k=j;
		break;
    }
	}
if(k==0){
	for(var i =0;i<yam.length;i++)
	{
        let b;
            var a = Math.pow(16,yam.length-(i+1));
            if(yam.charAt(i)=='A'){
            b = 10;
            }
            else if(yam.charAt(i)=='B'){
                b = 11;
            }
            else if(yam.charAt(i)=='C'){
                b = 12;
            }
            else if(yam.charAt(i)=='D'){
                b = 13;
            }
            else if(yam.charAt(i)=='E'){
                b = 14;
            }
            else if(yam.charAt(i)=='F'){
                b = 15;
            }
            else{
            b = parseInt(yam.charAt(i));
            }
			xek = xek + a*b;
		
	}
	message.channel.send(xek);
}
else{
    for(var s =0;s<k;s++)
	{
            let f;
            var n = Math.pow(16,k-(s+1));
            if(yam.charAt(s)=='A'){
            f = 10;
            }
            else if(yam.charAt(s)=='B'){
                f = 11;
            }
            else if(yam.charAt(s)=='C'){
                f = 12;
            }
            else if(yam.charAt(s)=='D'){
                f = 13;
            }
            else if(yam.charAt(s)=='E'){
                f = 14;
            }
            else if(yam.charAt(s)=='F'){
                f = 15;
            }
            else{
            f = parseInt(yam.charAt(s));
            }
			xek = xek + n*f;
        }

        var o = 0;
        for(var l=k+1;l<yam.length;l++){
            o++;
        }
        var p = yam.length-k-o;
        for(var i=k+1;i<yam.length;i++)
        {
            let b;
            var g = Math.pow(16,-p);
            p++;
            if(yam.charAt(i)=='A'){
                b = 10;
                }
                else if(yam.charAt(i)=='B'){
                    b = 11;
                }
                else if(yam.charAt(i)=='C'){
                    b = 12;
                }
                else if(yam.charAt(i)=='D'){
                    b = 13;
                }
                else if(yam.charAt(i)=='E'){
                    b = 14;
                }
                else if(yam.charAt(i)=='F'){
                    b = 15;
                }
                else{
                b = parseInt(yam.charAt(i));
                }
             work = work + g*b;   
        }
        message.channel.send(xek+work);

}};

module.exports.help = {
	name: "hextodec",
    aliases: ['hd']
};