//载入模块
const blogRouterHandler = require('./src/router/blog')
const userRouterHandler = require('./src/router/user')
//具体控制sever
const severHandle = (req, res) => {
    //设置返回数据类型
    res.setHeader('Content-type', 'application/json');

    //获取reques信息
    const url = req.url;
    req.path = url.split('?')[0];

    //处理blog路由
    const blogData = blogRouterHandler(req, res);
    if (blogData){
        res.end(JSON.stringify(blogData));
        return;
    }

    //处理user路由
    const userData = userRouterHandler(req, res);
    if (userData){
        res.end(JSON.stringify(userData));
        return;
    }

    //未命中路由，404
    res.writeHead(404, {'Content-type':'text/plain'});
    res.write('404 not found dude!');
    res.end();

    //测试
    // const resData = {
    //     "name":"DoDo",
    //     "age":12,
    //     "env": process.env.NODE_ENV
    // }
    // res.end(JSON.stringify(resData));
};

module.exports = severHandle;