//载入模块
const blogRouterHandler = require('./src/router/blog');
const {handleUserRouter, getCookieExpiresData} = require('./src/router/user');
const queryString = require('querystring');
const {setDataToRedis, getDataFromRedis} = require('./src/db/redis');


// const SESSION_DATA = {};

//具体控制sever
const severHandle = (req, res) => {
    //设置返回数据类型
    res.setHeader('Content-type', 'application/json');

    //获取reques信息
    const url = req.url;
    req.path = url.split('?')[0];

    //解析query
    req.query = queryString.parse(url.split('?')[1]);

    //解析cookie
    req.cookie = {};
    const cookieStr = req.headers.cookie || '';
    cookieStr.split(';').forEach(pair => {
        if (!pair){
            return
        }
        keyAndValueArray = pair.split('=');
        const key  = keyAndValueArray[0];
        const value = keyAndValueArray[1];
        req.cookie[key] = value;
    });

        //获取postData
    const getPostData = (req) => {
        const promise = new Promise( (resolve, reject) => {
            if (req.method !== 'POST'){
                resolve({});
                return;
            }

            if (req.headers['content-type'] !== 'application/json'){
                resolve({});
                return;
            }
            let postData = '';
            req.on('data', chunk => {
                postData += chunk.toString();
            }
            )
            req.on('end', () => {
                if (!postData){
                    resolve({});
                    return;
                }
                resolve(JSON.parse(postData));
            })
        })

        return promise;
    }

    //解析seesion
    let needToSetCookie = false;
    let userID = req.cookie.userid;
    if (!userID){
        needToSetCookie = true;
        userID = `${Date.now()}_${Math.random()}`;
        setDataToRedis(userID, {});
    }
    req.sessionID = userID;
    getDataFromRedis(req.sessionID).then( (sessionData) => {
        if (sessionData == null){
            setDataToRedis(req.sessionID, {});
            req.session = {};
        }else{
            req.session = sessionData;
        }
        //
        return getPostData(req);
    }).then(
        (postData) => {
            req.body = postData;
            //处理blog路由
            // const blogData = blogRouterHandler(req, res);
            // if (blogData){
                // res.end(JSON.stringify(blogData));
                // return;
            // }
            const blogDataPromise = blogRouterHandler(req, res)
            if (blogDataPromise) {
                blogDataPromise.then( blogData => {
                    if (needToSetCookie){
                        res.setHeader('Set-Cookie', `userid=${userID};path=/;httpOnly;expires=${getCookieExpiresData()}`)
                    }
                    res.end(JSON.stringify(blogData)); 
                })
                return;
            }

            //处理user路由
            const userDataPromise = handleUserRouter(req, res);
            if (userDataPromise){
                userDataPromise.then( userData => {
                    if (needToSetCookie){
                        res.setHeader('Set-Cookie', `userid=${userID};path=/;httpOnly;expires=${getCookieExpiresData()}}`)
                    }
                    res.end(JSON.stringify(userData));
                })
                return;
            }

            //未命中路由，404
            res.writeHead(404, {'Content-type':'text/plain'});
            res.write('404 not found dude!');
            res.end();
        }
    )
}
//测试
// const resData = {
//     "name":"DoDo",
//     "age":12,
//     "env": process.env.NODE_ENV
// }
// res.end(JSON.stringify(resData));

module.exports = severHandle;