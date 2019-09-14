const loginCheck = (name, password) => {
    //测试
    console.log(name),
    console.log(password);
    if (name === 'dodo' && password === '123456'){
        return true;
    }else{
        return false;
    }
}

module.exports = ({
    loginCheck
})