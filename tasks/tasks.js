const Discord = require('discord.js');
const fs = require("fs");




const {GenshinTask} = require("./getCodes");
// Genshin Impact primo gem codes download task
const genshinTask = new GenshinTask(86400);




let nameToTask = new Map([
    ["genshinimpact",genshinTask]
]);

async function store() {
    let data = {};
    nameToTask.forEach((task,key) => {
        console.log(key);
        data[key] = [];
        task.registeredChannels.forEach(channel => {
            data[key].push(channel.id);
        })
    });
    let data_string = JSON.stringify(data);
    fs.writeFile("./data/tasks.json",data_string,"utf8",(err) => {
        if(err) {
            console.log(err);
        }
    });
}

async function load(client) {
    const channelManager = client.channels;
    let data_string = fs.readFileSync("./data/tasks.json","utf8");
    let data = JSON.parse(data_string);

    Object.keys(data).forEach(key => {
        const task = nameToTask.get(key);
        data[key].forEach(channelID => {
            channelManager.fetch(channelID).then(channel => {
                task.register(channel);
            });

            
        })
    })
}

module.exports = {
    nameToTask,
    store,
    load,
    genshinTask
}
