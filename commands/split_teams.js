module.exports = {
	name: 'randteams',
	description: 'Distribute the people in senders voice channel to multiple other channels',
	aliases: ['commands'],
	usage: '!randteams <t1> <t2> <t3> ...',
	execute(message, args) {
		sender = message.member;
        if(!sender.roles.some(role => role.name === 'Admin')) {return message.reply('Only an admin can use this command.');}
		msg = "";
		voiceStateSender = sender.voice;
		console.log("VoiceState:"+voiceStateSender);
		console.log("Sender type:"+sender.constructor.name);
		srcChannel = message.member.voiceChannel;
		console.log("VoiceChannel:",srcChannel);
		console.log("Type: "+srcChannel.constructor.name);
		if(!srcChannel)
			return message.channel.send("You must be in a voice channel to use this command.");
		
		if(args.length<2) {
			return message.channel.send("Usage: "+usage);
		}

		members = srcChannel.members;
		members.forEach(member => {
			msg+=member.displayName+"\n";
		});

		// Fetch voice channels
		guildchannelmanager = sender.guild.channels;
		voicechannels = [];
		args.forEach(channelName => {
			voicechannels.push(guildchannelmanager.resolve(channelName));
		})
		console.log("Channels:"+voicechannels);

		return message.channel.send(msg);
	},
};