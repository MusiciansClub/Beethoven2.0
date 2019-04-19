const { readFileSync, writeFileSync, existsSync } = require("fs");

module.exports = class {
    constructor(name) {
        this.config = {
            name: name,
            file: `${__dirname}/${name}.json`
        };
        if (!existsSync(this.config.file)) writeFileSync(this.config.file, JSON.stringify({}));
        this.data = JSON.parse(readFileSync(this.config.file));
    };

    save() {
        writeFileSync(this.config.file, JSON.stringify(this.data));
    };

    update() {
        this.data = JSON.parse(readFileSync(this.config.file));
    };

    set(value) {
        this.data.push(value);
        this.save();
    };

    get(index) {
        return this.data[index];
    };

    getAll() {
        return this.data;
    };

    del(index) {
        this.data.splice(index, 1);
        this.save();
        this.update();
    };
};