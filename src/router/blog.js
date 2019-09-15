//载入模块
const { getBlogList, 
        getBlogDetail, 
        createNewBlog,
        updateBlog,
        deleteBlog
    } = require('../controller/blog');
const {SuccessModel, ErrorModel} = require('../models/resModel')

const hanldeBlogRouter = (req, res) => {

    //获取博客list
    if (req.method === 'GET' && req.path === '/api/blog/list'){
        const author = req.query.author || '';
        const keyword = req.query.keyword || '';
        // const listData = getBlogList(author, keyword);
        // return new SuccessModel(listData, 'testMsg1')
        const resultBlogPromise = getBlogList(author, keyword)
        return resultBlogPromise.then( listData => {
            return new SuccessModel(listData, 'testMsg1');
        })
    }

    //获取博客detail
    if (req.method === 'GET' && req.path === '/api/blog/detail'){
        const id = req.query.id;
        // const detailData = getBlogDetail(id);
        // return new SuccessModel(detailData, 'testMsg2')
        const detailResultPromise = getBlogDetail(id);
        return detailResultPromise.then( detailData => {
            return new SuccessModel(detailData, 'testMsg');
        })
    }

    //update博客
    if (req.method === 'POST' && req.path === '/api/blog/update'){
        const id = req.query.id;
        const blogData = req.body;
        const result = updateBlog(id, blogData);
        if (result){
            return new SuccessModel();
        }else{
            return new ErrorModel('更新博客失败');
        }
    }

    //delete博客
    if (req.method === 'POST' && req.path === '/api/blog/delete'){
        const id = req.query.id;
        const result = deleteBlog(id);
        if (result){
            return new SuccessModel();
        }else{
            return new ErrorModel('删除博客失败');
        }
    }

    //new博客
    if (req.method === 'POST' && req.path === '/api/blog/new'){
        const blogData = req.body;
        
        return new SuccessModel(createNewBlog(blogData), 'newBlogMsg')
        
    }

}

module.exports = hanldeBlogRouter;