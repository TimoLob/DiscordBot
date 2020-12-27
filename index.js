// https://discordjs.guide/command-handling/adding-features.html#a-dynamic-help-command

const fs = require('fs');
const config = require('./config.json');
const prefix = config.prefix;
const Discord = require('discord.js');
const Tasks = require("./tasks/tasks")
const client = new Discord.Client();

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}


client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
	Tasks.load(client);

});

client.on('message', message => {

	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).split(/ +/);
	const commandName = args.shift().toLowerCase();

	if (!client.commands.has(commandName)) return;

	const command = client.commands.get(commandName);

	try {
		command.execute(message, args);
	}
	catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}


});

client.on('error', (error) => {
    console.error(new Date() + ': Discord client encountered an error');
    console.error(error);
});


client.login(config.token);