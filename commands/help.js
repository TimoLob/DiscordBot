module.exports = {
	name: 'help',
	description: 'List all of my commands',
	aliases: ['commands'],
	usage: '!help',
	execute(message, args) {
        const { commands } = message.client;
        let reply = '';
        commands.forEach(element => {
            if(!element.hidden) {
            reply += '**' + element.name + '**\n' + element.description + '\n' + element.usage + '\n-----------\n';
            }
        });
        message.channel.send(reply);
	},
};