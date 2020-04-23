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
            for(let i=0;i<exp.length;i++) {
                value = value *value % mod;
                if(exp[i]==="1") {
                    value = value * x % mod;
                }
            }
            message.channel.send(value);
		}
	},
};