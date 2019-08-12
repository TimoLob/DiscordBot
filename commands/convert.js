module.exports = {
	name: 'convert',
    description: 'converts a number from one base to another',
    usage: '!convert <number> <from> <to>\nIf you omit <from>. Base 10 is assumed.',
	execute(message, args) {
        if(args.length == 2) {
            message.channel.send(convertToSystem(args[0], 10, args[1]));
        }
        else if(args.length == 3) {
        message.channel.send(convertToSystem(args[0], args[1], args[2]));
        }
        else{
            message.channel.send('Usage: !convert <number> <from> <to>\nIf you omit <from>. Base 10 is assumed.');
            return;
        }
	},
};

function convertToSystem(str, from, to) {
    console.log(str, from, to);
    str = parseInt(str, from).toString(to);
    if(to == 2) {
        while(str.length < 8) {str = '0' + str;}
        }
	return str;
}