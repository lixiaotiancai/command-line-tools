const fs = require('fs');
const path = require('path');
const msee = require("msee");
const expo = {
  init: () => {
    const file = path.join(__dirname, '../../doc', "fish-cli.md");
    var doc;
    doc = msee.parseFile(file);
    console.log(doc);
    }
}

module.exports = expo;
