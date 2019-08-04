/**
 * @description path模块
 */

// 整体一览
// __dirname    当前文件夹路径
// path.dirname(path)   当前path的父级
// path.basename(path)  当前path的文件名（带后缀），可传第二个参数为后缀，则返回不带后缀的文件名
// path.extname(path)   当前path的文件后缀名
// path.resolve(path)   当前path的绝对路径，可传多个参数，就类似于cd ...
// path.join(path)      当前path的路径拼接，并且是规范的


const path = require('path');

// 当前文件夹路径
console.log(__dirname);
// /Users/yanchenyu/github/nodejs-learning/src/path

// 当前文件夹的所在文件夹路径，也就是上一级
console.log(path.dirname(__dirname));
// /Users/yanchenyu/github/nodejs-learning/src

console.log(path.dirname(__dirname + '/index.js'));
// /Users/yanchenyu/github/nodejs-learning/src/path

// 当前文件夹名
console.log(path.basename(__dirname));
// path

// 如果传入的是文件，那就是文件名
console.log(path.basename(__dirname + '/index.js'));
// index.js

// 如果再传一个后缀名，则返回文件名，不包含后缀
console.log(path.basename(__dirname + '/index.js', '.js'));
// index

// 当前文件名后缀
console.log(path.extname(__dirname + '/index.js'));
// .js

// 如果没有后缀，返回空
console.log(path.extname(__dirname));
// 

// 绝对路径，并且自动拼接
console.log(path.resolve(__dirname, 'index.js'))
// /Users/yanchenyu/github/nodejs-learning/src/path/index.js

// 不合规矩的无法识别
console.log(path.resolve(__dirname, '////index.js'));
// /index.js

// 会转为合规的路径，区别于resolve是，非绝对路径，这里是绝对路径是因为__dirname是绝对路径
console.log(path.join(__dirname, '////index.js'))
// /Users/yanchenyu/github/nodejs-learning/src/path/index.js