//引入redis
var redis = require("redis");
//创建redis客户端
var client = redis.createClient("6379", "127.0.0.1");
//鉴权处理(如果redis设置密码的话)
//client.auth("123456");
//连接错误处理
client.on("error", function (error) {
    console.log(error);
});
var Redis = {
    set: function (key, value, time) {
        return new Promise((resolve, reject) => {
            client.set(key, value, function (error, res) {
                if (error) {
                    reject(error);
                    console.log(error);
                } else {
                    console.log(res);
                    resolve(res);
                };
                //判断是否设置过期时间
                if (time) {
                    client.expire(key, time);
                }
            });
        });
    },
    get: function (key) {
        return new Promise((resolve, reject) => {
            client.get(key, function (error, res) {
                if (error) {
                    reject(error);
                    console.log(error);
                } else {
                    if (res) { 
                        resolve(res);
                    } else {
                        reject("未找到数据");
                    }
                };
            });
        });
    },
    endRedis: function () { 
        //关闭redis连接
        client.end(true);
    }
};
module.exports = Redis;