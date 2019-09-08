const handleUserRouter = (req, res) => {
    //登录请求
    if (req.method === 'POST' && req.path == '/api/user/login'){
        return {
            'msg':'登录请求'
        }
    }
}

module.exports = handleUserRouter;