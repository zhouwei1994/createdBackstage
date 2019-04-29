var express = require('express');
var router = express.Router();
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
    // console.log(req, res);
    next();
});
//数据检查
function check(must,callback) {
    return function (req, res) {
        var data = req.method == "POST" ? req.body : req.params;
        var success = true;
        for (var item of must) {
            if (!data[item]) {
                success = false;
                res.send({
                    success: false,
                    code:0,
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
require('./view')(router,check);
require('./user')(router,check);

module.exports = router;