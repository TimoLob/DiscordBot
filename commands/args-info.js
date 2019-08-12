module.exports = {
	name: 'args-info',
	description: 'info command for error handling',
	usage: 'args-info <arg1> <arg2> ...',
	hidden: true,
	execute(message, args) {
		if (!args.length) {
			// Or msg.reply() to @ the user
			message.channel.send(`You didn't provide any arguments, ${message.author}!`);
		}
		else {
			message.channel.send(`Arguments: ${args}`);
		}
	},
};