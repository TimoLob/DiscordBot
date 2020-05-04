module.exports = {
	name: 'randteams',
	description: 'Distribute the people in senders voice channel to multiple other channels',
	aliases: ['commands'],
	usage: '!randteams <t1> <t2> <t3> ...',
	execute(message, args) {
        if(!member.roles.some(role => role.name === 'Admin')) {return message.reply('Only an admin can use this command.');}
		msg = "";
		srcChannel = message.member.voice.channel;
		if(!srcChannel)
			return message.channel.send("You must be in a voice channel to use this command.");
		
		members = srcChannel.members;
		members.forEach(member => {
			msg+=member.displayName+"\n";
		});

        if(args.length<3) {
            return message.channel.send('!randteams <t1> <t2> <t3> ...');
        }

		return message.channel.send(msg);
	},
};