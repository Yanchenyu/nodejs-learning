const excelToJson = require('convert-excel-to-json');

function excelToJsonFactory() {
    const result = excelToJson({
        sourceFile: 'sitemap.xlsx'
    });
    return result
}

module.exports = excelToJsonFactory