const {REDIS_CONFIG} = require('../config/db');
const redis = require('redis');

const redisCli =  redis.createClient(REDIS_CONFIG.port, REDIS_CONFIG.host);
redisCli.on('error', (err) => {
    console.error(err);
})

//get func
function setDataToRedis(key, val){
    if (typeof val === 'object'){
        val = JSON.stringify(val);
    }
    redisCli.set(key, val, redis.print);
}

//set func
function getDataFromRedis(key){
    let promise = new Promise( (resolve, reject) => {
        redisCli.get(key, (err, val) => {
            if (err){
                reject(err);
                return;
            }

            if (val == null){
                resolve(null);
                return;
            }
            //尝试把val转换回obj
            try{
                resolve(JSON.parse(val));
            }catch(ex){
                resolve(val);
            }
            return;
        })
    })
    return promise;
}

module.exports = {
    setDataToRedis,
    getDataFromRedis
};

