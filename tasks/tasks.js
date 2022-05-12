const Discord = require('discord.js');
const fs = require("fs");

const {SampleTask} = require("./sampleTask");

const sampleTask = new SampleTask(60); // does nothing every hour


let nameToTask = new Map([
    ["sampleTask", sampleTask]
]);

async function store() {
    let data = {};
    nameToTask.forEach((task, key) => {
        console.log(key);
        data[key] = [];
        task.registeredChannels.forEach(channel => {
            data[key].push(channel.id);
        })
    });
    let data_string = JSON.stringify(data);
    fs.writeFile("./data/tasks.json", data_string, "utf8", (err) => {
        if (err) {
            console.log(err);
        }
    });
}

async function load(client) {
    if (!fs.existsSync("./data")) {
        fs.mkdir("./data/", (err) => {
            if (err) {
                console.log(err);
            }
        });
        return;
    }
    if (!fs.existsSync("./data/tasks.json")) {
        return;
    }
    const channelManager = client.channels;
    let data_string = fs.readFileSync("./data/tasks.json", "utf8");
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
}