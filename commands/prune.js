const utils = require("./utils/utils.js");

module.exports = {
	name: 'prune',
	description: 'delete last x messages in current channel',
	usage: 'prune x',
	hidden: true,
	execute(message, args) {
		const member = message.member;
		if(!utils.isAdmin(member)) {
			return message.reply('Only an admin can use this command.');
		}

		const amount = parseInt(args[0]) + 1;
		if (isNaN(amount)) {
			return message.reply('that doesn\'t seem to be a valid number.');
		}
		else if (amount <= 1 || amount > 100) {
			return message.reply('you need to input a number between 1 and 99.');
		}
		else {
			message.channel.bulkDelete(amount, true);
			// return message.reply(`pruned ${amount} messages.`);
		}
	},
};