//获取博客List
const getBlogList = (author, keyword) => {
    //临时
    return [
        {
            'id':1,
            'title':'The study of DoDo',
            'content':'DoDo is just stupid man',
            'createTime':1567987445710,
            'author':'dodo himself'
        },
        {
            'id':2,
            'title':'The study of DoDo2',
            'content':'DoDo is just stupid man2',
            'createTime':1567987513614,
            'author':'dodo himself2'
        }
    ]
}

//获取博客Detail
const getBlogDetail  = (id) => {
    return {
        'id':1,
            'title':'The study of DoDo',
            'content':'DoDo is just stupid man',
            'createTime':1567987445710,
            'author':'dodo himself'
    }
}

//新建博客
const createNewBlog = (blogData = {}) => {

     //返回新博客在数据库中的id，证明新建成功
     return {
        id:450
    };
}

//更新博客
const updateBlog = (id, blogData = {}) => {

    return true;
}

//删除博客
const deleteBlog = (id) => {
    console.log('id', id);

    return true;
}

module.exports = {
    getBlogList,
    getBlogDetail,
    createNewBlog,
    updateBlog,
    deleteBlog
}