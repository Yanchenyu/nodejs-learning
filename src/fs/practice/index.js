const excelToJsonFactory = require('./src/excel-to-json');
const writeSitemap = require('./src/write-sitemap');
const fs = require('fs');

function init(channel) {
    const result = excelToJsonFactory();
    writeSitemap(result, channel);
}

module.exports = init;
