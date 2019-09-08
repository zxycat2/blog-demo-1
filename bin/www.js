//关键js文件，控制核心sever相关
const http = require('http');

const PORT = 8000;
const severHandle = require('../app.js')

const sever = http.createServer(severHandle);
sever.listen(PORT);