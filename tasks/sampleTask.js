const {Task} = require("./task");

class SampleTask extends Task {
    constructor(interval,verbose) {
        super(interval);
        this.verbose = verbose;
    }
    update() {
        // do stuff
        // this.sendMessage("Sample Message");
        if (this.verbose) {
            console.log("Sample Task Message");
            this.sendMessage("Sample Message");
        }
    }
    on_register(channel) {
        this.update();
    }
}


module.exports = {
    SampleTask
}