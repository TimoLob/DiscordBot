const utils = require("./utils/utils.js");
module.exports = {
	name: 'splitteams',
	description: 'Distribute the people in senders voice channel to multiple other channels',
	aliases: ['commands'],
	usage: '!splitteams <t1> <t2> <t3> ...',
	hidden: true,
	execute(message, args) {
		let sender = message.member;
        if(!utils.isAdmin(sender)) {
			return message.reply('Only an admin can use this command.');
		}
		let msg = "";
		let voiceStateSender = sender.voice;

		let srcChannel = voiceStateSender.channel;

		if(!srcChannel)
			return message.channel.send("You must be in a voice channel to use this command.");
		
		if(args.length<2) {
			return message.channel.send("Usage: "+usage);
		}

		let members = srcChannel.members; // Collection
		let memberArray = [];
		msg+="Detected people:\n";
		members.forEach(member => {
			msg+=member.displayName+"\n";
			memberArray.push(member);
		});
		msg+="----------\n";
		// Fetch voice channels
		let guildchannelmanager = sender.guild.channels;

		let voicechannels = [];
		args.forEach(channelName => {
			voicechannels.push(guildchannelmanager.resolve(channelName));
		})
		// Initialize empty Teams
		let numTeams = voicechannels.length;
		let teams = new Array(numTeams);
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
				let voiceState = member.voice;
				console.log("Moving "+member.displayName+" to "+voicechannels[teamInd].id);
				member.voice.setChannel(voicechannels[teamInd]);
				msg+=member.displayName+"\n";
			});
		}
		return message.channel.send(msg);
	},
};