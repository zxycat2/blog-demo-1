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

module.exports = {
    getBlogList,
    getBlogDetail
}