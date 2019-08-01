/**
 * @description fs模块常用api
 */

// fs所有的文件操作都是异步IO，如果要以同步的方式去调用，都会加一个在原同步api的基础上加Sync
// 同步的方式会在最后传入一个callback，异步的方式不会传callback
// 异步的缺陷就是无法控制异常，只能用try catch

const fs = require('fs');
const path = require('path');

const fileReadPath = path.resolve(__dirname, 'demoRead.txt');

// 读取文件
fs.readFile(fileReadPath, 'utf8', function(err, data) {
    if (err) return console.error('读取文件出错: ', err.message)
    console.log('文件内容: ', data)
})

try {
    const data = fs.readFileSync(fileReadPath, 'utf8');
    console.log(data)
} catch(err) {
    console.error('读取文件出错: ', err.message)
}

const fileWritePath = path.resolve(__dirname, 'demoWrite.html');

// 写入文件
// 异步的写入，callback传的是error
fs.writeFile(fileWritePath, '<html>123123</html>', function(err) {
    if (err) throw err;
    console.log('写入成功')
})

try {
    fs.writeFileSync(fileWritePath, '<html>123123</html>');
    console.log('写入成功')
} catch(err) {
    console.log(err)
}

const dirPath1 = path.resolve(__dirname, 'demoDir1');

// 创建目录
fs.mkdir(dirPath1, function(err) {
    if (err) {
        console.log(err)
        return
    };
    console.log('创建目录成功')
})

const dirPath2 = path.resolve(__dirname, 'demoDir2');

try {
    fs.mkdirSync(dirPath2);
} catch(err) {
    console.log(err);
}

