const {SuccessModel, ErrorModel} = require('../models/resModel')
const {loginCheck} = require('../controller/user');

const handleUserRouter = (req, res) => {
    //登录请求
    if (req.method === 'POST' && req.path == '/api/user/login'){
        const {name, password} = req.body;
        const result = loginCheck(name, password);
        if (result){
            return new SuccessModel();
        }else{
            return new ErrorModel('登录失败');
        }
    }
}

module.exports = handleUserRouter;