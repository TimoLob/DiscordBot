class Task {
    /*
        Creates a task that is called every x seconds
        1. Create a subclass of this class
        2. Overwrite the update method
        3. require it in tasks.js
        4. Create a new instance of your class
        5. add it to the nameToTask map
    */
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