const {Task} = require("./task");

class SampleTask extends Task {
    constructor(interval,verbose = false) {
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
}


module.exports = {
    SampleTask
}