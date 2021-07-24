const ytdl = require('ytdl-core');
const fs = require("fs");
const utils = require("./utils/utils.js");

module.exports = {
		name: 'montage',
		description: 'Plays music in the voice channel of th euser',
		usage: '!montage <url>',
		hidden: true,
		execute(message, args) {
			
			if (!args.length) {
				var url=randomUrl();
			}
			else {
				var url = args[0];
			}
			let sender = message.member;
			let voiceStateSender = sender.voice;

			let srcChannel = voiceStateSender.channel;
			if (!srcChannel) {
				message.channel.send("Could not find voice channel.");
				return;
			}
			
			let start = 0;
			if(args.length>1) {
				start = parseInt(args[1]);
				console.log(start);
			}
			const streamOptions = {
				seek: start,
				volume: 1
			};

			srcChannel.join().then(connection => {
				console.log("joined channel");
				const stream = ytdl(url, {
					filter: 'audioonly'
				});
				const dispatcher = connection.play(stream, streamOptions);
				dispatcher.on("end", end => {
					console.log("left channel");
					voiceChannel.leave();
				});
			}).catch(err => console.log(err));
		}
	}


function randomUrl() {
	if (!fs.existsSync("./data")) {
        fs.mkdir("./data/", (err) => {
            if (err) {
                console.log(err);
            }
        });
        console.log("Created Data directory.");
    }
	if (!fs.existsSync("./data/montage.json")) {
        let data = {songs:["https://youtu.be/QglaLzo_aPk?list=PL5mSdtnRkhckt4bhK3rNB3G01UnKP3iX0"]};
		let data_string = JSON.stringify(data);
		fs.writeFileSync("./data/montage.json", data_string, "utf8", (err) => {
			if (err) {
				console.log(err);
			}
		});
		console.log("Created File.")
    }
	let data_string = fs.readFileSync("./data/montage.json", "utf8");
    let data = JSON.parse(data_string);
	songs = data.songs;
	const randomIndex = Math.floor(Math.random()*songs.length);
	return songs[randomIndex];
}