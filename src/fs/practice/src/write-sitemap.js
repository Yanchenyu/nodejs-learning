const fs = require('fs');
const path = require('path');

function rootPath(filepath) {
    let pathUrl = filepath ? filepath : __dirname;
    let files = fs.readdirSync(pathUrl);
    if (files.indexOf('package.json') === -1) {
        pathUrl = path.resolve(pathUrl, '../');
        return rootPath(pathUrl);
    } else {
        return pathUrl
    }
}

const formatLocale = {
    'zh-HK': 'hk',
    'en-US': 'www',
    'en-GB': 'uk',
    'en-HK': 'hk',
    'en-SG': 'sg',
    'en-AU': 'au',
    'en-MY': 'my',
    'ko-KR': 'kr',
    'ja-JP': 'jp'
}

Date.prototype.format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1,                 //月份 
        "d+": this.getDate(),                    //日 
        "h+": this.getHours(),                   //小时 
        "m+": this.getMinutes(),                 //分 
        "s+": this.getSeconds(),                 //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds()             //毫秒 
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
}

function delDir(path) {
    let files = [];
    if (fs.existsSync(path)) {
        files = fs.readdirSync(path);
        files.forEach((file) => {
            let curPath = path + "/" + file;
            if (fs.statSync(curPath).isDirectory()) {
                delDir(curPath); //递归删除文件夹
            } else {
                fs.unlinkSync(curPath); //删除文件
            }
        });
        fs.rmdirSync(path);
    }
    else {
        console.log(`不存在${path}文件夹`)
    }
}

function writeSitemap(json, channel) {

    let rootUrl = rootPath();
    let sitemapPath = path.resolve(rootUrl, 'sitemap');

    let dateFormat = new Date().format('yyyy-MM-dd');
    delDir(sitemapPath);
    fs.mkdirSync('sitemap');
    for (let i in json) {
        let domain = formatLocale[i];
        let commonEachHead = `
        <loc>https://${domain}.trip.com/${channel === 'Online' ? '' : 'm/'}things-to-do/`;
        let firstDir = sitemapPath + '/' + i;
        fs.mkdirSync(firstDir);
        let arr = json[i];
        let secondDirObj = arr[0],
            thirdDirObj = arr[1];
        arr.splice(0, 2);
        for (let j in secondDirObj) {
            let secondDir = firstDir + '/' + secondDirObj[j];
            if (!fs.existsSync(secondDir)) {
                fs.mkdirSync(secondDir);

                let xmlTypeFileText = `<?xml version="1.0" encoding="UTF-8"?>
                <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
                `;

                for (let k in thirdDirObj) {
                    xmlTypeFileText += `<sitemap>${commonEachHead}sitemap/${i}/${secondDirObj[j]}/${thirdDirObj[k]}.xml</loc>
                    <lastmod>${dateFormat}</lastmod>
                    </sitemap>
                    `;
                }

                xmlTypeFileText += `</sitemapindex>`;
                fs.writeFileSync( secondDir + '.xml', xmlTypeFileText);
            }

            let xmlFileText = `<?xml version="1.0" encoding="UTF-8"?>
            <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

            arr.forEach(function (item) {
                if (item[j]) {

                    let eachurl = ``;
                    switch (secondDirObj[j]) {
                        case 'detail':
                            eachurl = `detail/${item[j]}`;
                            break
                        case 'list':
                            eachurl = `list?searchtype=1&searchkey=${item[j]}`;
                            break
                    }
                    let eachText = `<url>${commonEachHead + eachurl}</loc>
                    <priority>0.6</priority>
                    <lastmod>${dateFormat}</lastmod>
                    <changefreq>weekly</changefreq>
                    </url>
                    `;
                    xmlFileText += eachText;
                }
            });

            xmlFileText += `</urlset>`;

            let thirdDirFile = secondDir + '/' + thirdDirObj[j] + '.xml';

            fs.writeFileSync(thirdDirFile, xmlFileText);
        }

    }
}

module.exports = writeSitemap