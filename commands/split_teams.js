module.exports = {
	name: 'randteams',
	description: 'Distribute the people in senders voice channel to multiple other channels',
	aliases: ['commands'],
	usage: '!randteams <t1> <t2> <t3> ...',
	execute(message, args) {
		sender = message.member;
        if(!sender.roles.cache.has("610472977770872844")) {return message.reply('Only an admin can use this command.');}
		msg = "";
		voiceStateSender = sender.voice;

		srcChannel = voiceStateSender.channel;

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
			console.log(channelName);
		})
		console.log("Channels:"+voicechannels);

		numTeams = voicechannels.length;
		console.log(members);
		teams = new Array(numTeams);
		for(let i=0;i<numTeams;i++) {
			teams[i] = [];
		}
		let teamIndex = 0;

		members.forEach((value,key) => {
			teams[teamIndex].push(value);
			console.log(value.displayName+" in Team #"+teamIndex);
			teamIndex = (teamIndex+1)%numTeams;
		});
		
		for(let teamInd=0;teamInd<numTeams;teamInd++) {
			teams[teamInd].forEach(member => {
				voiceState = member.voice;
				console.log("Moving "+member.displayName+" to "+voicechannels[teamInd].id);
				member.voice.setChannel(voicechannels[teamInd]);
			});
		}
		return message.channel.send(msg);
	},
};