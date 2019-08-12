module.exports = {
	name: 'ip',
	description: 'Converts IPs to different formats',
	usage: 'ip <ip in dotted dezimal notation> [targetBase]',
	execute(message, args) {
		if(!args.length) {
			message.channel.send('Usage: !ip <ip in dotted dezimal notation>');
		}
		else{
			const ip = args[0];
			console.log(ip);

			let numeralSystems = [];
			if(args.length > 1) {
				for(let i = 1; i < args.length; i++) {
					numeralSystems.push(parseInt(args[i]));
				}
			}
			else{
				numeralSystems = [2, 16];
			}

			for(let i = 0; i < numeralSystems.length;i++) {
				const ip_converted = convertIP(ip, numeralSystems[i]);
				message.channel.send(ip_converted);
			}
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

function convertIP(ip_str, to) {
	const ip_bytes = ip_str.split('.');
    let ip_converted = '';
    let system = to;
    if(system == 10) {system = 2;}
    for(let i = 0; i < ip_bytes.length;i++) {
        const byte = ip_bytes[i];
        const converted = convertToSystem(byte, 10, system);
        ip_converted += converted;
        if(i != ip_bytes.length - 1 && to != 10) {ip_converted += '.';}
    }
    if(to == 10) return convertToSystem(ip_converted, 2, 10);
    else return ip_converted;

}