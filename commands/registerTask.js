const Tasks = require("../tasks/tasks");
const utils = require("./utils/utils.js");


module.exports = {
	name: 'register',
	description: 'Links a recurring task to this channel',
    usage: '!register <task> <on/off>',
    hidden:true,
	execute(message, args) {
        let sender = message.member;
        if(!utils.isAdmin(sender)) {
			return message.reply('Only an admin can use this command.');
		}

        if(args.length==0) {
            let msg = "All available tasks:\n";
            Tasks.nameToTask.forEach((val,key) => {
                msg+=key+"\n";
            });
            message.channel.send(msg);
            return;
        }
        if(args.length!=2) {
            message.channel.send("usage: !register <task> <on/off>");
            return;
        }
        let name = args[0];
        
        let task = Tasks.nameToTask.get(name);
        if(args[1]=="on") {
            task.register(message.channel);
        }
        else if(args[1]=="off") {
            task.unregister(message.channel);
        }
        else {
            message.channel.send("Arg 2 needs to be exactly 'on' or 'off'")
        }
        Tasks.store();
    }
    
};