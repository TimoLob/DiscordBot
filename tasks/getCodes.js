const {Task} = require("./task")

const axios = require('axios');
const cheerio = require('cheerio');



class Table {
    constructor() {
        this.data = [];
    }

    addRow(row) {
        this.data.push(row);
    }

    clear() {
        this.data = [];
    }

    getEUCodes() {
        let eucodes = [];
        this.data.forEach(row => {
            if (!row.expired) {
                eucodes.push(row.eu);
            }
        });
        return eucodes;
    }

    getRowFromCode(code) {
        for (const row of this.data) {
            if (row.eu == code) {
                return row;
            }
        }
    }
}

class TableRow {
    constructor() {
        this.reward = "";
        this.expired = false;
        this.eu = "";
        this.na = "";
        this.sea = "";
        this.index = 0;
    }

    addCol(data) {
        data = data.trim();
        switch (this.index) {
            case 0:
                this.reward = data
                break;
            case 1:
                this.expired = data.includes("Yes");
                break;
            case 2:
                this.eu = data;
                break;
            case 3:
                this.na = data;
                break;
            case 4:
                this.sea = data;
                break;
            default:
                break;
        }
        this.index++;
    }

}

async function getCodesTable() {
    const table = new Table();

    const response = await axios.get('https://www.gensh.in/events/promotion-codes/')


    const html = response.data;
    const $ = cheerio.load(html);
    $("table tbody tr").each((index, el) => {
        let tr = new TableRow();
        $(el).find("td").each((colidx, colel) => {

            tr.addCol($(colel).text())
        })
        table.addRow(tr);
    });

    return table;

}

class GenshinTask extends Task {

    constructor(interval) {
        super(interval);
        
        this.codes = new Set();
    }


    on_register(channel) {
        let message = "All currently redeemable codes:\n";
        this.codes.forEach(code => {
            const row = table.getRowFromCode(code);
            message += row.reward + " - " + code + "\n";
        });
        channel.send(message);
    }

    update() {
        let hasNewCode = false;
        let newCodes = [];
        getCodesTable().then(table => {
            let currentCodes = new Set(table.getEUCodes());
            for (let code of currentCodes) {
                if (!this.codes.has(code)) {
                    hasNewCode = true;
                    newCodes.push(code);
                }
            }
            if (hasNewCode) {
                this.codes = currentCodes;
                let message = "Found new Codes for Genshin Impact\n\nNew Codes:\n";
                newCodes.forEach(code => {
                    const row = table.getRowFromCode(code);
                    message += row.reward + " - " + code + "\n";
                });
                message += "\nAll currently redeemable codes:\n";
                currentCodes.forEach(code => {
                    const row = table.getRowFromCode(code);
                    message += row.reward + " - " + code + "\n";
                });
                console.log(message);
                this.sendMessage(message);
            } else {
                console.log("No new codes found");
            }
        })
    }
}
module.exports = {GenshinTask}