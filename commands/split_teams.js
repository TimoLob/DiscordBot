const utils = require("./utils/utils.js");
module.exports = {
	name: 'randteams',
	description: 'Distribute the people in senders voice channel to multiple other channels',
	aliases: ['commands'],
	usage: '!randteams <t1> <t2> <t3> ...',
	hidden: true,
	execute(message, args) {
		sender = message.member;
        if(!utils.isAdmin(sender)) {
			return message.reply('Only an admin can use this command.');
		}
		msg = "";
		voiceStateSender = sender.voice;

		srcChannel = voiceStateSender.channel;

		if(!srcChannel)
			return message.channel.send("You must be in a voice channel to use this command.");
		
		if(args.length<2) {
			return message.channel.send("Usage: "+usage);
		}
		
		members = srcChannel.members; // Collection
		let memberArray = [];
		msg+="Detected people:\n";
		members.forEach(member => {
			msg+=member.displayName+"\n";
			memberArray.push(member);
		});
		msg+="----------\n";
		// Fetch voice channels
		guildchannelmanager = sender.guild.channels;

		voicechannels = [];
		args.forEach(channelName => {
			voicechannels.push(guildchannelmanager.resolve(channelName));
		})
		// Initialize empty Teams
		numTeams = voicechannels.length;
		teams = new Array(numTeams);
		for(let i=0;i<numTeams;i++) {
			teams[i] = [];
		}
		let teamIndex = 0;
		memberArray = utils.shuffle(memberArray);
		memberArray.forEach(value => {
			teams[teamIndex].push(value);
			teamIndex = (teamIndex+1)%numTeams;
		});
		
		for(let teamInd=0;teamInd<numTeams;teamInd++) {
			msg+="Team #"+teamInd+"\n";
			teams[teamInd].forEach(member => {
				voiceState = member.voice;
				console.log("Moving "+member.displayName+" to "+voicechannels[teamInd].id);
				member.voice.setChannel(voicechannels[teamInd]);
				msg+=member.displayName+"\n";
			});
		}
		return message.channel.send(msg);
	},
};