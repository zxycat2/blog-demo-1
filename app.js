//具体控制sever
const severHandle = (req, res) => {
    //设置返回数据类型
    res.setHeader('Content-type', 'application/json');

    const resData = {
        "name":"DoDo",
        "age":12,
        "env": process.env.NODE_ENV
    }
    //返回数据
    console.log("DoDODoD03!");
    res.end(JSON.stringify(resData));
};

module.exports = severHandle;