const hanldeBlogRouter = (req, res) => {

    //获取博客list
    if (req.method === 'GET' && req.path === '/api/blog/list'){
        return {
            "msg":"获取博客list"
        }
    }

    //获取博客detail
    if (req.method === 'GET' && req.path === '/api/blog/detail'){
        return {
            "msg":"获取博客detail"
        }
    }

    //update博客
    if (req.method === 'POST' && req.path === '/api/blog/update'){
        return {
            "msg":"update博客"
        }
    }

    //delete博客
    if (req.method === 'POST' && req.path === '/api/blog/delete'){
        return {
            "msg":"delete博客"
        }
    }

    //new博客
    if (req.method === 'POST' && req.path === '/api/blog/new'){
        return {
            "msg":"new博客"
        }
    }

}

module.exports = hanldeBlogRouter;