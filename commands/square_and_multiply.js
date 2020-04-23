module.exports = {
	name: 'square_mul',
	description: 'Calculates x^y mod m',
	usage: '!square_mul x y m',
	hidden: false,
	execute(message, args) {
		if (args.length!=3) {
			// Or msg.reply() to @ the user
			message.channel.send(`Usage: square_mul x y m`);
		}
		else {
            x = parseInt(args[0]);
            y = parseInt(args[1]);
            mod = parseInt(args[2]);

            if(x<0 || y<=0 || mod <=0) {
                message.channel.send("Please don't try to break me. Use positive numbers.");
                return;
            }

            exp = "0b"+y.toString(2);
            message.channel.send(`x:${x} ; y:${y} ; mod:${mod} ; exp:${exp}`);

            value = x;
            let msg = ""
            for(let i=3;i<exp.length;i++) {
                msg += `x^${exp.substring(2,i)}0 = ${value}\\*${value}`;
                value = value *value % mod;
                msg += ` = ${value}\n`;
                if(exp[i]=="1") {
                    msg += `x^${exp.substring(2,i+1)} = ${value}\\*${x}`;
                    value = value * x % mod;
                    msg+=` = ${value}\n`;
                }
            }
            message.channel.send(msg+"\n"+`${x}^${y}=${value} mod ${mod}`)
		}
	},
};