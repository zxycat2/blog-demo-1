//载入模块
const { getList } = require('../controller/blog');
const {SuccessModel, ErrorModel} = require('../module/resModel')

const hanldeBlogRouter = (req, res) => {

    //获取博客list
    if (req.method === 'GET' && req.path === '/api/blog/list'){
        const author = req.query.author || '';
        const keyword = req.query.keyword || '';
        const listData = getList(author, keyword);
        return new SuccessModel(listData, 'testMsg')
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