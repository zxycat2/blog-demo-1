const {excute} = require('../db/mysql');

//获取博客List
const getBlogList = (author, keyword) => {
    //执行sql语句
    let sql = 'select * from blogs where 1=1 ';
    if (author){
        sql += ` and author = '${author}' `
    };
    if (keyword){
        sql += ` and title like '%${keyword}%'`
    }
    sql += ` order by createTime desc;`;
    //注意此处return的是一个promise
    return excute(sql);
}

//获取博客Detail
const getBlogDetail  = (id) => {
    const sql = `select * from blogs where id='${id}'`;

    return excute(sql).then( allResults => {
        return allResults[0];
    });
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