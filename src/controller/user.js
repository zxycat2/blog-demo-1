const {excute} = require('../db/mysql');

const login = (username, password) => {

    const sql = `select username, realname from users where username='${username}' and password='${password}'`;
    // const sql = `select * from users`;
    return excute(sql).then( rows => {
        return rows[0] || {};
    })
//aa
}

module.exports = ({
    login
})