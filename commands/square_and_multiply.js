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
            x = args[0];
            y = args[1];
            mod = args[2];
            exp = y.toString(2);
            value = x;
            let msg = ""
            for(let i=0;i<exp.length;i++) {
                msg = `x^${exp.substring(0,i)}0=${value}*${value}`;
                value = value *value % mod;
                msg += `=${value}`;
                message.channel.send(msg);
                if(exp[i]=="1") {
                    msg = `x^${exp.substring(0,i+1)}=${value}*${x}`;
                    value = value * x % mod;
                    msg+=`=${value}`;
                    message.channel.send(msg);
                }
            }
            message.channel.send(value);
		}
	},
};