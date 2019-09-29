const fs = require('fs');
const path = require('path');

//创建fileStream通用
function createWriteFileStrem(fileName){
    const fullPath = path.join(__dirname, '../', '../', 'logs', fileName);
    const fileStream = fs.createWriteStream(fullPath, {flags:'a'});

    return fileStream;
}

//写入log
function writeLog(fileStream, logData){
    fileStream.write(logData + '\n');
}

//写入access log
const accesssLogFileStream = createWriteFileStrem('access.log');
function writeToAccessLog(logData){
    writeLog(accesssLogFileStream, logData);
}

module.exports = {writeToAccessLog}