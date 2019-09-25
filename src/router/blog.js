//载入模块
const { getBlogList, 
        getBlogDetail, 
        createNewBlog,
        updateBlog,
        deleteBlog
    } = require('../controller/blog');
const {SuccessModel, ErrorModel} = require('../models/resModel')

//通用登录验证
const loginCheck = (req) => {
    //登录测试
    if (!req.session.username){
        console.log('loginCheck failed')
        return Promise.resolve(new ErrorModel('登录测试失败'))
    }
    console.log('loginCheck success')
    return 1;
}

const hanldeBlogRouter = (req, res) => {

    console.log('req.path', req.path)

    //获取博客list
    if (req.method === 'GET' && req.path === '/api/blog/list'){
        let author = req.query.author || '';
        const keyword = req.query.keyword || '';
        //登录验证
        let loginCheckResult = loginCheck(req);
        if (loginCheckResult != 1){
            return loginCheckResult;
        }
        author = req.session.username;
        
        // const listData = getBlogList(author, keyword);
        // return new SuccessModel(listData, 'testMsg1')
        const resultBlogPromise = getBlogList(author, keyword)
        return resultBlogPromise.then( listData => {
            return new SuccessModel(listData, 'testMsg1');
        })
    }

    //获取博客detail
    if (req.method === 'GET' && req.path === '/api/blog/detail'){
        //登录验证
        let loginCheckResult = loginCheck(req);
        if (loginCheckResult != 1){
            return loginCheckResult;
        }

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
        //登录验证
        let loginCheckResult = loginCheck(req);
        if (loginCheckResult != 1){
            return loginCheckResult;
        }

        const id = req.query.id;
        const blogData = req.body;
        return updateBlog(id, blogData).then( result => {
            if (result){
                return new SuccessModel();
            }else{
                return new ErrorModel('更新博客失败');
            }
        })
        
    }

    //delete博客
    if (req.method === 'POST' && req.path === '/api/blog/del'){
        console.log('deleting')
        //登录验证
        let loginCheckResult = loginCheck(req);
        if (loginCheckResult != 1){
            return loginCheckResult;
        }
        console.log('deleting2')
        const id = req.query.id;
        const author = req.session.username;
        return result = deleteBlog(id, author).then( result => {
            if (result){
                console.log('deleting3')
                return new SuccessModel();
            }else{
                console.log('deleting4')
                return new ErrorModel('删除博客失败');
            }
        })
    }

    //new博客
    if (req.method === 'POST' && req.path === '/api/blog/new'){
        //登录验证
        let loginCheckResult = loginCheck(req);
        if (loginCheckResult != 1){
            return loginCheckResult;
        }
        const blogData = req.body;
        //临时 假数据
        blogData.author = req.session.username;

        return resultPromise = createNewBlog(blogData).then( idObj => {
            return new SuccessModel(idObj, 'newBlogMsg')
        })
    }

}

module.exports = hanldeBlogRouter;