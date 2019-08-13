module.exports = {
	name: 'code',
	description: 'Links to the github repository of this bot',
	usage: '!code',
	execute(message, args) {
		message.channel.send('You can find my source code here:\nhttps://github.com/TimoLob/DiscordBot');
	},
};