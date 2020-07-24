const fs = require('fs');

const writeToJson = function (filename, data) {
    fs.writeFile(process.env.INIT_CWD + `/db/${filename}`, JSON.stringify(data, null, '\t'), (err) => {
        if (err) console.log(err);
    });
}

module.exports = {
    writeToJson
}