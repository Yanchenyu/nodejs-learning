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
// readFile  readFileSync
try {
    const data = fs.readFileSync(fileReadPath, 'utf8');
    // console.log(data)
} catch(err) {
    console.error('读取文件出错: ', err.message)
    fs.writeFileSync(fileReadPath, '123,123,423');
}


fs.readFile(fileReadPath, 'utf8', function(err, data) {
    if (err) return console.error('读取文件出错: ', err.message)
    console.log('文件内容: ', data)
})

// 读取文件夹，相当于获取当前文件夹内所有目录
// readdir readdirSync
// 返回一个数组，里面是所有文件的路径path
const readdir = fs.readdirSync(path.resolve(__dirname, '../fs'));
console.log(readdir)







const fileWritePath = path.resolve(__dirname, 'demoWrite.html');

// 写入文件
// 异步的写入，callback传的是error
// writeFile  writeFileSync
fs.writeFile(fileWritePath, '<html>123123</html>', function(err) {
    if (err) throw err;
    // console.log('写入成功')
})

try {
    fs.writeFileSync(fileWritePath, '<html>123123</html>');
    // console.log('写入成功')
} catch(err) {
    console.log(err)
}





const dirPath1 = path.resolve(__dirname, 'demoDir1');

// 创建目录
// mkdir  mkdirSync
fs.mkdir(dirPath1, function(err) {
    if (err) {
        // console.log(err)
        return
    };
    // console.log('创建目录成功')
})

const dirPath2 = path.resolve(__dirname, 'demoDir2');

try {
    fs.mkdirSync(dirPath2);
    fs.writeFileSync(dirPath2 + '/demoDir2File.txt', 'dqwdjwdojdojqwd');
    fs.mkdirSync(dirPath2 + '/balabala');
    fs.writeFileSync(dirPath2 + '/balabala/balabalaFile.txt', 'dqwdjwdojdojqwd');
} catch(err) {
    // console.log(err);
}





// 检查是否存在
// existsSync
const isExists = fs.existsSync(path.resolve(__dirname, 'demoRead.txt'));
console.log('isExists: ', isExists)

// callback的exists已经快不用了，现在用access
fs.access(path.resolve(__dirname, 'demoRead.txt'), function(err) {
    if (err) console.log(err)
    console.log('有这个文件的')
});





// 判断是一个文件夹还是一个文件，先获取文件stat，然后调用方法
// stat  statSync
// isDirectory()  isFile()
const stat = fs.statSync(path.resolve(__dirname, 'demoDir1'));
if (stat.isDirectory()) {
    console.log('当前是一个文件夹')
} else if (stat.isFile()) {
    console.log('当前是一个文件')
} else {
    console.log('既不是文件也不是文件夹');
}






// 删除文件
// unlink  unlinkSync
const filePath = path.resolve(__dirname, 'demoRead.txt');
if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    console.log('删除文件成功')
}

// 删除文件夹
// rmdir  rmdirSync
// 注意，如果文件夹里还有文件夹，则删除会报错，要删除的文件夹必须是全是文件，或者没有，不能有文件夹
// 如果有，必须递归删除
if (fs.existsSync(dirPath2)) {
    try {
        fs.rmdirSync(dirPath2);
    } catch(err) {
        delDir(dirPath2)
    }
    console.log('删除文件夹成功')
}

// 递归删除文件或文件夹
function delDir(filePath) {
    if (fs.existsSync(filePath)) {
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
            // 当前是文件夹，需要判断里面是否还有文件夹
            // 需要遍历文件夹内的所有文件，并判断是否是文件夹或文件，即递归调用
            const files = fs.readdirSync(filePath);
            files.forEach(function(item) {
                delDir(path.resolve(filePath, item));
            });
            fs.rmdirSync(filePath);
        } else if (stat.isFile()) {
            // 当前是文件，直接删除
            fs.unlinkSync(filePath);
        }
    } else {
        console.log('不存在该文件！')
    }
}
