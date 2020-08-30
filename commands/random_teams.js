const utils = require("./utils/utils.js");
module.exports = {
	name: 'randteams',
	description: 'Splits the members of a voice channel or a list of people into n teams.',
	aliases: ['commands'],
	usage: '!randteams n <p1> <p2> ...',
	hidden: false,
	execute(message, args) {
        const sender = message.member;
        let memberArray = [];
        let msg= "";
        let numTeams = 1;
        if(args.length==0) {
			return message.channel.send("Usage: "+this.usage);
        }else if(args.length == 1) {
            msg += "Using people from your voice channel.\n";
            voiceStateSender = sender.voice;
            srcChannel = voiceStateSender.channel;
            if(!srcChannel)
                return message.channel.send("You must be in a voice channel to use this command without a list of people.");
            members = srcChannel.members; // Collection
            
            members.forEach(member => {
                memberArray.push(member.nickname);
            });
            numTeams = parseInt(args[0]);
        }else {
            numTeams = parseInt(args[0]);
            args.shift();
            args.forEach(member => {
                memberArray.push(member);
            })
        }

        if(!numTeams || numTeams<0) {
            return message.channel.send("Invalid number of teams.");
        }
        msg+="Users:\n"
        memberArray.forEach(member => {
            msg+=member+"\n";
        });
        msg+="--------Splitting into "+numTeams+" teams------------\n";
        // Initialize empty Teams
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
			msg+="**Team #"+(teamInd+1)+"**\n";
			teams[teamInd].forEach(member => {
				msg+=member+"\n";
			});
		}
        return message.channel.send(msg);
    }
};