var express = require('express');
var router = express.Router();
//引入redis
var redis = require('./../app/module/redis');
//设置请求信息
router.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Access-Token,x-requested-with");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
// 没有挂载路径的中间件，应用的每个请求都会执行该中间件
router.use(function (req, res, next) {
    if (["create"].includes(req.path.split('/')[1])) {
        //检查是否有user_id
        if (req.headers.user_id) {
            redis.get("userInfo:" + req.headers.user_id).then(data => {
                next();
            }, err => {
                res.send({
                    success: false,
                    code: 1000,
                    data: {},
                    msg: "您还未登录，请先登录"
                });  
            });
        } else {
            res.send({
                success: false,
                code: 1000,
                data: {},
                msg: "请求头没有user_id"
            });
        }
    } else {
        next();
    }
});
//数据检查
function check(must, callback) {
    return function (req, res) {
        var data = req.method == "POST" ? req.body : req.query;
        var success = true;
        for (var item of must) {
            if (data[item] == undefined) {
                success = false;
                res.send({
                    success: false,
                    code: 999,
                    data: {},
                    msg: "缺少参数：" + item
                });
                break;
            }
        }
        //输出配置
        res.result = function (data, code, msg) {
            res.send({
                code: code || 0,
                data: data || {},
                msg: msg || ""
            });
        };
        req.data = data;
        success && callback(req, res);
    };
};
//引入路由文件
require('./view')(router, check);
require('./public')(router, check);

module.exports = router;