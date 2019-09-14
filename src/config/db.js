const env = process.env.NODE_ENV; //获取环境

let MYSQL_CONFIG;

if (env === 'dev'){
    MYSQL_CONFIG = {
        host: 'localhost',
        user: 'root',
        password: 'rmdxyy2L.',
        port: '3306',
        database: 'myBlog'
    }
}else if (env === 'production'){
    MYSQL_CONFIG = {
        host: 'localhost',
        user: 'root',
        password: 'rmdxyy2L.',
        port: '3306',
        database: 'myBlog'
    }
};

module.exports = {
    MYSQL_CONFIG
};