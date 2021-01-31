class Task {
    constructor(interval) {
        this.registeredChannels = new Set();
        this.taskID = setInterval(
            this.update.bind(this),
            interval * 1000
        );
    }
    update() {
        console.log("If you see this, you didnt overwrite the correct method")
    }

    sendMessage(msg) {
        this.registeredChannels.forEach(channel => {
            channel.send(msg);
        })
    }

    register(channel) {
        this.registeredChannels.add(channel);
        this.on_register(channel);
    }

    unregister(channel) {
        if (this.registeredChannels.has(channel)) {
            this.registeredChannels.delete(channel);
        }
    }

    on_register(channel) {
        channel.send("Registered Channel");
    }
}

module.exports = {
    Task
};