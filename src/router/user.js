const {SuccessModel, ErrorModel} = require('../models/resModel')
const {login} = require('../controller/user');

//生成cookie过期时间
const getCookieExpiresData = () => {
    const date = new Date();
    date.setTime(date.getTime() + (24*60*60*1000));
    return date.toGMTString();
}

const handleUserRouter = (req, res) => {
    //登录请求
    if (req.method === 'GET' && req.path == '/api/user/login'){
        const {username, password} = req.query;
        return login(username, password).then( result => {
            if (result.realname){
                //设置session
                req.session.username = result.username;
                req.session.realname = result.realname;

                console.log('req session agter log in', req.session);
                return new SuccessModel('登录成功');
            }else{
                return new ErrorModel('登录失败');
            }
        })
    }

    //登录测试
    if (req.method === 'GET' && req.path == '/api/user/login-test'){
        console.log(req.session);
        if (req.session.username){
            return Promise.resolve(new SuccessModel({session:req.session}, '登录测试成功'));
        }else{
            return Promise.resolve(new ErrorModel('登录测试失败'))
        }
    }
}

module.exports = {handleUserRouter, getCookieExpiresData};